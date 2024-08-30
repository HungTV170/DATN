IF EXISTS (SELECT 1 FROM orders)
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng orders.';
END
ELSE
BEGIN
SET IDENTITY_INSERT orders ON;

-- Chèn dữ liệu vào bảng orders
DECLARE @Counter INT = 1;
DECLARE @MaxCount INT = 300;
DECLARE @StartDate DATETIME = DATEADD(MONTH, -3, GETDATE()); -- Ngày 3 tháng trước
DECLARE @EndDate DATETIME = GETDATE(); -- Ngày hiện tại

WHILE @Counter <= @MaxCount
BEGIN
    -- Tạo các giá trị ngẫu nhiên
    DECLARE @CustomerId INT = ABS(CHECKSUM(NEWID())) % 100 + 1; -- Ngẫu nhiên từ 1 đến 100
    DECLARE @EmployeeId INT = ABS(CHECKSUM(NEWID())) % 30 + 1; -- Ngẫu nhiên từ 1 đến 30
    DECLARE @StatusId INT = ABS(CHECKSUM(NEWID())) % 4; -- Ngẫu nhiên từ 0 đến 3

    -- Tạo ngày đặt ngẫu nhiên trong khoảng từ 3 tháng trước đến hiện tại
    DECLARE @OrderDate DATETIME = DATEADD(DAY, ABS(CHECKSUM(NEWID())) % DATEDIFF(DAY, @StartDate, @EndDate), @StartDate);

    -- Chèn dữ liệu vào bảng
    INSERT INTO orders (OrderId, CustomerId, EmployeeId, OrderDate, StatusId)
    VALUES (@Counter, @CustomerId, @EmployeeId, @OrderDate, @StatusId);

    -- Tăng biến đếm
    SET @Counter = @Counter + 1;
END;


SET IDENTITY_INSERT orders OFF;
END
