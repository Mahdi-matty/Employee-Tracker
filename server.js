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

async function startApp() {
    try {
        while (true) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose one of the following options:',
                    name: 'optional',
                    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit'],
                }
            ]);

            switch (answers.optional) {
                case 'view all departments':
                    await viewDepartment();
                    break;

                case 'view all roles':
                    await viewRoles();
                    break;

                case 'view all employees':
                    await viewEmployee();
                    break;

                case 'add a department':
                    await addDepartment();
                    break;

                case 'add a role':
                    await addRole();
                    break;

                case 'add an employee':
                    await addEmployee();
                    break;

                case 'update an employee role':
                    await updateRole();
                    break;

                case 'Exit':
                    console.log('Exiting the application.');
                    db.end();
                    return;

                default:
                    console.log('Invalid option. Please try again.');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        db.end();
    }
}

function viewDepartment() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve();
            }
        });
    });
}
function viewRoles() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM role', (err, results) => {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve();
            }
        });
    });
}
function viewEmployee() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee', (err, results) => {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve();
            }
        });
    });
}
function addDepartment() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'dpname',
                message: 'What is the department name?',
            }
        ]).then(answers => {
            const dpName = answers.dpname;
            db.query('INSERT INTO department (department_name) VALUES (?)', [dpName], (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Department added successfully.');
                    resolve();
                }
            });
        });
    });
}
function addRole() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'rolename',
                message: 'What is the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'How much is the role salary?',
            },
            {
                type: 'input',
                name: 'dpbelong',
                message: 'Which department does it belong to?',
            }
        ]).then(answers => {
            const roleName = answers.rolename;
            const roleSalary = answers.salary;
            const dpBelong = answers.dpbelong;

            db.query('SELECT id FROM department WHERE department_name = ?', [dpBelong], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length > 0) {
                    const departmentId = results[0].id;

                    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                        [roleName, roleSalary, departmentId], (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log('Role added successfully.');
                                resolve();
                            }
                        });
                } else {
                    console.log('Department not found.');
                    resolve();
                }
            });
        });
    });
}

function addEmployee() {
        return new Promise((resolve, reject) => {
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
            ]).then(answers => {
                const employeFirst = answers.firstname;
        const employeLast = answers.lastname;
        const employeRole = answers.role;
        const employeManager = answers.manager;    
            db.query('SELECT id FROM role WHERE title = ?', [employeRole], (err, results) => {
                if (err) throw err;
          
                if (results.length > 0) {
                  const roleId = results[0].id;
                  db.query('INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)',
                    [employeFirst, employeLast, roleId, employeManager], (err) => {
                      if (err) throw err;
                      console.log('Employee not found');
                      startApp();
                    });
                } else {
                  console.log('Employee added successfully.');
                resolve();
            }
        });
    });
})};
function updateRole() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employee', (err, employees) => {
            if (err) {
                reject(err);
            } else {
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
                ]).then(answers => {
                    db.query('SELECT id FROM role WHERE title = ?', [answers.newRoleName], (err, results) => {
                        if (err) {
                            reject(err);
                        } else if (results.length > 0) {
                            const newRoleId = results[0].id;

                            db.query('UPDATE employee SET role_id = ? WHERE id = ?',
                                [newRoleId, answers.employeeId], (err) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        console.log('Employee role updated successfully.');
                                        resolve();
                                    }
                                });
                        } else {
                            console.log('New role not found.');
                            resolve();
                        }
                    });
                });
            }
        });
    });
}
       
        