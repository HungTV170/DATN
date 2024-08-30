IF EXISTS (SELECT 1 FROM [reservations])
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng [reservations].';
END
ELSE
BEGIN
SET IDENTITY_INSERT [reservations] ON;


-- Chèn dữ liệu vào bảng reservations
DECLARE @Counter INT = 1;
DECLARE @MaxCount INT = 200;
DECLARE @StartDate DATETIME = DATEADD(MONTH, -3, GETDATE()); -- Ngày 3 tháng trước
DECLARE @EndDate DATETIME = GETDATE(); -- Ngày hiện tại

WHILE @Counter <= @MaxCount
BEGIN
    -- Tạo các giá trị ngẫu nhiên
    DECLARE @CustomerId INT = ABS(CHECKSUM(NEWID())) % 100 + 1; -- Ngẫu nhiên từ 1 đến 100
    DECLARE @TableId INT = ABS(CHECKSUM(NEWID())) % 15 + 1; -- Ngẫu nhiên từ 1 đến 15
    DECLARE @ReservationDate DATETIME = DATEADD(DAY, ABS(CHECKSUM(NEWID())) % DATEDIFF(DAY, @StartDate, @EndDate), @StartDate); -- Ngày ngẫu nhiên trong khoảng 3 tháng đến hiện tại

    -- Tạo thời gian ngẫu nhiên trong khoảng từ 00:00:00 đến 01:29:59
    DECLARE @RandomSeconds INT = ABS(CHECKSUM(NEWID())) % (90 * 60); -- Ngẫu nhiên từ 0 đến 5400 giây (90 phút)
    DECLARE @ReservationTime TIME = DATEADD(SECOND, @RandomSeconds, '00:00:00'); -- Thời gian ngẫu nhiên trong ngày

    DECLARE @NumberOfPeople INT = ABS(CHECKSUM(NEWID())) % 4 + 1; -- Ngẫu nhiên từ 1 đến 4

    -- Chèn dữ liệu vào bảng
    INSERT INTO reservations (ReservationId, CustomerId, TableId, ReservationDate, ReservationTime, NumberOfPeople)
    VALUES (@Counter, @CustomerId, @TableId, @ReservationDate, @ReservationTime, @NumberOfPeople);

    -- Tăng biến đếm
    SET @Counter = @Counter + 1;
END;

SET IDENTITY_INSERT [reservations] OFF;
END

