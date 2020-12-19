const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Iforgot1!',
  database: 'employeetracker'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId)
});

module.exports = connection;