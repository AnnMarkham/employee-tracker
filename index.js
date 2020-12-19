"use strict";
const inquirer = require("inquirer");
// const cTable = require('console.table');
//require('./server')

//prompt for choices at start  -- write prompts and add/update functions as async await functions?
const startPrompt = async () => {
  await inquirer.prompt([
    {
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
    },
  ]);
};

//view all depts    -- get code in departmentRoutes -- Display as formatted table
//view all roles
//view all employees   -- get code in employeeRoutes -- Display as formatted table

//add a dept
//second prompt -- what is name of the new dept? .then addDepartment()
const addDeptPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department?",
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
      name: "updatedEmplName",
      message: "What is the Id of the employee you would like to update?",
    },
    {
      type: "input",
      name: "updatedEmplRole",
      message: "What is the Role Id of the employee you would like to update?",
    },
  ]);
};

//write functions for addDepartment, addRoles, addEamploye, and updateEmployee that are called above

//this needs to be updated -- if choose add role, it runs addDeptPrompt first.
startPrompt()
  .then(addDeptPrompt)
  .then(addRolePrompt)
  .then(addEmployeePrompt)
  .then(updateEmplRolePrompt);
