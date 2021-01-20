const mysql = require('mysql') ;
const pw = require('./dbpw.js');
const faker = require('faker');

var con = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: "student",
  database: "trulia"

});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let getRandomAddress = () => {
  streetTypes = ['Ave', 'Rd', 'St', 'Cir', 'Ct', 'Ln', 'Way', "Dr"]
  random = getRandomInt(streetTypes.length)

  let num = getRandomInt(3001);
  let newAddress = [[num + ' ' + faker.address.streetName().split(' ')[0] + ' ' + streetTypes[random]], [faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode().split('-')[0]]]
  newAddress = newAddress.join(", ");
  return newAddress;
}

con.query('delete from address;');

for (var i = 0; i < 100; i++) {
  let address = getRandomAddress();

  con.query(`INSERT INTO address values (null, "${address}");`);
}

console.log("Done Seeding DB")