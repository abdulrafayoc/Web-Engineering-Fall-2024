// Sample employee data structure
const employees = [
    { 
        name: "John Doe", 
        age: 35, 
        salary: 85000, 
        department: "IT",
        yearsOfService: 4
    },
    { 
        name: "Jane Smith", 
        age: 28, 
        salary: 65000, 
        department: "HR",
        yearsOfService: 2
    },
    { 
        name: "Mike Johnson", 
        age: 42, 
        salary: 95000, 
        department: "IT",
        yearsOfService: 6
    },
    { 
        name: "Sarah Brown", 
        age: 31, 
        salary: 45000, 
        department: "HR",
        yearsOfService: 1
    }
];

class EmployeeManagementService {
    constructor(employeeData) {
        this.employees = employeeData;
    }

    ///// HR Reports
    
    // Get employees by department
    getEmployeesByDepartment(department) {
        return this.employees.filter(employee => 
            employee.department === department
        );
    }

    // Get employees eligible for bonus (>3 years)
    getEmployeesEligibleForBonus() {
        return this.employees.filter(employee => 
            employee.yearsOfService > 3
        );
    }

    // Get sorted list by salary (highest to lowest)
    getSortedEmployeesBySalary() {
        return [...this.employees].sort((a, b) => 
            b.salary - a.salary
        );
    }

    // Get employee summary list
    getEmployeeSummaryList() {
        return this.employees.map(({ name, salary, department }) => ({
            name,
            salary,
            department
        }));
    }

    ////// Finance Reports
    
    // Check if any employee has salary > 75000
    hasHighSalaryEmployees() {
        return this.employees.some(employee => 
            employee.salary > 75000
        );
    }


    // Calculate total salary using reduce
    getTotalSalary() {
        return this.employees.reduce((total, employee) => 
            total + employee.salary, 0
        );
    }

    // Generate comprehensive report
    generateReport() {
        console.log("=== HR Reports ===");
        
        console.log("\nEmployees by Department:");
        ["IT", "HR"].forEach(dept => {
            const deptEmployees = this.getEmployeesByDepartment(dept);
            console.log(`\n${dept} Department:`);
            deptEmployees.forEach(emp => {
                console.log(`- ${emp.name} (Salary: $${emp.salary})`);
            });
        });

        console.log("\nEmployees Eligible for Bonus:");
        this.getEmployeesEligibleForBonus().forEach(emp => {
            console.log(`- ${emp.name} (Years of Service: ${emp.yearsOfService})`);
        });

        console.log("\nEmployees Sorted by Salary:");
        this.getSortedEmployeesBySalary().forEach(emp => {
            console.log(`- ${emp.name}: $${emp.salary}`);
        });

        console.log("\n=== Finance Reports ===");
        console.log(`\nHigh Salary Employees Exist: ${this.hasHighSalaryEmployees()}`);
        

        console.log(`\nTotal Salary Expenditure: $${this.getTotalSalary()}`);
    }
}

// Usage Example
const employeeService = new EmployeeManagementService(employees);

// Generate complete report
employeeService.generateReport();

// Individual report examples
console.log("\n=== Individual Report Examples ===");

// Get IT department employees
console.log("\nIT Department Employees:");
console.log(employeeService.getEmployeesByDepartment("IT"));

// Get employee summary
console.log("\nEmployee Summary:");
console.log(employeeService.getEmployeeSummaryList());