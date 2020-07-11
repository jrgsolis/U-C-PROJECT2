DROP DATABASE IF EXISTS ubergames;
CREATE DATABASE ubergames;
USE  ubergames;


CREATE TABLE  Conditions (
    id INTEGER NOT NULL auto_increment , 
    name VARCHAR(255), 
    createdAt DATETIME NOT NULL, 
    updatedAt DATETIME NOT NULL, 
    PRIMARY KEY (id)) ;


CREATE TABLE Posts (
    id INTEGER NOT NULL auto_increment , 
    title VARCHAR(255) NOT NULL, 
    body TEXT NOT NULL, 
    price DECIMAL(10,2) NOT NULL, 
    createdAt DATETIME NOT NULL, 
    updatedAt DATETIME NOT NULL, 
    ConditionId INTEGER, PRIMARY KEY (id), 
    FOREIGN KEY (ConditionId) REFERENCES Conditions (id) ON DELETE CASCADE ON UPDATE CASCADE);