const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Sample customer data
let customers = [
    { id: 1, name: 'Alice', creditScore: 650, debt: 300, income: 1000, balance: 1200, loanStatus: 'pending' },
    { id: 2, name: 'Bob', creditScore: 550, debt: 800, income: 1500, balance: 900, loanStatus: 'pending' },
    { id: 3, name: 'Charlie', creditScore: 700, debt: 500, income: 2000, balance: 1500, loanStatus: 'pending' },
];

// Constants for loan approval criteria
const CREDIT_SCORE_THRESHOLD = 600;
const DEBT_INCOME_RATIO_THRESHOLD = 0.4; // 40%
const MIN_ACCOUNT_BALANCE = 1000;
const BASE_LOAN_AMOUNT = 5000;

// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    res.status(500).json({
        message: 'An error occurred',
        error: err.message
    });
}

// Credit Score Check Middleware
function creditScoreCheck(req, res, next) {
    try {
        const { customerId, creditScore } = req.body;
        
        // Store customer data for subsequent middleware
        const customer = customers.find(c => c.id === customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        req.customer = customer;

        // Check credit score
        if (creditScore < CREDIT_SCORE_THRESHOLD) {
            req.loanStatus = 'denied';
            req.denialReason = 'Credit score too low';
            return next();
        }

        req.creditScoreMultiplier = (creditScore - CREDIT_SCORE_THRESHOLD) / 400 + 1;
        next();
    } catch (error) {
        next(error);
    }
}

// Debt-to-Income Ratio Check Middleware
function debtToIncomeRatioCheck(req, res, next) {
    try {
        if (req.loanStatus === 'denied') return next();

        const { currentDebt } = req.body;
        const { income } = req.customer;
        
        const debtToIncomeRatio = currentDebt / income;
        req.debtToIncomeRatio = debtToIncomeRatio;

        if (debtToIncomeRatio > DEBT_INCOME_RATIO_THRESHOLD) {
            req.riskFactor = 'high';
            req.loanAmountMultiplier = 0.5; // Reduce loan amount by 50%
        } else {
            req.riskFactor = 'low';
            req.loanAmountMultiplier = 1;
        }

        next();
    } catch (error) {
        next(error);
    }
}

// Account Balance Check Middleware
function accountBalanceCheck(req, res, next) {
    try {
        if (req.loanStatus === 'denied') return next();

        const { accountBalance } = req.body;

        if (accountBalance < MIN_ACCOUNT_BALANCE) {
            req.balanceRisk = 'high';
            req.loanAmountMultiplier *= 0.7; // Further reduce loan amount by 30%
        } else {
            req.balanceRisk = 'low';
        }

        next();
    } catch (error) {
        next(error);
    }
}

// Final Loan Approval Logic Middleware
function finalLoanApproval(req, res, next) {
    try {
        if (req.loanStatus === 'denied') {
            req.finalDecision = {
                status: 'denied',
                reason: req.denialReason,
                loanAmount: 0
            };
            return next();
        }

        // Calculate final loan amount based on all factors
        const baseLoanAmount = BASE_LOAN_AMOUNT;
        const adjustedAmount = baseLoanAmount * 
            req.creditScoreMultiplier * 
            req.loanAmountMultiplier;

        req.finalDecision = {
            status: 'approved',
            loanAmount: Math.round(adjustedAmount),
            riskAssessment: {
                creditScore: req.creditScoreMultiplier > 1 ? 'good' : 'fair',
                debtToIncome: req.riskFactor,
                balance: req.balanceRisk
            }
        };

        next();
    } catch (error) {
        next(error);
    }
}

// Routes
app.post('/apply-loan', creditScoreCheck, debtToIncomeRatioCheck, accountBalanceCheck, finalLoanApproval, (req, res) => {
    // Update customer's loan status in database
    const customer = customers.find(c => c.id === req.body.customerId);
    customer.loanStatus = req.finalDecision.status;
    customer.loanAmount = req.finalDecision.loanAmount;

    res.status(200).json({
        message: 'Loan application processed',
        ...req.finalDecision
    });
});

app.get('/customers/loan-status', (req, res) => {
    try {
        const { customerId } = req.body;
        const customer = customers.find(c => c.id === customerId);
        
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            customerId: customer.id,
            loanStatus: customer.loanStatus,
            loanAmount: customer.loanAmount || 0
        });
    } catch (error) {
        next(error);
    }
});

app.put('/customers/update-info', (req, res) => {
    try {
        const { customerId, balance, debt, income } = req.body;
        const customer = customers.find(c => c.id === customerId);
        
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update customer information
        customer.balance = balance || customer.balance;
        customer.debt = debt || customer.debt;
        customer.income = income || customer.income;

        res.status(200).json({
            message: 'Customer financial information updated',
            customer: {
                customerId: customer.id,
                balance: customer.balance,
                debt: customer.debt,
                income: customer.income
            }
        });
    } catch (error) {
        next(error);
    }
});

// Apply the error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});