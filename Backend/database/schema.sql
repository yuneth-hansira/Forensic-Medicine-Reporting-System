-- ============================================================
-- Forensic Medicine Database - MySQL Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS forensic_medicine_db;
USE forensic_medicine_db;

-- ============================================================
-- GROUP 1: ACCESS & CASE CORE
-- ============================================================

CREATE TABLE IF NOT EXISTS User (
    User_ID        INT AUTO_INCREMENT PRIMARY KEY,
    Username       VARCHAR(50) NOT NULL UNIQUE,
    Password_Hash  VARCHAR(255) NOT NULL,
    Role           VARCHAR(30),
    Access_Level   VARCHAR(30)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Doctor (
    Doctor_ID      INT AUTO_INCREMENT PRIMARY KEY,
    User_ID        INT,
    Name           VARCHAR(100) NOT NULL,
    Designation    VARCHAR(100),
    SLMC_Reg_No    VARCHAR(30) UNIQUE,
    Contact_No     VARCHAR(20),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Case` (
    Case_ID            INT AUTO_INCREMENT PRIMARY KEY,
    Case_Type          VARCHAR(50),
    MLEF_No_or_PM_No   VARCHAR(50),
    Case_Status        VARCHAR(30),
    Date_Registered    DATE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Police_Info (
    Police_ID              INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID                INT NOT NULL,
    Police_Station         VARCHAR(100),
    Investigating_Officer  VARCHAR(100),
    Officer_Reg_No         VARCHAR(30),
    Officer_Rank           VARCHAR(50),
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Court_info (
    Court_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID           INT NOT NULL,
    Court_Name        VARCHAR(100),
    Magistrate_Name   VARCHAR(100),
    Case_Number       VARCHAR(50),
    Date_Of_Trial     DATE,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- GROUP 2: LIVING EXAMINEE SIDE
-- ============================================================

CREATE TABLE IF NOT EXISTS Examinee (
    Examinee_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID        INT NOT NULL,
    Full_Name      VARCHAR(100) NOT NULL,
    Sex            ENUM('Male','Female','Other'),
    Age            INT,
    NIC_Passport   VARCHAR(20),
    Address        VARCHAR(255),
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Consent (
    Consent_ID     INT AUTO_INCREMENT PRIMARY KEY,
    Examinee_ID    INT NOT NULL,
    Consent_Type   VARCHAR(50),
    Consent_Date   DATE,
    Signature      VARCHAR(255),
    FOREIGN KEY (Examinee_ID) REFERENCES Examinee(Examinee_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Clinical_Findings (
    Finding_ID               INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID                  INT NOT NULL,
    Nature_Of_Bodily_Harm    VARCHAR(255),
    Internal_Injuries        TEXT,
    Category_Of_Hurt         VARCHAR(50),
    Alcohol_Drug_Test        VARCHAR(100),
    Sexual_Assault_Findings  TEXT,
    Remarks                  TEXT,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Injury (
    Injury_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID            INT NOT NULL,
    Description        TEXT,
    Size               VARCHAR(50),
    Shape              VARCHAR(50),
    Causative_Weapon   VARCHAR(100),
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Document (
    Document_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID        INT NOT NULL,
    Doc_Type       VARCHAR(50),
    File_Path      VARCHAR(255),
    Upload_Date    DATE,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- GROUP 3: DECEASED SIDE
-- ============================================================

CREATE TABLE IF NOT EXISTS Hospital (
    Hospital_ID      INT AUTO_INCREMENT PRIMARY KEY,
    Hospital_Name    VARCHAR(100) NOT NULL,
    Address          VARCHAR(255),
    Contact_No       VARCHAR(20)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Ward (
    Ward_ID        INT AUTO_INCREMENT PRIMARY KEY,
    Hospital_ID    INT NOT NULL,
    Ward_No        VARCHAR(20),
    Ward_Name      VARCHAR(100),
    FOREIGN KEY (Hospital_ID) REFERENCES Hospital(Hospital_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Deceased (
    Deceased_ID     INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID         INT NOT NULL,
    Hospital_ID     INT,
    Ward_ID         INT,
    Full_Name       VARCHAR(100),
    Sex             ENUM('Male','Female','Other'),
    Age             INT,
    BHT_No          VARCHAR(30),
    Date_Of_Death   DATE,
    Place_Of_Death  VARCHAR(100),
    Death_Type      VARCHAR(50),
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Hospital_ID) REFERENCES Hospital(Hospital_ID)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (Ward_ID) REFERENCES Ward(Ward_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Next_of_Kin (
    Kin_ID         INT AUTO_INCREMENT PRIMARY KEY,
    Deceased_ID    INT NOT NULL,
    Full_Name      VARCHAR(100),
    Relationship   VARCHAR(50),
    Contact_No     VARCHAR(20),
    Address        VARCHAR(255),
    FOREIGN KEY (Deceased_ID) REFERENCES Deceased(Deceased_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Body_Identification (
    Identification_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Deceased_ID                INT NOT NULL,
    Method                     VARCHAR(100),
    Identified_By              VARCHAR(100),
    Identification_Date        DATE,
    Relationship_To_Deceased   VARCHAR(50),
    FOREIGN KEY (Deceased_ID) REFERENCES Deceased(Deceased_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- GROUP 4: AUTOPSY & LAB
-- ============================================================

CREATE TABLE IF NOT EXISTS Postmortem_Findings (
    PM_Finding_ID               INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID                     INT NOT NULL,
    PMR_Text                    TEXT,
    Immediate_Cause_Of_Death    VARCHAR(255),
    Antecedent_Cause            VARCHAR(255),
    Contributory_Cause          VARCHAR(255),
    Interval_Onset_Death        VARCHAR(100),
    Maternal_Death              BOOLEAN DEFAULT FALSE,
    Comments_Opinions           TEXT,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Specimen (
    Specimen_ID            INT AUTO_INCREMENT PRIMARY KEY,
    PM_Finding_ID          INT NOT NULL,
    Specimen_Type          VARCHAR(100),
    Collection_Date        DATE,
    Storage_Location       VARCHAR(100),
    Chain_Of_Custody_No    VARCHAR(50),
    FOREIGN KEY (PM_Finding_ID) REFERENCES Postmortem_Findings(PM_Finding_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Toxicology_Report (
    Toxicology_ID      INT AUTO_INCREMENT PRIMARY KEY,
    Specimen_ID        INT NOT NULL,
    Substance_Tested   VARCHAR(100),
    Result             TEXT,
    Analyst_Name       VARCHAR(100),
    Test_Date          DATE,
    FOREIGN KEY (Specimen_ID) REFERENCES Specimen(Specimen_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Histopathology_Report (
    Histo_ID         INT AUTO_INCREMENT PRIMARY KEY,
    Specimen_ID      INT NOT NULL,
    Pathologist_ID   INT,
    Tissue_Type      VARCHAR(100),
    Findings         TEXT,
    Report_Date      DATE,
    FOREIGN KEY (Specimen_ID) REFERENCES Specimen(Specimen_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Pathologist_ID) REFERENCES Doctor(Doctor_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Exhibit (
    Exhibit_ID         INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID            INT NOT NULL,
    Police_ID          INT,
    Exhibit_Type       VARCHAR(100),
    Description        TEXT,
    Storage_Location   VARCHAR(100),
    Handover_Date      DATE,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Police_ID) REFERENCES Police_Info(Police_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- GROUP 5: WORKFLOW & REPORTING
-- ============================================================

CREATE TABLE IF NOT EXISTS Investigation (
    Investigation_ID       INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID                INT NOT NULL,
    Type                   VARCHAR(100),
    Institution_Referred   VARCHAR(100),
    Result                 TEXT,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Referral (
    Referral_ID       INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID           INT NOT NULL,
    Referral_Date     DATE,
    Referral_To       VARCHAR(100),
    Referral_Report   TEXT,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Report (
    Report_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Case_ID            INT NOT NULL,
    Doctor_ID          INT,
    Report_Type        VARCHAR(50),
    Report_Date        DATE,
    Date_Of_Dispatch   DATE,
    Signature          VARCHAR(255),
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Doctor_ID) REFERENCES Doctor(Doctor_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Certificate_Of_Receipt (
    Receipt_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Report_ID           INT NOT NULL UNIQUE,
    Case_ID              INT NOT NULL,
    Doctor_ID            INT,
    Court_Reference       VARCHAR(50),
    Findings              TEXT,
    Injury_Description    TEXT,
    Conclusion            TEXT,
    Report_Date           DATE,
    FOREIGN KEY (Report_ID) REFERENCES Report(Report_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Case_ID) REFERENCES `Case`(Case_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Doctor_ID) REFERENCES Doctor(Doctor_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Audit_Log (
    Log_ID           INT AUTO_INCREMENT PRIMARY KEY,
    User_ID          INT,
    Action           VARCHAR(100),
    Table_Affected   VARCHAR(50),
    Timestamp        DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- GROUP 5: PATIENT CORE (NEW)
-- ============================================================

CREATE TABLE IF NOT EXISTS Patient (
    Patient_ID      INT AUTO_INCREMENT PRIMARY KEY,
    Full_Name       VARCHAR(100) NOT NULL,
    Sex             ENUM('Male','Female','Other'),
    Date_Of_Birth   DATE,
    NIC_Passport    VARCHAR(20) UNIQUE,
    Blood_Group     VARCHAR(5),
    Contact_No      VARCHAR(20),
    Address         VARCHAR(255),
    Hospital_ID     INT,
    Ward_ID         INT,
    FOREIGN KEY (Hospital_ID) REFERENCES Hospital(Hospital_ID)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (Ward_ID) REFERENCES Ward(Ward_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

ALTER TABLE Examinee
    ADD COLUMN Patient_ID INT AFTER Case_ID,
    ADD FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID)
        ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE Deceased
    ADD COLUMN Patient_ID INT AFTER Case_ID,
    ADD FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID)
        ON UPDATE CASCADE ON DELETE SET NULL,
    ADD UNIQUE KEY uq_deceased_patient (Patient_ID);
