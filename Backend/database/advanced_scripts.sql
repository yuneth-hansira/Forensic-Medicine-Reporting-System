-- ============================================================
-- Forensic Medicine Database - SQL Scripts
-- DML | Queries | Views | Triggers | Stored Procedures
-- ============================================================

-- ============================================================
-- SECTION 1: DML (SAMPLE DATA)
-- Two worked examples: a clinical (living examinee) case and
-- an autopsy (deceased) case, threaded through the full schema.
-- ============================================================

INSERT INTO User (Username, Password_Hash, Role, Access_Level)
VALUES
('dr.perera', 'hash_1', 'Doctor', 'Full'),
('dr.silva',  'hash_2', 'Doctor', 'Full'),
('clerk.nadeesha', 'hash_3', 'Clerk', 'Limited');

INSERT INTO Doctor (User_ID, Name, Designation, SLMC_Reg_No, Contact_No)
VALUES
(1, 'Dr. K. Perera', 'JMO', 'SLMC-10234', '0711234567'),
(2, 'Dr. S. Silva',  'Consultant Forensic Pathologist', 'SLMC-10877', '0777654321');

INSERT INTO `Case` (Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered)
VALUES
('Clinical', 'MLEF/2026/0142', 'Open', '2026-06-01'),
('Autopsy',  'PM/2026/0087',   'Closed', '2026-05-15');

-- Case 1: clinical (assault) examinee
INSERT INTO Police_Info (Case_ID, Police_Station, Investigating_Officer, Officer_Reg_No, Officer_Rank)
VALUES (1, 'Peradeniya Police Station', 'W. Bandara', 'PC-4521', 'Constable');

INSERT INTO Examinee (Case_ID, Full_Name, Sex, Age, NIC_Passport, Address)
VALUES (1, 'A. Fernando', 'Male', 29, '199712345678', 'Kandy Road, Peradeniya');

INSERT INTO Consent (Examinee_ID, Consent_Type, Consent_Date, Signature)
VALUES (1, 'Medico-legal Examination', '2026-06-01', 'signed');

INSERT INTO Clinical_Findings (Case_ID, Nature_Of_Bodily_Harm, Internal_Injuries, Category_Of_Hurt, Alcohol_Drug_Test, Sexual_Assault_Findings, Remarks)
VALUES (1, 'Blunt trauma to forearm', 'None detected', 'Grievous', 'Negative', 'N/A', 'Patient stable, referred for X-ray');

INSERT INTO Injury (Case_ID, Description, Size, Shape, Causative_Weapon)
VALUES (1, 'Contusion on left forearm', '4cm x 2cm', 'Oval', 'Blunt object');

INSERT INTO Report (Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature)
VALUES (1, 1, 'MLEF', '2026-06-02', '2026-06-03', 'signed');

-- Case 2: autopsy (deceased)
INSERT INTO Hospital (Hospital_Name, Address, Contact_No)
VALUES ('Peradeniya Teaching Hospital', 'Peradeniya', '0812388000');

INSERT INTO Ward (Hospital_ID, Ward_No, Ward_Name)
VALUES (1, 'W12', 'Surgical Ward');

INSERT INTO Deceased (Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death, Place_Of_Death, Death_Type)
VALUES (2, 1, 1, 'N. Jayasuriya', 'Male', 54, 'BHT-99231', '2026-05-14', 'Peradeniya Teaching Hospital', 'Sudden');

INSERT INTO Next_of_Kin (Deceased_ID, Full_Name, Relationship, Contact_No, Address)
VALUES (1, 'M. Jayasuriya', 'Spouse', '0754551122', 'Gampola');

INSERT INTO Body_Identification (Deceased_ID, Method, Identified_By, Identification_Date, Relationship_To_Deceased)
VALUES (1, 'Visual identification', 'M. Jayasuriya', '2026-05-15', 'Spouse');

INSERT INTO Police_Info (Case_ID, Police_Station, Investigating_Officer, Officer_Reg_No, Officer_Rank)
VALUES (2, 'Gampola Police Station', 'R. Kumara', 'PC-3390', 'Sergeant');

