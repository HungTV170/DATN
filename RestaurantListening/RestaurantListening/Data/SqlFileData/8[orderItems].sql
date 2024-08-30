IF EXISTS (SELECT 1 FROM orderItems)
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng orderItems.';
END
ELSE
BEGIN
SET IDENTITY_INSERT orderItems ON;



-- Chèn dữ liệu vào bảng orderItems
DECLARE @Counter INT = 1;
DECLARE @MaxCount INT = 700;
DECLARE @MaxOrderId INT = 300; -- Tối đa giá trị của OrderId
DECLARE @MaxItemId INT = 30;   -- Tối đa giá trị của ItemId

WHILE @Counter <= @MaxCount
BEGIN
    -- Tạo các giá trị ngẫu nhiên
    DECLARE @OrderId INT = ABS(CHECKSUM(NEWID())) % @MaxOrderId + 1; -- Ngẫu nhiên từ 1 đến 300
    DECLARE @ItemId INT = ABS(CHECKSUM(NEWID())) % @MaxItemId + 1;   -- Ngẫu nhiên từ 1 đến 30
    DECLARE @Quantity INT = ABS(CHECKSUM(NEWID())) % 5 + 1;          -- Ngẫu nhiên từ 1 đến 5

    -- Tính giá từ bảng menuItems
    DECLARE @PromotionalPrice DECIMAL(18, 2);
    SELECT @PromotionalPrice = Price FROM menuItems WHERE ItemId = @ItemId;

    -- Nếu không tìm thấy ItemId trong menuItems, đặt giá là 0
    IF @PromotionalPrice IS NULL
    BEGIN
        SET @PromotionalPrice = 0;
    END

    -- Chèn dữ liệu vào bảng
    INSERT INTO orderItems (OrderItemId, OrderId, ItemId, Quantity, PromotionalPrice)
    VALUES (@Counter, @OrderId, @ItemId, @Quantity, @PromotionalPrice);

    -- Tăng biến đếm
    SET @Counter = @Counter + 1;
END;

SET IDENTITY_INSERT orderItems OFF;
END
