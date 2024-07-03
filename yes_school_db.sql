-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2024 at 05:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yes_school_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `classId` varchar(20) DEFAULT NULL,
  `title` varchar(55) DEFAULT NULL,
  `instructor` varchar(50) DEFAULT NULL,
  `isActive` varchar(10) DEFAULT NULL,
  `updatedAt` varchar(20) DEFAULT NULL,
  `updatedBy` varchar(50) DEFAULT NULL,
  `createdAt` varchar(100) DEFAULT NULL,
  `createdBy` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `guardianId` int(11) NOT NULL,
  `studentId` varchar(20) DEFAULT NULL,
  `gFirstName` varchar(30) DEFAULT NULL,
  `gLastName` varchar(30) DEFAULT NULL,
  `gOtherName` varchar(30) DEFAULT NULL,
  `gContact1` varchar(20) DEFAULT NULL,
  `gContact2` varchar(30) DEFAULT NULL,
  `gEmail` varchar(20) DEFAULT NULL,
  `gAddress` varchar(50) DEFAULT NULL,
  `gAddressLandmark` varchar(50) DEFAULT NULL,
  `gSex` varchar(10) DEFAULT NULL,
  `gRelation` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `itemId` varchar(100) DEFAULT NULL,
  `itemName` varchar(50) DEFAULT NULL,
  `cartegory` varchar(50) DEFAULT NULL,
  `quantity` int(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `CreatedBy` varchar(50) DEFAULT NULL,
  `supplier` varchar(50) DEFAULT NULL,
  `price` varchar(100) DEFAULT '0.00',
  `totalqty` varchar(1000) NOT NULL DEFAULT '0',
  `createdAt` varchar(50) DEFAULT NULL,
  `supplierContact1` varchar(50) DEFAULT NULL,
  `supplierContact2` varchar(50) DEFAULT NULL,
  `SupplierInfo` varchar(100) DEFAULT NULL,
  `isActive` varchar(10) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventorycartegory`
--

CREATE TABLE `inventorycartegory` (
  `id` int(11) NOT NULL,
  `cartegoryname` varchar(40) DEFAULT NULL,
  `createdby` varchar(40) DEFAULT NULL,
  `createdat` varchar(40) DEFAULT NULL,
  `isactive` varchar(10) DEFAULT NULL,
  `notes` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventorystock`
--

CREATE TABLE `inventorystock` (
  `id` int(11) NOT NULL,
  `item` varchar(50) DEFAULT NULL,
  `quantity` varchar(20) DEFAULT '0',
  `cartegory` varchar(50) DEFAULT NULL,
  `availableqty` varchar(20) DEFAULT '0',
  `supplier` varchar(30) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `isactive` varchar(10) DEFAULT 'true',
  `note` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `classId` varchar(15) DEFAULT NULL,
  `sectionName` varchar(15) DEFAULT NULL,
  `createdAt` varchar(20) DEFAULT NULL,
  `createdBy` varchar(50) DEFAULT NULL,
  `isActive` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sectiongroup`
--

CREATE TABLE `sectiongroup` (
  `id` int(11) NOT NULL,
  `sectionName` varchar(50) DEFAULT NULL,
  `isActive` varchar(50) DEFAULT NULL,
  `createdAt` varchar(50) DEFAULT NULL,
  `createdBy` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `otherName` varchar(50) DEFAULT NULL,
  `class` varchar(20) DEFAULT NULL,
  `section` varchar(20) DEFAULT NULL,
  `religion` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dateofbirth` varchar(50) DEFAULT NULL,
  `g1fname` varchar(50) DEFAULT NULL,
  `g1lastname` varchar(50) DEFAULT NULL,
  `g1sex` varchar(50) DEFAULT NULL,
  `g1address` varchar(110) DEFAULT NULL,
  `g1email` varchar(50) DEFAULT NULL,
  `g1contact1` varchar(50) DEFAULT NULL,
  `g1relation` varchar(50) DEFAULT NULL,
  `g1contact2` varchar(50) DEFAULT NULL,
  `g2fname` varchar(50) DEFAULT NULL,
  `g2lastname` varchar(50) DEFAULT NULL,
  `g2sex` varchar(50) DEFAULT NULL,
  `g2address` varchar(110) DEFAULT NULL,
  `g2email` varchar(50) DEFAULT NULL,
  `g2contact1` varchar(50) DEFAULT NULL,
  `g2relation` varchar(50) DEFAULT NULL,
  `g2contact2` varchar(50) DEFAULT NULL,
  `accountBalance` decimal(10,0) DEFAULT 0,
  `isActive` varchar(20) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `subjectcode` varchar(50) DEFAULT NULL,
  `subjectname` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `isactive` varchar(11) DEFAULT 'true',
  `createdat` varchar(50) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `parent` varchar(10) DEFAULT NULL,
  `student` varchar(10) DEFAULT NULL,
  `admin` varchar(10) DEFAULT NULL,
  `superAdmin` varchar(10) DEFAULT NULL,
  `feesManage` varchar(10) DEFAULT NULL,
  `expenseManage` varchar(10) DEFAULT NULL,
  `examManage` varchar(10) DEFAULT NULL,
  `teacher` varchar(10) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `createdAt` varchar(50) DEFAULT NULL,
  `createdBy` varchar(20) DEFAULT NULL,
  `isActive` varchar(10) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`guardianId`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventorycartegory`
--
ALTER TABLE `inventorycartegory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventorystock`
--
ALTER TABLE `inventorystock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sectiongroup`
--
ALTER TABLE `sectiongroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardian`
--
ALTER TABLE `guardian`
  MODIFY `guardianId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventorycartegory`
--
ALTER TABLE `inventorycartegory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventorystock`
--
ALTER TABLE `inventorystock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sectiongroup`
--
ALTER TABLE `sectiongroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
