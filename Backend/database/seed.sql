USE forensic_medicine_db;

-- Seed Users
-- Password for all is 'password' hashed using bcrypt ($2a$10$xyz...) - we will use a dummy hash or real hash.
-- Real hash for 'password' (bcrypt 10 rounds): $2a$10$s/zP9pI4O9Xg/9aYhV/zXOO92eI13.C34u1n.zO1y1431Y2x/v1hS
INSERT INTO User (Username, Password_Hash, Role, Access_Level) VALUES 
('admin', '$2a$10$s/zP9pI4O9Xg/9aYhV/zXOO92eI13.C34u1n.zO1y1431Y2x/v1hS', 'Admin', 'High'),
('doctor_smith', '$2a$10$s/zP9pI4O9Xg/9aYhV/zXOO92eI13.C34u1n.zO1y1431Y2x/v1hS', 'Doctor', 'High'),
('nurse_jane', '$2a$10$s/zP9pI4O9Xg/9aYhV/zXOO92eI13.C34u1n.zO1y1431Y2x/v1hS', 'Nurse', 'Medium');

-- Seed Doctors
INSERT INTO Doctor (User_ID, Name, Designation, SLMC_Reg_No, Contact_No) VALUES 
(2, 'Dr. John Smith', 'JMO', 'SLMC12345', '0771234567');

-- Seed Hospitals
INSERT INTO Hospital (Hospital_Name, Address, Contact_No) VALUES 
('General Hospital Colombo', 'Colombo 08', '0112691111');

-- Seed Wards
INSERT INTO Ward (Hospital_ID, Ward_No, Ward_Name) VALUES 
(1, 'Ward 45', 'Accident & Emergency');

-- Seed Case
INSERT INTO `Case` (Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered) VALUES 
('Assault', 'MLEF-2026-001', 'Open', '2026-07-21'),
('RTA', 'MLEF-2026-002', 'Open', '2026-07-21'),
('Sudden Death', 'PM-2026-001', 'Open', '2026-07-20');

-- Seed Examinee
INSERT INTO Examinee (Case_ID, Full_Name, Sex, Age, NIC_Passport, Address) VALUES 
(1, 'Kamal Perera', 'Male', 35, '912345678V', '123 Main St, Colombo'),
(2, 'Nimali Silva', 'Female', 28, '987654321V', '45 Kandy Rd, Kadawatha');

-- Seed Deceased
INSERT INTO Deceased (Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death, Place_Of_Death, Death_Type) VALUES 
(3, 1, 1, 'Sunil Shantha', 'Male', 55, 'BHT-1002', '2026-07-20', 'Ward 45', 'Natural');

-- Seed Patients
INSERT INTO Patient (Full_Name, Sex, Date_Of_Birth, NIC_Passport, Blood_Group, Contact_No, Address, Hospital_ID, Ward_ID)
VALUES
('A. Fernando',   'Male', '1997-03-12', '199712345678', 'O+', '0711112222', 'Kandy Road, Peradeniya', NULL, NULL),
('N. Jayasuriya',  'Male', '1972-01-05', '197200987654', 'B+', '0754443333', 'Gampola', 1, 1);

-- Link the two existing sample records to their Patient rows
UPDATE Examinee SET Patient_ID = 1 WHERE Examinee_ID = 1;
UPDATE Deceased SET Patient_ID = 2 WHERE Deceased_ID = 1;
