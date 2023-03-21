INSERT INTO department (department_names)
               VALUES  ("Engineering"),
                       ("Finance"),
                       ("Legal"),
                       ("Sales");


INSERT INTO role  (title,salary,department_id)
            VALUES ("Sales Lead",100000,4),
                   ("Salesperson",800000,4),
                   ("Lead Engineer",150000,1),
                   ("Software Engineer",120000,1),
                   ("Account Manager",120000,2),
                   ("Accountant",160000,2),
                   ("Legal Team Lead",125000,3),
                   ("Lawyer",190000,3);

INSERT INTO employee  (first_name,last_name)           
            VALUES ("John","Doe"),
                   ("Mike","Chan"),
                   ("Ashley","Rodriguez"),
                   ("Kevin","Tupik"),
                   ("Kunal","Singh"),
                   ("Malia","Brown");