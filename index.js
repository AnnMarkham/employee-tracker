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

// connect and log
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  controlPrompts();
});

//prompt for choices at start  -- write prompts and add/update functions as async await functions?

const startPrompt = () => {
  return inquirer.prompt({
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
  });
};
//=======VIEW DEPARTMENTS===========
//view all depts    -- get code in departmentRoutes -- Display as formatted table
// get deps
const allDepartments = async () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    controlPrompts();
  });
};
//========VIEW ROLES ============
//view all roles
const allRoles = async () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    controlPrompts();
  });
};

//=========VIEW EMPLOYEES===============
//view all employees   -- get code in employeeRoutes -- Display as formatted table
const allEmployees = async () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    controlPrompts();
  });
};

//////////////////////////////////////CODE THAT REQUIRES A SECOND PROMPT
//////////////////Second question is asked but doesn’t wait for second answer…
/////////////////////////GRR

//add a dept
//second prompt -- what is name of the new dept? .then addDepartment()
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
      console.log("Department Added!");
      controlPrompts();
    }
  );
};

//////ADD FREAKING DEPARTMENT HERE!!!!!!!!!!!!!

//add a role
//second prompt --what is title for new role? what is salary for new role? .then addRoles()

const addRole = async () => {
  const res = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: " What is the name of the new employee title?",
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
    }
  );
  controlPrompts();
};

//add an employee  -- later may link to tables so can choose role Id by Title, or Manager Id by something??
//second prompt -- employee first name? last name? role? manager? .then addEmployee()
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
    }
  );
  controlPrompts();
};

//update an employee role  --- later add link to choose employee id by name ? & role id to title?
//second prompt -- select an employee name/id? select a role?  .then updateEmployee()
const updateEmplRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "updatedEmplId",
      message: "What is ID of the employee to be updated?",
    },
    {
      type: "input",
      name: "updatedEmplRoleId",
      message: "What is the role ID you would like to update?",
    },
  ]);
};

//write functions for addDepartment, addRoles, addEamploye, and updateEmployee that are called above

//this needs to be updated -- if choose add role, it runs addDeptPrompt first.
const controlPrompts = () => {
  startPrompt().then((res) => {
    switch (res.choice) {
      case "view all departments":
        allDepartments().then((res) => {
          controlPrompts();
        });
        break;
      case "view all roles":
        allRoles().then((res) => {
          controlPrompts();
        });
        break;

      case "view all employees":
        allEmployees().then((res) => {
          controlPrompts();
        });
        break;

      case "add a department":
        addDepartment().then((res) => {
          controlPrompts();
        });
        break;

      case "add a role":
        addRole().then((res) => {
          controlPrompts();
        });

        break;
      case "add an employee":
        addEmployee().then((res) => {
          controlPrompts();
        });
        break;

      case "update an employee role":
        updateEmplRole().then((res) => {
          controlPrompts();
        });
        break;
    }
  });
};