INSERT INTO Postmortem_Findings (Case_ID, PMR_Text, Immediate_Cause_Of_Death, Antecedent_Cause, Contributory_Cause, Interval_Onset_Death, Maternal_Death, Comments_Opinions)
VALUES (2, 'Full autopsy performed...', 'Acute myocardial infarction', 'Ischaemic heart disease', 'None', 'Sudden', FALSE, 'Death consistent with natural cardiac cause');

INSERT INTO Specimen (PM_Finding_ID, Specimen_Type, Collection_Date, Storage_Location, Chain_Of_Custody_No)
VALUES (1, 'Blood', '2026-05-15', 'Forensic Lab Fridge A', 'COC-2026-0087-01');

INSERT INTO Toxicology_Report (Specimen_ID, Substance_Tested, Result, Analyst_Name, Test_Date)
VALUES (1, 'Alcohol', 'Not detected', 'S. Rathnayake', '2026-05-17');

INSERT INTO Report (Case_ID, Doctor_ID, Report_Type, Report_Date, Date_Of_Dispatch, Signature)
VALUES (2, 2, 'Postmortem Report', '2026-05-20', '2026-05-21', 'signed');

INSERT INTO Certificate_Of_Receipt (Report_ID, Case_ID, Doctor_ID, Court_Reference, Findings, Injury_Description, Conclusion, Report_Date)
VALUES (2, 2, 2, 'CR/2026/077', 'Autopsy completed', 'N/A', 'Natural death - ischaemic heart disease', '2026-05-21');


-- ============================================================
-- SECTION 2: QUERIES
-- ============================================================

-- 2.1 List all open cases with the handling doctor's name
SELECT c.Case_ID, c.Case_Type, c.Case_Status, d.Name AS Doctor_Name
FROM `Case` c
JOIN Report r ON r.Case_ID = c.Case_ID
JOIN Doctor d ON d.Doctor_ID = r.Doctor_ID
WHERE c.Case_Status = 'Open';

-- 2.2 Full postmortem picture for one case: findings + specimens + toxicology
SELECT
    pf.Case_ID,
    pf.Immediate_Cause_Of_Death,
    s.Specimen_Type,
    t.Substance_Tested,
    t.Result
FROM Postmortem_Findings pf
JOIN Specimen s ON s.PM_Finding_ID = pf.PM_Finding_ID
LEFT JOIN Toxicology_Report t ON t.Specimen_ID = s.Specimen_ID
WHERE pf.Case_ID = 2;

-- 2.3 Case counts grouped by type and status
SELECT Case_Type, Case_Status, COUNT(*) AS Total
FROM `Case`
GROUP BY Case_Type, Case_Status;

-- 2.4 Injuries larger than a given threshold (basic numeric extraction from Size text is avoided;
-- this example filters by causative weapon instead, a more realistic forensic filter)
SELECT i.Injury_ID, i.Description, i.Size, i.Causative_Weapon, c.Case_ID
FROM Injury i
JOIN `Case` c ON c.Case_ID = i.Case_ID
WHERE i.Causative_Weapon = 'Blunt object';

-- 2.5 Doctors ranked by number of reports authored
SELECT d.Doctor_ID, d.Name, COUNT(r.Report_ID) AS Report_Count
FROM Doctor d
LEFT JOIN Report r ON r.Doctor_ID = d.Doctor_ID
GROUP BY d.Doctor_ID, d.Name
HAVING COUNT(r.Report_ID) > 0
ORDER BY Report_Count DESC;

-- 2.6 Deceased persons with cause of death and admitting hospital
SELECT de.Full_Name, de.Date_Of_Death, h.Hospital_Name, pf.Immediate_Cause_Of_Death
FROM Deceased de
JOIN Hospital h ON h.Hospital_ID = de.Hospital_ID
JOIN Postmortem_Findings pf ON pf.Case_ID = de.Case_ID;

-- 2.7 Cases that have a Report but no Certificate_Of_Receipt yet (pending acknowledgment)
SELECT c.Case_ID, c.Case_Type, r.Report_ID, r.Report_Date
FROM `Case` c
JOIN Report r ON r.Case_ID = c.Case_ID
LEFT JOIN Certificate_Of_Receipt cor ON cor.Report_ID = r.Report_ID
WHERE cor.Receipt_ID IS NULL;

