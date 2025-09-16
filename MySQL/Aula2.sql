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

create database restaurante;
use restaurante;

create table Cliente(
Id_cliente int primary key,
Nome_cliente varchar(100) not null,
Telefone int not null
);
INSERT INTO Cliente(Id_cliente,Nome_cliente,Telefone) values ("6","Jose","1193");
select * from Cliente;

create table Pedido(
Id_pedido int primary key,
Data_pedido date not null,
Status_pedido varchar(100)not null,
Id_cliente int,
foreign key(Id_cliente) references Cliente(Id_cliente)
);

INSERT INTO Pedido(Id_pedido,Data_pedido,Status_pedido) values 
("4","15","entregue");
select * from Pedido;

create table Prato(
Id_prato int primary key,
Preco double not null,
Nome_prato varchar(100)not null,
Descricao_prato varchar(100),
Categoria varchar(100)
);

INSERT INTO Prato(Id_prato,Preco,Nome_prato,Descricao_prato,categoria) values 
("1","15.00","sushi","suchi com sucrilhos","5 estrelas");
select * from Prato;

create table Ingrediente(
Id_ingred int primary key,
Estoque varchar(100)not null,
Estoque_ingrediente int not null
);

INSERT INTO Ingrediente(Id_ingred,Estoque,Estoque_ingrediente) values 
("1","frios","64");
select * from Ingrediente;

create table Prato_ingrediente(
Id_prato int,
Id_ingred int,
foreign key(Id_prato) references Prato (Id_prato),
foreign key(Id_Ingred) references Ingrediente (Id_Ingred)
);
INSERT INTO Prato_ingrediente(Id_prato,Id_ingred) values 
("1","1");
select * from Prato_ingrediente;

create table Pedido_Prato(
Id_prato int,
Id_ingred int,
foreign key(Id_prato) references Prato (Id_prato),
foreign key(Id_Ingred) references Ingrediente (Id_Ingred)
); 

INSERT INTO Pedido_Prato(Id_prato,Id_ingred) values 
("1","1");

ROLLBACK;

create database Escola;
use escola;
create table Pessoa(
Pessoa_Id int primary key auto_increment,
UltimoNome varchar(255) not null,
PrimeiroNome varchar(255) not null,
Idade int check(idade>=18),
Cidade varchar(100) default "São Paulo"
);
INSERT INTO Pessoa(UltimoNome,PrimeiroNome,Idade,Cidade)values
("Américo","José",55,"Osasco"),
("Macedo","Jennie",33,"Helena Maria");

select * from Pessoa;




