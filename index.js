"use strict";
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// connect
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Iforgot1!",
  database: "employeetracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  startPrompt();
});

//prompt for main menu
const startPrompt = () => {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What do would you like to do",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    })
    .then(({ choice }) => {
      switch (choice) {
        case "view all departments":
          return allDepartments();

        case "view all roles":
          return allRoles();

        case "view all employees":
          return allEmployees();

        case "add a department":
          return addDepartment();

        case "add a role":
          return addRole();

        case "add an employee":
          return addEmployee();

        case "update an employee role":
          return updateEmplRole();
      }
    });
};

//view all depts
const allDepartments = async () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table("\n" + "All Departments: ", res);
    startPrompt();
  });
};

//view all roles
const allRoles = async () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table("\n" + "All Roles: ", res);
    startPrompt();
  });
};

//view all employees
const allEmployees = async () => {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table("\n" + "All Employees: ", res);
    startPrompt();
  });
};

//add a dept
const addDepartment = async () => {
  const res = await inquirer.prompt({
    name: "department",
    type: "input",
    message: "Please enter a new department name",
  });
  connection.query(
    "INSERT INTO department SET ?",
    { name: res.department },
    function (err, res) {
      if (err) throw err;
      console.log("\n" + "Department Added!" + "\n");
      startPrompt();
    }
  );
};

//add a role
const addRole = async () => {
  const res = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: " What the title for the new role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of this title?",
    },
    {
      name: "id",
      type: "list",
      message: "Which Department does this title work in?",
      choices: [100, 101, 110, 111, 1],
    },
  ]);
  console.log(res.title, res.salary, res.id);
  connection.query(
    "INSERT INTO roles SET ?",
    {
      title: res.title,
      salary: res.salary,
      department_id: res.id,
    },
    function (err, res) {
      if (err) throw err;
      console.log("\n" + "Role Added!" + "\n");
      startPrompt();
    }
  );
};

//add an employee
const addEmployee = async () => {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the new employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the new employee's role Id?",
      choices: [142, 101, 100, 111, 1, 1],
    },
    {
      type: "list",
      name: "nmanager_id",
      message: "What is the new employee's manager's id number?",
      choices: [1042, 2, 3, 4],
    },
  ]);
  connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: res.first_name,
      last_name: res.last_name,
      role_id: res.role_id,
      manager_id: res.manager_id,
    },
    function (err, res) {
      if (err) throw err;
      console.log("\n" + "Employee Added!" + "\n");
      startPrompt();
    }
  );
};

//update an employee role
const updateEmplRole = async () => {
  const res = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is ID of the employee to be updated?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the new role id?",
      choices: [1042, 2, 3, 4],
    },
  ]);
  connection.query(
    "UPDATE employee SET? WHERE ?",
    [
      {
        role_id: res.role_id,
      },
      {
        id: res.id,
      },
    ],
    function (err, res) {
      if (err) throw err;
      console.log("\n" + "Role Updated!" + "\n");
      startPrompt();
    }
  );
};
