IF EXISTS (SELECT 1 FROM employees)
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng employees.';
END
ELSE
BEGIN
SET IDENTITY_INSERT employees ON;

insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (1, 'Rawley', 'Robbe', '732-233-0550', 'rrobbe0@ezinearticles.com', 'waitress');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (2, 'Bordie', 'Barnwell', '919-119-8659', 'bbarnwell1@abc.net.au', 'waiter');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (3, 'Kora', 'Abrahim', '894-847-6325', 'kabrahim2@washington.edu', 'busser');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (4, 'Roxane', 'Beazley', '813-850-1692', 'rbeazley3@github.com', 'manager');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (5, 'Gordon', 'Rundle', '802-798-7705', 'grundle4@wix.com', 'waiter');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (6, 'Daniela', 'Cleef', '401-515-1682', 'dcleef5@dagondesign.com', 'manager');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (7, 'Elise', 'Dan', '386-761-2241', 'edan6@cocolog-nifty.com', 'bartender');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (8, 'Dianna', 'Nibley', '512-754-7948', 'dnibley7@canalblog.com', 'chef');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (9, 'Gayel', 'Wooding', '659-573-6386', 'gwooding8@eepurl.com', 'waiter');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (10, 'Jeremias', 'Florentine', '263-136-0855', 'jflorentine9@woothemes.com', 'waitress');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (11, 'Ronna', 'Downie', '965-632-3857', 'rdowniea@1und1.de', 'waitress');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (12, 'Hinze', 'Braidon', '134-996-2750', 'hbraidonb@1und1.de', 'bartender');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (13, 'Winny', 'Emanuelov', '447-472-9347', 'wemanuelovc@about.com', 'busser');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (14, 'Tally', 'Caddens', '803-738-8962', 'tcaddensd@goo.ne.jp', 'waiter');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (15, 'Carolyne', 'Baike', '968-796-1399', 'cbaikee@wix.com', 'manager');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (16, 'Gery', 'Highnam', '428-636-9982', 'ghighnamf@ibm.com', 'busser');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (17, 'Edythe', 'Daniel', '411-201-0579', 'edanielg@time.com', 'bartender');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (18, 'Waldon', 'Wincer', '433-570-3264', 'wwincerh@intel.com', 'waitress');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (19, 'Gwyn', 'Pes', '476-378-4160', 'gpesi@php.net', 'host/hostess');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (20, 'Jarrod', 'Flattman', '415-884-5355', 'jflattmanj@xrea.com', 'bartender');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (21, 'Isahella', 'Sarson', '603-294-1392', 'isarsonk@yolasite.com', 'chef');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (22, 'Adolph', 'Berthe', '573-909-5210', 'aberthel@google.pl', 'waiter');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (23, 'Hoebart', 'MacDunleavy', '719-408-7629', 'hmacdunleavym@omniture.com', 'chef');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (24, 'Adriana', 'Pierro', '457-541-5823', 'apierron@woothemes.com', 'waitress');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (25, 'Kellie', 'Freeburn', '918-465-1557', 'kfreeburno@dot.gov', 'manager');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (26, 'De witt', 'Shawcroft', '844-902-1576', 'dshawcroftp@hhs.gov', 'chef');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (27, 'Dawn', 'Rosen', '703-662-2177', 'drosenq@telegraph.co.uk', 'bartender');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (28, 'Rouvin', 'Fayter', '336-278-5848', 'rfayterr@earthlink.net', 'busser');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (29, 'Ollie', 'Pauling', '525-617-4109', 'opaulings@discovery.com', 'waitress');
insert into employees (EmployeeId, FirstName, LastName, PhoneNumber, Email, Role) values (30, 'Doris', 'Terrazzo', '298-927-8856', 'dterrazzot@myspace.com', 'bartender');

SET IDENTITY_INSERT employees OFF;
END
