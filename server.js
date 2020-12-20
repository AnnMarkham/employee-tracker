const mysql = require("mysql2/promise");
const cTable = require("console.table");

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

//=================================
//      VIEW FUNCTIONS
//================================
//This function meets requirement -- just need to get it to work only when view all depts is selected from startPrompt in index.js
const allDepartments = async (connection) => {
  const [departmentRows] = await connection.query(`SELECT * FROM department`);
  console.table("All Departments:", departmentRows);
};
// const runDepartments = async () => {
//   const connection = await connect();
//   await allDepartments(connection);
//   console.log(allDepartments);
//   connection.end();
// };

runDepartments(); //export this and call on select of all departments in index.js

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

runRoles(); //export this and call on select of all departments in index.js

//
//export this and call on select of all departments in index.js

// module.exports = connection;
module.exports = {
  allDepartments,
  allRoles,
  allEmployees,
  runDepartments,
  runRoles,
  runEmployees,
};
