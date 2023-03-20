DROP DATABASE IF  EXISTS employee_Tracker_db;

CREATE DATABASE employee_Tracker_db;

USE employee_Tracker_db;

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT ,
    department_names VARCHAR(30)

);

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN  KEY (department_id)  REFERENCES department(id)
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INT,
    FOREIGN  KEY (roles_id) REFERENCES roles(id),
    manager_id INT,
    FOREIGN  KEY (manager_id) REFERENCES employee(id)
    ON DELETE SET NULL
);