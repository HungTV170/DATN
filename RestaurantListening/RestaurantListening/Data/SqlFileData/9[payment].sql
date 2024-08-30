IF EXISTS (SELECT 1 FROM payments)
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng payments.';
END
ELSE
BEGIN
SET IDENTITY_INSERT payments ON;


-- Chèn 300 bản ghi vào bảng payments
DECLARE @Counter INT = 1;
DECLARE @MaxCount INT = 300;

WHILE @Counter <= @MaxCount
BEGIN
    -- Lấy giá trị OrderId từ @Counter
    DECLARE @OrderId INT = @Counter;
    
    -- Tính tổng Amount từ bảng orderItems dựa trên OrderId
    DECLARE @Amount DECIMAL(18, 2);
    SELECT @Amount = SUM(PromotionalPrice*Quantity)
    FROM orderItems
    WHERE OrderId = @OrderId;
    
    -- Kiểm tra nếu statusId là 3, bỏ qua vòng lặp
    DECLARE @StatusId INT;
    SELECT @StatusId = statusId
    FROM orders
    WHERE OrderId = @OrderId;

    IF @StatusId != 2
    BEGIN
        SET @Counter = @Counter + 1;
        CONTINUE; -- Bỏ qua vòng lặp này và tiếp tục vòng lặp tiếp theo
    END

    -- Lấy PaymentDate từ bảng orders (OrderDate + 1 giờ 30 phút)
    DECLARE @PaymentDate DATETIME;
    SELECT @PaymentDate = DATEADD(MINUTE, 90, OrderDate)
    FROM orders
    WHERE OrderId = @OrderId;
    
    -- Chọn ngẫu nhiên PaymentMethod giữa 'Tiền Mặt' và 'Chuyển Khoản'
    DECLARE @PaymentMethod NVARCHAR(20);
    SET @PaymentMethod = CASE WHEN ABS(CHECKSUM(NEWID())) % 2 = 0 THEN N'Tiền Mặt' ELSE N'Chuyển Khoản' END;

    -- Chèn dữ liệu vào bảng payments
    INSERT INTO payments (PaymentId, OrderId, Amount, PaymentDate, PaymentMethod)
    VALUES (@Counter, @OrderId, @Amount, @PaymentDate, @PaymentMethod);

    -- Tăng biến đếm
    SET @Counter = @Counter + 1;
END;


SET IDENTITY_INSERT payments OFF;
END
