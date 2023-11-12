const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
        db.query(`INSERT INTO role(title, salary, department_id) values $(rolename, salary, dpbelong)`)
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
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id values $(firstname, lastname, role, manager))`)
    })
};
const updateRole = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'dpname',
            message: 'What is the department name?',
            choices: [`$(viewEmployees)`]
        },
    ]).then(answers=>{
        
    })
}
  