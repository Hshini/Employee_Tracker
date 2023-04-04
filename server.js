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
                db.query(`SELECT role.id,role.title,
                role.salary , department_names AS department FROM role LEFT JOIN department ON role.department_id = department.id`, (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.table(results)
                    question()
                })
            }

            if (answers.choices === "view all employees") {
                db.query(`SELECT * FROM employee`
                , (err, results) => {
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
            //Add new role  to table role
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
                        message: "Which department does the role belong to? Choose 1 for:Engineering, 2 for Finance,3 for Legal,4 for Sales",
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
            if(answers.choices === "add an employee"){
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
                        message: "What is Employee role? Choose 1 :Sales Lead,  2 for:Salesperson,3 for:Lead Engineer,4 for:Software Engineer,5 for:Account Manager,6 for:Accountant,7 for: Legal Team Lead, 8 for:Lawyer ",
                        choices:[1,2,3,4,5,6,7,8],
                        name: "employeeRole"
                    },
                    {
                        type: "list",
                        message: "Who is the employee manager? Choose 1 for :Mike Chan,3 for:Kevin Tupik, 5 for:Malia Brown, 7 for :Tom Allen" ,
                        choices:[1,3,5,7],
                        name: "employeeManager"
                    }
                ])
                    .then((answers) => {
                        const { employeeName,employeeLastName,employeeRole,employeeManager} = answers;
                        
                        db.query(`INSERT INTO  employee (first_name,last_name,role_id,manager_id) VALUES
                         ("${employeeName}","${employeeLastName}",${employeeRole},${employeeManager})`,(err, results) => {
                            if (err) {
                                console.log(err)
                            }
                           
                            console.table('Added ' + " " + `${employeeName}` + 'to the database ')
                                question()
                            
                        })

                    })
            }
            //update employee
            if(answers.choices === "update an employee role"){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Which  employee role do you want to update?",
                        name: "employeeUpdate"
                    },
                    {
                        type: "list",
                        message: "Which role do you want to assing the selected employee?, choose 1 for: Sales Lead ,2 for Salesperson,3 for: Lead Engineer,4 for: Software Engineer,5 for: Account Manager, 6 for: Accountant, 7 for: Legal Team Lead, 8 for :Lawyer ",
                        choices:[1,2,3,4,5,6,7,8],
                        name: "assingRole"
                    },
                   
                ])
                    .then((answers) => {
                        const { employeeUpdate,assingRole,} = answers;
                        
                        db.query(`INSERT INTO  employee () VALUE (?,?,?)`,(err, results) => {
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






