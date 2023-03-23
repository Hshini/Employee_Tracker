require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const app = express();

const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database
},
);

const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        name: 'choices'
    }
]
function question() {
    inquirer.prompt(questions)
        .then((answers) => {

            if (answers.choices === "view all departments") {
                db.query(`SELECT * FROM department `, (err, results) => {

                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.table(results)
                        question()

                    }

                })

            }

            if (answers.choices === "view all roles") {
                db.query(`SELECT * FROM role `, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.table(results)
                    question()
                })
            }

            if (answers.choices === "view all employees") {
                db.query(`SELECT * FROM employee`, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.table(results)
                    question()
                })
            }
                //add  a new department to department table
            if (answers.choices === "add a department") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of Department?",
                        name: "department"
                    },
                ])
                    .then((answers) => {
                        const { department } = answers;

                        db.query(`INSERT INTO  department (department_names) VALUE (?)`, department, (err, results) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.table('Added ' + " " + `${department}` + 'to the database ')
                                question()
                            }
                        })

                    })
            }
            //Add new role    to table role
            if (answers.choices === "add a role") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of role?",
                        name: "roleName"
                    },
                    {
                        type: "input",
                        message: "What is the salary  of role?",
                        name: "salaryRole"
                    },
                    {
                        type: "list",
                        message: "Which department does the role belong to? Chose 1 for:Engineering, 2 for Finance,3 for Legal,4 for Sales",
                        choices:["1","2","3","4"],
                        name: "departmentsRole"
                    }
                ])
                    .then((answers) => {
                        const { roleName,salaryRole,departmentsRole} = answers;                           
                    db.query(`INSERT INTO  role(title,salary,department_id) VALUES ("${roleName}",${salaryRole},${departmentsRole})`,(err, results) => {
                            if (err) {
                                console.log(err)
                            }
                                console.table('Added ' + " " + `${roleName}` + 'to the database ')
                                question()
                        })

                    })
            }
            //Add Employee
            if(answers.question === "add an employee"){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is  name of employee?",
                        name: "employeeName"
                    },
                    {
                        type: "input",
                        message: "What is the lastname  of employee?",
                        name: "employeeLastName"
                    },
                    {
                        type: "list",
                        message: "What is Employee role?",
                        choices:['Sales Lead','Salesperson','Lead Engineer','Software Engineer',"Account Manager",'Accountant',"Legal Team Lead",'Lawyer'],
                        name: "employeeRole"
                    },
                    {
                        type: "list",
                        message: "Who is the employee manager?",
                        message: "Who is the employee manager?",
                        choices:['','','',''],
                        name: "department"
                    }
                ])
                    .then((answers) => {
                        const { employeeName,employeeLastName,employeeRole } = answers;
                        
                        db.query(`INSERT INTO  role () VALUE (?,?,?)`,(err, results) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                             
                                question()
                            }
                        })

                    })
            }
            //update employee
            if(answers.question === "update an employee role"){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Which  employee role do you want to update?",
                        name: "employeeName"
                    },
                    {
                        type: "list",
                        message: "Which role do you want to assing the selected employee?",
                        choices:['Sales Lead','Salesperson','Lead Engineer','Software Engineer',"Account Manager",'Accountant',"Legal Team Lead",'Lawyer'],
                        name: "assingRole"
                    },
                   
                ])
                    .then((answers) => {
                        const { employeeName,employeeLastName,employeeRole } = answers;
                        
                        db.query(`INSERT INTO  role () VALUE (?,?,?)`,(err, results) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.table("updated employee's role")
                                question()
                            }
                        })

                    })
            }

        })
        .catch((error) => {
            console.log(error)
        })
};


question();






