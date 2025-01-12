const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/university', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Department schema
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const Department = mongoose.model('Department', departmentSchema);

// Employee schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

// Create a new department
app.post('/api/departments', async (req, res) => {
  try {
    const { name, location } = req.body;
    const department = new Department({ name, location });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, position, departmentId } = req.body;
    const employee = new Employee({ name, email, position, departmentId });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all employees with department info
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().populate('departmentId', 'name location');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, email, position, departmentId } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, departmentId },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a department
app.delete('/api/departments/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Delete all employees associated with the department
    await Employee.deleteMany({ departmentId: req.params.id });

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});