DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
    id  INT NOT NULL AUTO_INCREMENT primary KEY;
    department_name varchar(30) NOT NULL;
);

CREATE TABLE role (
    id  INT NOT NULL AUTO_INCREMENT primary KEY;
    title varchar(30) NOT NULL;
    salary decimal NOT NULL;
    department_id INT NOT NULL;
    FOREIGN KEY (department_id)
    REFERENCES book_prices(id)

);

CREATE TABLE employee (
    id INT NOT NULL;
    first_name varchar(30) not NULL;
    last_name varchar(30) NOT NULL;
    role_id INT NOT NULL;
    FOREIGN KEY (role_id)
    REFERENCES book_prices(id)
    manager_id INT NOT NULL;
);