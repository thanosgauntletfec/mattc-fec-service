USE homes

CREATE TABLE IF NOT EXISTS address (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  address varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS availability (
  house_id int unsigned NOT NULL,
  day varchar(20) NOT NULL,
  time varchar(10) NOT NULL
)