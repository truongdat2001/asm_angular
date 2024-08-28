-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 28, 2024 lúc 06:00 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asm_angular`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `du_an`
--

CREATE TABLE `du_an` (
  `id` int(10) NOT NULL,
  `ten_du_an` varchar(100) NOT NULL,
  `ngay_bat_dau` date NOT NULL,
  `tien` bigint(255) NOT NULL,
  `leader` int(10) NOT NULL,
  `thanh_vien` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `du_an`
--

INSERT INTO `du_an` (`id`, `ten_du_an`, `ngay_bat_dau`, `tien`, `leader`, `thanh_vien`) VALUES
(1, 'Dự án Xây dưng trang web bán hàng', '2022-05-04', 1320000000, 1, '1, 2'),
(2, 'Dự án Xây dựng trang trại', '2020-06-16', 4500000, 2, '1, 4'),
(3, 'Dự án Xây dựng đô thị', '2024-05-01', 2230000000, 1, '1, 4, 8'),
(33, 'Dự án đầu tư', '2024-06-07', 123000000, 2, '1,2,7,9'),
(34, 'Dự án đầu tư công', '2024-06-02', 5000000000, 2, '1'),
(35, 'Dự án đối tác công tư', '2024-05-29', 40400000000, 2, '1,2,3'),
(36, 'Dự án nghiên cứu và phát triển', '2024-05-29', 200000000000, 8, '7,10'),
(37, 'Dự án viện trợ,', '2024-06-20', 12340000000000, 1, '1,2,3,7'),
(38, 'Dự án bảo dưỡng thiết bị quy mô lớn ', '2024-06-08', 30000000000, 1, '1,2,3,7,8,9,10'),
(39, 'Dự án hợp đồng', '2024-06-07', 3000000000000, 1, '1'),
(40, '1213213', '2024-06-19', 3000000, 2, '1,2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhan_vien`
--

CREATE TABLE `nhan_vien` (
  `id` int(10) NOT NULL,
  `hovaten` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mat_khau` varchar(100) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `gioi_tinh` varchar(10) NOT NULL,
  `khu_vuc` varchar(10) NOT NULL,
  `chuc_vu` varchar(100) NOT NULL DEFAULT 'Nhân viên'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhan_vien`
--

INSERT INTO `nhan_vien` (`id`, `hovaten`, `email`, `mat_khau`, `ngay_sinh`, `gioi_tinh`, `khu_vuc`, `chuc_vu`) VALUES
(1, 'Trương Văn Tiến Đạt', 'datruong792001@gmail.com', '12345', '2001-09-07', 'Nam', 'Miền Trung', 'Leader'),
(2, 'Lê Thị Hồng Nhung', 'nhungkappi@gmail.com', '1234', '2001-01-08', 'Nữ', 'Miền Trung', 'Nhân viên'),
(8, 'Trương Văn Tiến Đạt', 'dattruong792001@gmail.com', '123', '2024-06-18', 'Nam', 'Miền Bắc', 'Nhân viên'),
(9, 'tiendat123', 'a@gmail.com', '1234', '2024-06-12', 'Nữ', 'Miền Nam', 'Nhân viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `task`
--

CREATE TABLE `task` (
  `id` int(10) NOT NULL,
  `ten_task` varchar(50) NOT NULL,
  `du_an_id` int(10) NOT NULL,
  `nhan_vien_id` int(10) NOT NULL,
  `mo_ta` varchar(200) DEFAULT NULL,
  `trang_thai` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `task`
--

INSERT INTO `task` (`id`, `ten_task`, `du_an_id`, `nhan_vien_id`, `mo_ta`, `trang_thai`) VALUES
(1, 'Phân tích yêu cầu', 1, 1, 'Phân tích yêu cầu của khách hàng để team thực hiện', 3),
(2, 'Thực hiện layout cho ', 1, 2, 'Thực hiện layout website, chú ý kỹ responsive', 3),
(3, 'Tìm hiểu yêu cầu của khách hàng', 2, 2, 'Đến công ty và ghi nhận các yêu cầu của khách hàng', 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `du_an`
--
ALTER TABLE `du_an`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_task - id_du_an` (`du_an_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `du_an`
--
ALTER TABLE `du_an`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `nhan_vien`
--
ALTER TABLE `nhan_vien`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `task`
--
ALTER TABLE `task`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `id_task - id_du_an` FOREIGN KEY (`du_an_id`) REFERENCES `du_an` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
