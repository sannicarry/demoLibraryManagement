-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2023 at 03:01 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libary-managerment`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(50) NOT NULL,
  `genre_id` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `publication` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0
) ;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `genre_id`, `author`, `publication`, `quantity`) VALUES
(4, ' Nhập môn lập trình ngôn ngữ C', 'CNTT', 'Nguyễn Thanh Thủy', 'Nxb. Khoa học và Kỹ thuật', 12),
(5, 'Cấu trúc dữ liệu và giải thuật', 'CNTT', 'Đỗ Xuân Lôi', 'Nxb. Đại học Quốc gia', 0),
(8, 'Lập trình hướng đối tượng', 'CNTT', 'Trương Công Tuấn', 'Nxb. Đại học Huế, 2019', 2);

-- --------------------------------------------------------

--
-- Table structure for table `borrows`
--

CREATE TABLE `borrows` (
  `borrow_id` int(11) NOT NULL,
  `card_id` varchar(10) NOT NULL,
  `librarian_id` varchar(10) NOT NULL,
  `take_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `borrow_book`
--

CREATE TABLE `borrow_book` (
  `borrow_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genre_id` varchar(10) NOT NULL,
  `genre_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
('CNTT', 'Công Nghệ Thông Tin'),
('DLDC', 'Địa Lý - Địa Chất'),
('KT', 'Kiến Trúc'),
('LLCT', 'Lý Luận Chính Trị'),
('LS', 'Lịch Sử'),
('MT', 'Môi Trường'),
('NV', 'Ngữ Văn'),
('TOAN', 'Toán Học'),
('VL', 'Vật Lý');

-- --------------------------------------------------------

--
-- Table structure for table `libary_card`
--

CREATE TABLE `libary_card` (
  `card_id` varchar(10) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `librarian`
--

CREATE TABLE `librarian` (
  `librarian_id` varchar(10) NOT NULL,
  `librarian_name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `librarian`
--

INSERT INTO `librarian` (`librarian_id`, `librarian_name`, `address`, `phone_number`, `username`, `password`) VALUES
('THUTHU1', 'Ngô Tiến Phong', '44 Nguyễn Huệ', '0123456789', 'phong5141', '123456'),
('THUTHU2', 'Ngô Bảo Mật', '4/34 đường Bảo Mật', '0123456789', 'baomat', '123123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `fk_genre_book` (`genre_id`);

--
-- Indexes for table `borrows`
--
ALTER TABLE `borrows`
  ADD PRIMARY KEY (`borrow_id`),
  ADD KEY `fk_libaryCard_borrows` (`card_id`),
  ADD KEY `fk_libarian` (`librarian_id`);

--
-- Indexes for table `borrow_book`
--
ALTER TABLE `borrow_book`
  ADD KEY `fk_borrow_book` (`borrow_id`),
  ADD KEY `fk_book_borrow` (`book_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `libary_card`
--
ALTER TABLE `libary_card`
  ADD PRIMARY KEY (`card_id`);

--
-- Indexes for table `librarian`
--
ALTER TABLE `librarian`
  ADD PRIMARY KEY (`librarian_id`),
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `borrows`
--
ALTER TABLE `borrows`
  MODIFY `borrow_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_genre_book` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `borrows`
--
ALTER TABLE `borrows`
  ADD CONSTRAINT `fk_libarian` FOREIGN KEY (`librarian_id`) REFERENCES `librarian` (`librarian_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_libaryCard_borrows` FOREIGN KEY (`card_id`) REFERENCES `libary_card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `borrow_book`
--
ALTER TABLE `borrow_book`
  ADD CONSTRAINT `fk_book_borrow` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_borrow_book` FOREIGN KEY (`borrow_id`) REFERENCES `borrows` (`borrow_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
