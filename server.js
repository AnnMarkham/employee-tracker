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

// rewrite as async await functions later?

const allDepartments = async (connection) => {
  const [departmentRows] = await connection.query(`SELECT * FROM department`);
  console.log("DepartmentRows:", departmentRows);
};
const runDepartments = async () => {
  const connection = await connect();
  await allDepartments(connection);
  console.log(allDepartments);
  connection.end();
};

runDepartments(); //export this and call on select of all departments in index.js

const allRoles = async (connection) => {
  const [roleRows] = await connection.query(`SELECT * FROM roles`);
  console.log("RoleRows:", roleRows);
};
const runRoles = async () => {
  const connection = await connect();
  await allRoles(connection);
  console.log(allRoles);
  connection.end();
};

runRoles(); //export this and call on select of all departments in index.js

const allEmployees = async (connection) => {
  const [employeeRows] = await connection.query(`SELECT * FROM employee`);
  console.log("EmployeeRows:", employeeRows);
  connection.end();
};
const runEmployees = async () => {
  const connection = await connect();
  await allEmployees(connection);
  console.log(allEmployees);
};

runEmployees(); //export this and call on select of all departments in index.js

// const allRoles = () => {
//   "SELECT * FROM roles";
// };
// allRoles();

// const allEmployees = () => {
//   "SELECT * FROM employee";
// };
// allEmployees();

// // module.exports = connection;
// module.exports = {
//   allDepartments,
//   allRoles,
//   allEmployees,
// };
