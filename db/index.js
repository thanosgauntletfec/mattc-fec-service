const mysql = require('mysql');


var con = mysql.createConnection({
  host: "http://ec2-54-183-180-104.us-west-1.compute.amazonaws.com",
  user: "student",
  password: 'student',
  database: 'trulia'
});


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

const postInfoRequest = ({ name, email, phone, body, house_id, financing }) => {
  return new Promise((resolve, rejext) => {
    con.query(`INSERT INTO info_requests VALUES (NULL, "${house_id}", "${financing}", "${name}", "${phone}", "${email}")`);
    if (err) {
      console.log(err);
      reject(err)
    }
    resolve(res)
  })
}

const scheduleTour = ({ name, day, email, financing, house_id, phone, time, tourType}) => {
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
  checkAvailability,
  postInfoRequest
}


