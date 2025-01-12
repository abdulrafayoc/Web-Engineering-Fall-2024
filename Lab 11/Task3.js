const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/university', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'teacher', 'student'] },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Middleware to authenticate the token and check role permissions
function authenticateAndAuthorize(requiredRole) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
      }

      req.user = user;
      next();
    });
  };
}

// Register route (from Task 1)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route (from Task 1)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token with the user's role
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Protected admin-only route
app.get('/api/users/admin', authenticateAndAuthorize('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

// Protected teacher-only route
app.get('/api/courses', authenticateAndAuthorize('teacher'), (req, res) => {
  res.json({ message: 'Welcome to the teacher dashboard!' });
});

// Protected student-only route
app.get('/api/grades', authenticateAndAuthorize('student'), (req, res) => {
  res.json({ message: 'Welcome to the student dashboard!' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});