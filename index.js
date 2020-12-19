"use strict";
const inquirer = require("inquirer");
// const cTable = require('console.table');
//require('./server')

//prompt for choices at start  -- write prompts and add/update functions as async await functions?
const startPrompt = () => {
  return inquirer.prompt([
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

startPrompt();
//view all depts    -- get code in departmentRoutes -- Display as formatted table
//view all roles
//view all employees   -- get code in employeeRoutes -- Display as formatted table
//add a dept
//second prompt -- what is name of the new dept? .then addDepartment()
//add a role
//second prompt --what is title for new role? what is salary for new role? .then addRoles()
//add an employee
//second prompt -- employee first name? last name? role? manager? .then addEmployee()
//update an employee role
//second prompt -- select an employee name/id? select a role?  .then updateEmployee()

//write functions for addDepartment, addRoles, addEamploye, and updateEmployee that are called above

//
