const mysql = require('mysql');
const pw = require('./dbpw.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: pw.pw,
  database: 'homes'
});

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

const getAddress = (id) => {
  return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM address WHERE id = ${id};`, (err, res) => {
      if (err) {
        console.log(err)
      }
      console.log(res)
      resolve(res)
    });
  });
};


module.exports = {
  getAddress
}


