IF EXISTS (SELECT 1 FROM tables)
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng tables.';
END
ELSE
BEGIN
SET IDENTITY_INSERT tables ON;


insert into tables (TableId, TableNumber, Seats, Status) values (1, 1, 6, 'Available');
insert into tables (TableId, TableNumber, Seats, Status) values (2, 2, 8, 'Occupied');
insert into tables (TableId, TableNumber, Seats, Status) values (3, 3, 5, 'Occupied');
insert into tables (TableId, TableNumber, Seats, Status) values (4, 4, 6, 'Reserved');
insert into tables (TableId, TableNumber, Seats, Status) values (5, 5, 7, 'Available');
insert into tables (TableId, TableNumber, Seats, Status) values (6, 6, 7, 'Occupied');
insert into tables (TableId, TableNumber, Seats, Status) values (7, 7, 7, 'Occupied');
insert into tables (TableId, TableNumber, Seats, Status) values (8, 8, 6, 'Reserved');
insert into tables (TableId, TableNumber, Seats, Status) values (9, 9, 6, 'Reserved');
insert into tables (TableId, TableNumber, Seats, Status) values (10, 10, 4, 'Reserved');
insert into tables (TableId, TableNumber, Seats, Status) values (11, 11, 5, 'Reserved');
insert into tables (TableId, TableNumber, Seats, Status) values (12, 12, 4, 'Available');
insert into tables (TableId, TableNumber, Seats, Status) values (13, 13, 8, 'Available');
insert into tables (TableId, TableNumber, Seats, Status) values (14, 14, 6, 'Reserved');
insert into tables (TableId, TableNumber, Seats, Status) values (15, 15, 8, 'Reserved');

SET IDENTITY_INSERT tables OFF;
END


