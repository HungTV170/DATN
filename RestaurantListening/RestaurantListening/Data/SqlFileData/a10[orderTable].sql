IF EXISTS (SELECT 1 FROM [OrderTable])
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng OrderTable.';
END
ELSE
BEGIN
SET IDENTITY_INSERT [OrderTable] ON;

DECLARE @i INT = 1;
WHILE @i <= 300
BEGIN
    INSERT INTO [OrderTable] (OrderTableId, OrderId, TableId)
    VALUES (@i, FLOOR(RAND() * 300) + 1, FLOOR(RAND() * 15) + 1);
    SET @i = @i + 1;
END;


SET IDENTITY_INSERT [OrderTable] OFF;
END
