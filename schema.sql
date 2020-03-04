 DROP DATABASE IF EXISTS data_db;

CREATE DATABASE data_db;

 USE data_db;

CREATE TABLE role(
 id int AUTO_INCREMENT NOT NULL,
 title varchar(30) NOT NULL,
  salary INT,
  department_id VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE department(
	id int AUTO_INCREMENT NOT NULL,
    name_dep VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);