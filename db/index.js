const mysql = require('mysql');
const pw = require('./dbpw.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: pw.pw,
  database: 'trulia'
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
        reject(err);
      }
      resolve(res);
    });
  });
};

const checkAvailability = (id, day) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT timeslot FROM tours WHERE home_id = ${id} AND day = "${day}"`, (err, res) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      resolve(res);
    })
  })
}

const scheduleTour = ({ name, day, email, financing, house_id, phone, time, tourType}) => {
  console.log('scheduling tour')
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO tours VALUES (NULL, ${house_id}, "${financing}", "${name}", "${time}", "${phone}", "${email}", "${tourType}", "${day}" )`, (err, res) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      console.log('done')
      resolve(res);
    })
  })
}


module.exports = {
  getAddress,
  scheduleTour,
  checkAvailability
}


