IF EXISTS (SELECT 1 FROM [orderStatusTypes])
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng [orderStatusTypes].';
END
ELSE
BEGIN


insert into [orderStatusTypes] (StatusId, Type) values (3, 'Cancelled');
insert into [orderStatusTypes] (StatusId, Type) values (0, 'Pending');
insert into [orderStatusTypes] (StatusId, Type) values (1, 'Processing');
insert into [orderStatusTypes] (StatusId, Type) values (2, 'Completed');


END



