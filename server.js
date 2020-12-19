const mysql = require("mysql2/promise");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your MySQL username
  user: "root",
  // Your MySQL password
  password: "Iforgot1!",
  database: "employeetracker",
});

connection();
// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId)
// });

// rewrite as async await functions later?

const allDepartments = () => {
  "SELECT * FROM department";
};
allDepartments();

const allRoles = () => {
  "SELECT * FROM roles";
};
allRoles();

const allEmployees = () => {
  "SELECT * FROM employee";
};
allEmployees();

// module.exports = connection;
module.exports = {
  allDepartments,
  allRoles,
  allEmployees,
};
