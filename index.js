"use strict";
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");
// connect

const connect = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your MySQL username
    user: "root",
    // Your MySQL password
    password: "Iforgot1!",
    database: "employeetracker_db",
  });
  console.log("connected as id " + connection.threadId + "\n");
  return connection;
};

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
const allDepartments = async (connection) => {
  const [departmentRows] = await connection.query(`SELECT * FROM department`);
  console.table("All Departments:", departmentRows);
};
const runDepartments = async () => {
  const connection = await connect();
  await allDepartments(connection);
  // console.log(allDepartments);
  connection.end();
};

//========VIEW ROLES ============
//view all roles

const allRoles = async (connection) => {
  const [roleRows] = await connection.query(`SELECT * FROM roles`);
  console.table("All Rows:", roleRows);
};
const runRoles = async () => {
  const connection = await connect();
  await allRoles(connection);
  console.log(allRoles);
  connection.end();
};

//=========VIEW EMPLOYEES===============
//view all employees   -- get code in employeeRoutes -- Display as formatted table
const allEmployees = async (connection) => {
  const [employeeRows] = await connection.query(
    `SELECT * FROM employee JOIN roles ON employee.role_id`
  );
  console.table("All Employees:", employeeRows);
  connection.end();
};
const runEmployees = async () => {
  const connection = await connect();
  await allEmployees(connection);
  console.log(allEmployees);
};

//////////////////////////////////////CODE THAT REQUIRES A SECOND PROMPT
//////////////////Second question is asked but doesn’t wait for second answer…
/////////////////////////GRR

//add a dept
//second prompt -- what is name of the new dept? .then addDepartment()
const addDeptPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new?",
    },
  ]);
};

//add a role
//second prompt --what is title for new role? what is salary for new role? .then addRoles()
const addRolePrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is title for the new role?",
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "What is the salary for the new role?",
    },
  ]);
};

//add an employee  -- later may link to tables so can choose role Id by Title, or Manager Id by something??
//second prompt -- employee first name? last name? role? manager? .then addEmployee()
const addEmployeePrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "newFirstName",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "newLastName",
      message: "What is the new employee's last name?",
    },
    {
      type: "input",
      name: "newEmployeeRole",
      message: "What is the new employee's role Id?",
    },
    {
      type: "input",
      name: "newEmployeeManager",
      message: "What is the new employee's manager's id number?",
    },
  ]);
};

//update an employee role  --- later add link to choose employee id by name ? & role id to title?
//second prompt -- select an employee name/id? select a role?  .then updateEmployee()
const updateEmplRolePrompt = () => {
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
function controlPrompts() {
  startPrompt().then((res) => {
    switch (res.choice) {
      case "view all departments":
        runDepartments().then((res) => {
          controlPrompts();
        });
        break;
      case "view all roles":
        runRoles().then((res) => {
          controlPrompts();
        });
        break;

      case "view all employees":
        runEmployees().then((res) => {
          controlPrompts();
        });
        break;

      case "add a department":
        addDeptPrompt().then((res) => {
          controlPrompts();
        });
        break;

      case "add a role":
        addRolePrompt().then((res) => {
          controlPrompts();
        });

        break;
      case "add an employee":
        addEmployeePrompt().then((res) => {
          controlPrompts();
        });
        break;

      case "add an employee":
        addEmployeePrompt().then((res) => {
          controlPrompts();
        });
        break;

      case "update an employee role":
        updateEmplRolePrompt().then((res) => {
          controlPrompts();
        });
        break;
    }
  });
}

controlPrompts();