-- 2.8 Hospital admitting the most deceased cases
SELECT h.Hospital_Name, COUNT(de.Deceased_ID) AS Deceased_Count
FROM Hospital h
JOIN Deceased de ON de.Hospital_ID = h.Hospital_ID
GROUP BY h.Hospital_Name
ORDER BY Deceased_Count DESC
LIMIT 1;

-- 2.9 Next of kin contact list for a specific deceased case (subquery form)
SELECT Full_Name, Relationship, Contact_No
FROM Next_of_Kin
WHERE Deceased_ID = (
    SELECT Deceased_ID FROM Deceased WHERE Case_ID = 2
);


-- ============================================================
-- SECTION 3: VIEWS
-- ============================================================

-- 3.1 One-row summary per case: type, status, assigned doctor, police station
CREATE OR REPLACE VIEW vw_case_overview AS
SELECT
    c.Case_ID,
    c.Case_Type,
    c.Case_Status,
    c.Date_Registered,
    p.Police_Station,
    d.Name AS Doctor_Name
FROM `Case` c
LEFT JOIN Police_Info p ON p.Case_ID = c.Case_ID
LEFT JOIN Report r ON r.Case_ID = c.Case_ID
LEFT JOIN Doctor d ON d.Doctor_ID = r.Doctor_ID;

-- 3.2 Toxicology results joined back to their originating case
CREATE OR REPLACE VIEW vw_toxicology_summary AS
SELECT
    pf.Case_ID,
    s.Specimen_Type,
    t.Substance_Tested,
    t.Result,
    t.Test_Date
FROM Toxicology_Report t
JOIN Specimen s ON s.Specimen_ID = t.Specimen_ID
JOIN Postmortem_Findings pf ON pf.PM_Finding_ID = s.PM_Finding_ID;

-- 3.3 Reports still awaiting a certificate of receipt (built on Query 2.7)
CREATE OR REPLACE VIEW vw_pending_certificates AS
SELECT c.Case_ID, r.Report_ID, r.Report_Date, r.Doctor_ID
FROM `Case` c
JOIN Report r ON r.Case_ID = c.Case_ID
LEFT JOIN Certificate_Of_Receipt cor ON cor.Report_ID = r.Report_ID
WHERE cor.Receipt_ID IS NULL;


-- ============================================================
-- SECTION 4: TRIGGERS
-- ============================================================

DELIMITER $$

-- 4.1 Log every new case into Audit_Log automatically
CREATE TRIGGER trg_case_after_insert
AFTER INSERT ON `Case`
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (User_ID, Action, Table_Affected, Timestamp)
    VALUES (NULL, CONCAT('New case registered: Case_ID=', NEW.Case_ID), 'Case', NOW());
END$$

-- 4.2 Log every case status change
CREATE TRIGGER trg_case_after_update
AFTER UPDATE ON `Case`
FOR EACH ROW
BEGIN
    IF OLD.Case_Status <> NEW.Case_Status THEN
        INSERT INTO Audit_Log (User_ID, Action, Table_Affected, Timestamp)
        VALUES (
            NULL,
            CONCAT('Case_ID=', NEW.Case_ID, ' status changed from ', OLD.Case_Status, ' to ', NEW.Case_Status),
            'Case',
            NOW()
        );
    END IF;
END$$

-- 4.3 Guard: a Certificate_Of_Receipt cannot reference a Report from a different Case
CREATE TRIGGER trg_certificate_case_match
BEFORE INSERT ON Certificate_Of_Receipt
FOR EACH ROW
BEGIN
    DECLARE report_case_id INT;
    SELECT Case_ID INTO report_case_id FROM Report WHERE Report_ID = NEW.Report_ID;
    IF report_case_id IS NULL OR report_case_id <> NEW.Case_ID THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Certificate Case_ID must match the Case_ID on the referenced Report';
    END IF;
END$$

DELIMITER ;


-- ============================================================
-- SECTION 5: STORED PROCEDURES
-- ============================================================

DELIMITER $$

