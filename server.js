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

const questions=[
    {
        type: "list",
        message: "What would you like to do?",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        name: 'choices'
    }
]
inquirer
    .prompt(questions)
    .then((answers) => {

        if (answers.choices === "view all departments") {
            db.query(`SELECT * FROM department `, (err, results) => {

                if (err) {
                    console.log(err)
                }
                console.log(results)
            },
            
            )
           
        }
        if (answers.choices === "view all roles") {
            db.query(`SELECT * FROM roles `, (error, results) => {
                console.log(results)
            })
        }

        if (answers.choices === "view all employees") {
            db.query(`SELECT * FROM employee`, (error, results) => {
                console.log(results)
            })
        }
        
    })

    .catch((error) => {
        console.log(error)
    }
    );

