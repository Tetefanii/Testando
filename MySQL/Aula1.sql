-- comentários
-- CRIAR O DATABASE
CREATE DATABASE aluno;
-- Selecionar o database
USE aluno;
-- CRIAR UMA TABELA
create table pessoa(
ID_pessoa int primary key,
Nome varchar(100)
);
-- excluir o database
drop database aluno;
-- excluir a tabela
drop table pessoa;

-- alterar tabela
-- incluir um  campo
alter table pessoa add DataNasc date;
-- modificar o tipo de dados
alter table pessoa modify column DataNasc varchar(50); 
-- incluir uma restrição
alter table pessoa modify column DataNasc varchar(50) not null; 


create database condominio;
use condominio;
create table Edificio(
codigoEdificio int primary key,
endereco varchar(100)
);

create table apartamento(
numeroapto int primary key,
areaApto double,
codigoEdificio int,
foreign key (codigoEdificio) references Edificio(codigoEdificio)
);


create database construtora;
use construtora;
create table Engenheiro(
CodigoEngenheiro int primary key,
nome varchar(100)
);

create table Projeto(
CodigoProjeto int primary key,
titulo varchar(50)
);
create table EngenheiroProjeto(
CodigoEngenheiro int,
CodigoProjeto int,
funcao varchar(50),
foreign key (CodigoEngenheiro) references Engenheiro(CodigoEngenheiro),
foreign key (CodigoProjeto) references Projeto(CodigoProjeto)
);


create database seguradora;
use seguradora;
create table Cliente(
IdCliente int primary key,
Nome varchar(50)
);

create table Apolice(
IdApolice int primary key,
valor double,
IdCliente int,
RegistroCarro int, 
foreign key (IdCliente) references Cliente(IdCliente)
);

create table Carro(
Registro int primary key,
Marca varchar(50)
);

create table Acidente(
IdAcidente int primary key,
DataAcidente datetime
);

create table CarroAcidente(
IdAcidente int,
RegistroCarro int,
foreign key (RegistroCarro) references Carro(RegistroCarro),
foreign key (IdAcidente) references Acidente(IdAcidente)
);
