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

use escritorio;

select ename, job from emp where job = (select job from emp where ename = 'Jones');

select ename, job, deptno from emp where deptno = (select deptno from emp where ename = 'Martin');

select ename, job from emp where job = (select job from emp where empno = 7369) and sal > (select sal from emp where empno = 7876);

select ename, sal, deptno from emp where sal IN (select min(sal)from emp group by deptno);

select ename, sal, job, deptno from emp where sal > any(select distinct sal from emp where deptno=30);

select ename,sal,job,deptno from emp where sal > ALL (select distinct sal from emp where deptno=30);

select ename, hiredate, job, deptno from emp where deptno = (select deptno from emp where ename = 'Allen');

use emp;

select deptno, ename, job from emp where deptno = (select deptno from dept where dname = 'Sales');

select ename, job, sal from emp where sal > (select avg(sal) from emp);

select ename, sal, hiredate, deptno from emp where deptno = (select deptno from emp where ename = 'Martin') and sal < (select avg(sal) from emp);

select e.ename,e.job,d.dname from emp e,dept d where e.deptno = d.deptno;

select emp.ename,emp.job,dept.dname from emp,dept where emp.deptno=dept.deptno;