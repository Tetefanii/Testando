create database if not exists aula_login;
use aula_login;

create table if not exists users (
id int auto_increment primary key,
name varchar (100) not null,
email varchar (100) not null unique,
password varchar (255) not null,
created_at timestamp default current_timestamp
);