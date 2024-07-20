CREATE DATABASE IF NOT EXISTS eventeny;

USE eventeny;

-- Table to store application types
CREATE TABLE IF NOT EXISTS ApplicationTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table to store applicants
CREATE TABLE IF NOT EXISTS Applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    application_type_id INT,
    status ENUM('Approved', 'Waitlist') DEFAULT 'Waitlist',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_type_id) REFERENCES ApplicationTypes(id)
);
