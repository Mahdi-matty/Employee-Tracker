const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1990',
      database: 'cms_db'
    },
);
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    startApp();
  });
  
// 

const startApp = inquirer.prompt([
    {type: 'list',
      message: 'choose on of the following?',
      name: 'optional',
      choices: ['view all the department', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee roll'],
    }
  
]).then(answers=>{
    switch (answers.optional){
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
            case 'Exit':
          console.log('Exiting the application.');
          db.end();
          break;

        default:
          console.log('Invalid option. Please try again.');
          startApp();
    }
});

const viewDepartment = ()=>{
    db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
      });
    };
const viewRoles = ()=>{
    db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
      });
    };
const viewEmployee = ()=>{
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
      });
    };
const addDepartment = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'dpname',
            message: 'What is the department name?',

        }
    ]).then(answers=>{
        const dpName = answers.dpname;
        db.query('INSERT INTO department (department_name) VALUES (?)', [dpName], (err) => {
            if (err) throw err;
            console.log('Department added successfully.');
            startApp();
          });
        });
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
            name: 'dpbelong',
            message: 'Which department that belongs?',
        }
    ]).then(answers=>{
        const roleName = answers.rolename;
        const roleSalary = answers.salary;
        const dpBelong = answers.dpbelong;
        db.query('SELECT id FROM department WHERE department_name = ?', [dpBelong], (err, results) => {
            if (err) throw err;
      
            if (results.length > 0) {
              const departmentId = results[0].id;
              // Insert the role with the obtained department ID
              db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                [roleName, roleSalary, departmentId], (err) => {
                  if (err) throw err;
                  console.log('Role added successfully.');
                  startApp();
                });
            } else {
              console.log('Department not found.');
              startApp();
            }
          });
        });
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
            db.query('SELECT id FROM role WHERE title = ?', [employeRole], (err, results) => {
                if (err) throw err;
          
                if (results.length > 0) {
                  const roleId = results[0].id;
                  // Insert the employee with the obtained role ID
                  db.query('INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)',
                    [employeFirst, employeLast, roleId, employeManager], (err) => {
                      if (err) throw err;
                      console.log('Employee added successfully.');
                      startApp();
                    });
                } else {
                  console.log('Role not found.');
                  startApp();
                }});
            })}
          
const updateRole = ()=>{
    db.query('SELECT id, first_name, last_name FROM employee', (err, employees) => {
        if (err) throw err;
        const employeeChoices = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          }));
          inquirer.prompt([
            {
              type: 'list',
              name: 'employeeId',
              message: 'Select the employee to update:',
              choices: employeeChoices,
            },
            {
              type: 'input',
              name: 'newRoleName',
              message: 'Enter the new role for the employee:',
            },
          ]).then((answers) => {
            // Fetch the new role ID based on the entered role name
            db.query('SELECT id FROM role WHERE title = ?', [answers.newRoleName], (err, results) => {
              if (err) throw err;
      
              if (results.length > 0) {
                const newRoleId = results[0].id;
      
                // Update the employee's role with the obtained new role ID
                db.query('UPDATE employee SET role_id = ? WHERE id = ?',
                  [newRoleId, answers.employeeId], (err) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully.');
                    startApp();
                  });
              } else {
                console.log('New role not found.');
                startApp();
              }
            });
          });
        });
      };