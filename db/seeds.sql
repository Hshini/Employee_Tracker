INSERT INTO department (department_names)
               VALUES  ("Engineering"),
                       ("Finance"),
                       ("Legal"),
                       ("Sales");


INSERT INTO role  (title,department_id,salary)
            VALUES ("Sales Lead",4,100000),
                   ("Salesperson",4,80000),
                   ("Lead Engineer",1,15000),
                   ("Software Engineer",1,12000),
                   ("Account Manager",2,12000),
                   ("Accountant",2,16000),
                   ("Legal Team Lead",3,12500),
                   ("Lawyer",3,19000);

INSERT INTO employee  (first_name,last_name)           
            VALUES ("John","Doe"),
                   ("Mike","Chan"),
                   ("Ashley","Rodriguez"),
                   ("Kevin","Tupik"),
                   ("Kunal","Singh"),
                   ("Malia","Brown");