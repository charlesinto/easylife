CREATE TABLE users(
	id int NOT NULL PRIMARY KEY auto_increment,
    firstName varchar(150) not null,
    lastName varchar(150) not null,
    emailAddress varchar(100) not null,
    active int default 1,
    resetPassword int default 0,
    phoneNumber varchar(100) not null,
    country varchar(30),
    countryCode varchar(6),
    password varchar(300) not null,
    datecreated timestamp default current_timestamp
);