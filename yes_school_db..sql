-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2024 at 02:22 AM
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
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `expensehead` varchar(50) DEFAULT NULL,
  `invoice` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `amount` varchar(50) DEFAULT '0.00',
  `documentlink` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `createdat` varchar(50) DEFAULT NULL,
  `filename` varchar(50) DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expensehead`
--

CREATE TABLE `expensehead` (
  `expensehead` varchar(50) DEFAULT NULL,
  `createdat` varchar(50) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `notes` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `guardianId` int(11) NOT NULL,
  `userId` varchar(20) DEFAULT NULL,
  `student_Id` varchar(20) DEFAULT NULL,
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
  `availableqty` varchar(20) DEFAULT '0',
  `quantity` int(11) DEFAULT 0,
  `cartegory` varchar(50) DEFAULT NULL,
  `supplier` varchar(30) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `isactive` varchar(10) DEFAULT 'true',
  `note` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `name` varchar(60) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `contact1` varchar(50) DEFAULT NULL,
  `contact2` varchar(50) DEFAULT NULL,
  `logolink` varchar(100) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL
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
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `sessionname` varchar(50) DEFAULT NULL,
  `startmonth` varchar(10) DEFAULT NULL,
  `createdat` varchar(50) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `active` varchar(50) DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `userId` varchar(20) DEFAULT NULL,
  `sEmail` varchar(50) DEFAULT NULL,
  `sGender` varchar(50) DEFAULT NULL,
  `sLastName` varchar(50) DEFAULT NULL,
  `sFirstName` varchar(50) DEFAULT NULL,
  `contact1` varchar(50) DEFAULT NULL,
  `contact2` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `staffId` varchar(50) DEFAULT NULL,
  `definedRole` varchar(50) DEFAULT NULL,
  `rolecode` varchar(20) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `active` varchar(20) DEFAULT 'True'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`userId`, `sEmail`, `sGender`, `sLastName`, `sFirstName`, `contact1`, `contact2`, `address`, `staffId`, `definedRole`, `rolecode`, `info`, `id`, `active`) VALUES
('zhhmp6', 'user@user.com', 'Male', 'User', 'User', '34354645', '43543', 'Accra', NULL, 'Admin', NULL, 'dfg', 1, 'True');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `userId` varchar(20) DEFAULT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `otherName` varchar(50) DEFAULT NULL,
  `class` varchar(20) DEFAULT NULL,
  `previousclass` varchar(50) DEFAULT NULL,
  `section` varchar(20) DEFAULT NULL,
  `religion` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dateofbirth` varchar(50) DEFAULT NULL,
  `accountBalance` decimal(10,0) DEFAULT 0,
  `status` varchar(20) DEFAULT 'current',
  `isActive` varchar(20) DEFAULT 'true',
  `filename` varchar(100) DEFAULT NULL,
  `imagelink` varchar(255) DEFAULT NULL
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
  `userId` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `rolecode` varchar(10) DEFAULT '0',
  `Id` int(11) NOT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `createdAt` varchar(50) DEFAULT NULL,
  `createdBy` varchar(20) DEFAULT NULL,
  `isActive` varchar(10) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `role`, `password`, `rolecode`, `Id`, `pincode`, `createdAt`, `createdBy`, `isActive`) VALUES
('zhhmp6', 'user@user.com', 'staff', '$2b$10$C/hL3UHigM38cpVJ4m4vlOYZ1v/OKriPrdz1O8ehQZNnlHbbcfNr.', '111111', 1, '6501', 'Sun, 04 Aug 2024 00:22:22 GMT', 'undefined', 'true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expensehead`
--
ALTER TABLE `expensehead`
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
-- Indexes for table `school`
--
ALTER TABLE `school`
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
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
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
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expensehead`
--
ALTER TABLE `expensehead`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardian`
--
ALTER TABLE `guardian`
  MODIFY `guardianId` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sectiongroup`
--
ALTER TABLE `sectiongroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
