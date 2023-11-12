const mysql = require('mysql2');
const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      // TODO: Add MySQL password here
      password: '1990',
      database: 'cms_db'
    },
);
// 

const fillDepartment = inquirer.prompt([
    {type: 'checkbox',
      message: 'choose on of the following?',
      name: 'optional',
      choices: ['view all the department', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee roll'],
    }
  
]).then(answers=>{
    switch(answers.optional){
        case 'view all the department':
            viewDepartment();
            break;

        case 'view all roles' :
            viewRoles();
            break;

        case 'view all employees' :
            viewEmployee();
            break;
        case 'add a department' :
            addDepartment();
            break;
        case 'add a role' :
            addRole();
            break;
        case 'add an employee' :
            addEpmployee();
            break;
        case 'update an employee roll' :
            updateRole();
            break;
    }
});
const viewDepartment = ()=>{
    db.query('SELECT * FROM department')
};
const viewRoles = ()=>{
    db.query('SELECT * FROM role')
};
const viewEmployee = ()=>{
    db.query('SELECT * FROM epmloyee')
};
const addDepartment = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'dpname',
            message: 'What is the department name?',

        }
    ]).then(answers=>{
        db.query(`INSERT INTO department(department_name) values $(dpname) `)
    })
};
const addRole = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'What is the role?',
        },{
            type: 'input',
            name: 'salary',
            message: 'how much is the role salary?',
        },{
            type: 'input',
            name: 'dpbelobg',
            message: 'Which department that belongs?',
        }
    ]).then(answers=>{
        const roleName = answers.rolename;
        const roleSalary = answers.salary;
        const dpBelong = answers.dpbelong;
        db.query(`INSERT INTO role(title, salary, department_id) values(?, ?, ?)`,
        [roleName, roleSalary, dpBelong])
    })
};
const addEpmployee = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'What is the first name?',
        },{
            type: 'input',
            name: 'lastname',
            message: 'What is the last name?',
        },{
            type: 'input',
            name: 'role',
            message: 'What is the role?',
        },{
            type: 'input',
            name: 'manager',
            message: 'What is the manager name?',
        }
    ]).then(answers=>{
        const employeFirst = answers.firstname;
        const employeLast = answers.lastname;
        const employeRole = answers.role;
        const employeManager = answers.manager;
        const roleId = getRoleIdByName(employeeRole);
        const managerId = getManagerIdByName(employeeManager);
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id values VALUES (?, ?, ?, ?)`,
        [employeFirst, employeLast, roleId, managerId])
    })
};
const getManagerIdByName= (managerName)=>{};
const getRoleIdByName = (roleName) =>{}
const getEmployeeIdByName= (employeeName)=>{}
const updateRole = ()=>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'whichem',
            message: 'Which employee?',
            choices: viewEmployees,
        },{
            type: 'checkbox',
            name: 'newrole',
            message: 'What is the new role?',
            choices: viewRoles,
        },
    ]).then(answers=>{
        const employeeName = answers.whichem;
        const newRoleName = answers.newrole;
        const newRoleId = getRoleIdByName(newRoleName);
        const employeeId = getEmployeeIdByName(employeeName);
        db.query(`UPDATE employee SET role_id = ${newRoleId} WHERE id = ${employeeId}`, (error, results) => {
            if (error) {
                console.error('Error updating role:', error);
            } else {
                console.log('Role updated successfully.');
            }
    })
})};
fillDepartment();