-- 5.1 Register a new clinical case together with its examinee in a single transaction
CREATE PROCEDURE sp_register_clinical_case (
    IN p_case_type VARCHAR(50),
    IN p_mlef_no VARCHAR(50),
    IN p_full_name VARCHAR(100),
    IN p_sex VARCHAR(10),
    IN p_age INT,
    IN p_nic VARCHAR(20),
    IN p_address VARCHAR(255)
)
BEGIN
    DECLARE new_case_id INT;

    START TRANSACTION;

    INSERT INTO `Case` (Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered)
    VALUES (p_case_type, p_mlef_no, 'Open', CURDATE());

    SET new_case_id = LAST_INSERT_ID();

    INSERT INTO Examinee (Case_ID, Full_Name, Sex, Age, NIC_Passport, Address)
    VALUES (new_case_id, p_full_name, p_sex, p_age, p_nic, p_address);

    COMMIT;

    SELECT new_case_id AS Case_ID;
END$$

-- 5.2 Return the full detail set for a given case (examinee OR deceased branch, plus reports)
CREATE PROCEDURE sp_get_case_details (IN p_case_id INT)
BEGIN
    SELECT * FROM `Case` WHERE Case_ID = p_case_id;
    SELECT * FROM Examinee WHERE Case_ID = p_case_id;
    SELECT * FROM Deceased WHERE Case_ID = p_case_id;
    SELECT * FROM Injury WHERE Case_ID = p_case_id;
    SELECT * FROM Report WHERE Case_ID = p_case_id;
END$$

-- 5.3 Close a case: update status and stamp an audit entry with a reason
CREATE PROCEDURE sp_close_case (
    IN p_case_id INT,
    IN p_user_id INT,
    IN p_reason VARCHAR(255)
)
BEGIN
    UPDATE `Case` SET Case_Status = 'Closed' WHERE Case_ID = p_case_id;

    INSERT INTO Audit_Log (User_ID, Action, Table_Affected, Timestamp)
    VALUES (p_user_id, CONCAT('Case_ID=', p_case_id, ' closed. Reason: ', p_reason), 'Case', NOW());
END$$

DELIMITER ;

-- ============================================================
-- SECTION 6: PATIENT QUERIES
-- ============================================================

-- 6.1 All case history for a single patient (works across Examinee and Deceased)
SELECT p.Patient_ID, p.Full_Name, e.Case_ID AS Examinee_Case, de.Case_ID AS Deceased_Case
FROM Patient p
LEFT JOIN Examinee e ON e.Patient_ID = p.Patient_ID
LEFT JOIN Deceased de ON de.Patient_ID = p.Patient_ID
WHERE p.Patient_ID = 1;

-- 6.2 Patients who were examined as a living examinee more than once (repeat cases)
SELECT p.Patient_ID, p.Full_Name, COUNT(e.Examinee_ID) AS Examination_Count
FROM Patient p
JOIN Examinee e ON e.Patient_ID = p.Patient_ID
GROUP BY p.Patient_ID, p.Full_Name
HAVING COUNT(e.Examinee_ID) > 1;

-- 6.3 Patients who were first examined while alive, and later became a Deceased record
SELECT p.Patient_ID, p.Full_Name, e.Case_ID AS Clinical_Case_ID, de.Case_ID AS Autopsy_Case_ID
FROM Patient p
JOIN Examinee e ON e.Patient_ID = p.Patient_ID
JOIN Deceased de ON de.Patient_ID = p.Patient_ID;

-- 6.4 Number of patients currently registered per hospital
SELECT h.Hospital_Name, COUNT(p.Patient_ID) AS Patient_Count
FROM Hospital h
LEFT JOIN Patient p ON p.Hospital_ID = h.Hospital_ID
GROUP BY h.Hospital_Name;

-- 6.5 Full patient profile with linked case type (clinical vs autopsy), using a single case
SELECT
    p.Full_Name,
    p.NIC_Passport,
    p.Blood_Group,
    COALESCE(ec.Case_Type, dc.Case_Type) AS Case_Type,
    COALESCE(ec.Case_ID, dc.Case_ID) AS Case_ID
FROM Patient p
LEFT JOIN Examinee e ON e.Patient_ID = p.Patient_ID
LEFT JOIN `Case` ec ON ec.Case_ID = e.Case_ID
LEFT JOIN Deceased de ON de.Patient_ID = p.Patient_ID
LEFT JOIN `Case` dc ON dc.Case_ID = de.Case_ID
WHERE p.Patient_ID = 1;
