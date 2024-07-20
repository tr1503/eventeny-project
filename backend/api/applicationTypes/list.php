<?php
require '../../database.php';

$sql = "SELECT * FROM ApplicationTypes";
$result = $conn->query($sql);

$applicationTypes = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $applicationTypes[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($applicationTypes);

$conn->close();
?>