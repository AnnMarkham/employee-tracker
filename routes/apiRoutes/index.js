// const express = require('express');
// const router = express.Router();
// const inquirer = require('inquirer');
// const cTable = require('console.table');

// router.use(require('./employeeRoutes'));
// router.use(require('./rolesRoutes'));
// router.use(require('./departmentRoutes'));


//prompt for choices at start  -- write prompts and add/update functions as async await functions?
   //view all depts    -- get code in departmentRoutes -- Display as formatted table
   //view all roles -- get code in rolesRoutes
   //view all employees   -- get code in employeeRoutes -- Display as formatted table
   //add a dept
        //second prompt -- what is name of the new dept? .then addDepartment() -- Post route in departmentRoutes
    //add a role
        //second prompt --what is title for new role? what is salary for new role? .then addRoles() -- Post route in rolesRoutes
    //add an employee
        //second prompt -- employee first name? last name? role? manager? .then addEmployee() -- Post route in employeeRoutes
    //update an employee role
        //second prompt -- select an employee name/id? select a role?  .then updateEmployee()  -- Put route in employeeRoutes

  //write functions for addDepartment, addRoles, addEamploye, and updateEmployee that are called above  -- see notes above re: Get Post and Put routes. 

//


// module.exports = router;
//module.exports =  other stuff