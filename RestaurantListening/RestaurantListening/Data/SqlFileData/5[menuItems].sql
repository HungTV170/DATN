IF EXISTS (SELECT 1 FROM [menuItems])
BEGIN
    PRINT 'Có ít nhất một bản ghi trong bảng [menuItems].';
END
ELSE
BEGIN
SET IDENTITY_INSERT [menuItems] ON;

INSERT INTO [menuItems] (ItemId, Name, Description, Price, Category, ItemImg)
VALUES
(1, N'Phở Bò', N'Phở bò với nước dùng thơm ngon', 50000, N'Bún/Phở', N'pho_bo.jpg'),
(2, N'Bánh Mì Thịt', N'Bánh mì thịt kèm rau sống và nước sốt', 30000, N'Món Ăn Nhanh', N'banh_mi_thit.jpg'),
(3, N'Gỏi Cuốn', N'Gỏi cuốn tôm thịt với nước chấm đặc biệt', 35000, N'Món Khai Vị', N'goi_cuon.jpg'),
(4, N'Cơm Tấm Sườn', N'Cơm tấm sườn nướng thơm ngon', 60000, N'Món Chính', N'com_tam_suon.jpg'),
(5, N'Bún Thịt Nướng', N'Bún thịt nướng với rau sống và nước mắm chua ngọt', 45000, N'Bún/Phở', N'bun_thit_nuong.jpg'),
(6, N'Lẩu Thái', N'Lẩu Thái hải sản cay nồng', 200000, N'Món Chính', N'lau_thai.jpg'),
(7, N'Bánh Xèo', N'Bánh xèo giòn rụm kèm rau sống', 40000, N'Món Khai Vị', N'banh_xeo.jpg'),
(8, N'Hủ Tiếu Nam Vang', N'Hủ tiếu Nam Vang với tôm, thịt và trứng cút', 55000, N'Bún/Phở', N'hu_tieu_nam_vang.jpg'),
(9, N'Bánh Cuốn', N'Bánh cuốn nóng hổi với hành phi và nước mắm', 30000, N'Món Khai Vị', N'banh_cuon.jpg'),
(10, N'Mì Quảng', N'Mì Quảng với tôm, thịt và rau sống', 50000, N'Bún/Phở', N'mi_quang.jpg'),
(11, N'Cơm Chiên Dương Châu', N'Cơm chiên Dương Châu với tôm và xúc xích', 55000, N'Món Chính', N'com_chien_duong_chau.jpg'),
(12, N'Bánh Canh Cua', N'Bánh canh cua với thịt cua tươi ngon', 60000, N'Bún/Phở', N'banh_canh_cua.jpg'),
(13, N'Bò Kho', N'Bò kho với nước dùng đậm đà', 70000, N'Món Chính', N'bo_kho.jpg'),
(14, N'Cháo Gà', N'Cháo gà với hành lá và tiêu', 40000, N'Món Ăn Nhanh', N'chao_ga.jpg'),
(15, N'Bún Bò Huế', N'Bún bò Huế với nước dùng đậm đà', 55000, N'Bún/Phở', N'bun_bo_hue.jpg'),
(16, N'Bánh Mì Chả Cá', N'Bánh mì chả cá giòn tan', 30000, N'Món Ăn Nhanh', N'banh_mi_cha_ca.jpg'),
(17, N'Lẩu Gà Lá É', N'Lẩu gà lá é đặc trưng của Phú Yên', 250000, N'Món Chính', N'lau_ga_la_e.jpg'),
(18, N'Gà Nướng Muối Ớt', N'Gà nướng muối ớt cay nồng', 150000, N'Món Chính', N'ga_nuong_muoi_ot.jpg'),
(19, N'Bánh Bèo', N'Bánh bèo Huế với tôm cháy và hành phi', 25000, N'Món Khai Vị', N'banh_beo.jpg'),
(20, N'Chả Giò', N'Chả giò chiên giòn', 40000, N'Món Khai Vị', N'cha_gio.jpg'),
(21, N'Bánh Mì Xíu Mại', N'Bánh mì xíu mại Đà Lạt', 35000, N'Món Ăn Nhanh', N'banh_mi_xiu_mai.jpg'),
(22, N'Lẩu Riêu Cua', N'Lẩu riêu cua đậm đà', 220000, N'Món Chính', N'lau_rieu_cua.jpg'),
(23, N'Bún Chả', N'Bún chả Hà Nội với thịt nướng và chả giò', 50000, N'Bún/Phở', N'bun_cha.jpg'),
(24, N'Mì Vịt Tiềm', N'Mì vịt tiềm thơm ngon', 65000, N'Bún/Phở', N'mi_vit_tiem.jpg'),
(25, N'Gỏi Gà Bắp Cải', N'Gỏi gà bắp cải với rau răm', 55000, N'Món Khai Vị', N'goi_ga_bap_cai.jpg'),
(26, N'Bánh Mì Pate', N'Bánh mì pate nóng hổi', 30000, N'Món Ăn Nhanh', N'banh_mi_pate.jpg'),
(27, N'Cháo Lòng', N'Cháo lòng với huyết và hành phi', 45000, N'Món Chính', N'chao_long.jpg'),
(28, N'Bún Riêu', N'Bún riêu cua đồng đậm đà', 50000, N'Bún/Phở', N'bun_rieu.jpg'),
(29, N'Bò Né', N'Bò né với trứng và pate', 65000, N'Món Chính', N'bo_ne.jpg'),
(30, N'Bún Mắm', N'Bún mắm miền Tây', 60000, N'Bún/Phở', N'bun_mam.jpg');

SET IDENTITY_INSERT [menuItems] OFF;
END

