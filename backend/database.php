<?php
$servername = "db";
$username = "admin";
$password = "password";
$dbname = "eventeny";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>