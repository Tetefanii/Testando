create database teste3;
use teste3;
create table minha_tabela(
id int auto_increment primary key,
nome varchar(100),
data_registro timestamp default current_timestamp
);

insert into minha_tabela(nome)values("Luiz");

select * from minha_tabela;

select date_format(now(),'%Y-%m-%d %H:%i:%s')AS data_formatada;

select timestampdiff(minute,'2023-09-20 10:00:00',NOW()) AS diferenca_minutos;
 
SELECT DISTINCT job FROM emp;
 
SELECT * FROM emp WHERE sal NOT IN (1500, 2800);

select ename, sal, deptno from emp where deptno = 20 ORDER BY sal DESC;

select * from emp where ename like '%TH%' or ename like '%LL%';

select ename, deptno, sal from emp ORDER BY sal DESC;

--subconsulg--