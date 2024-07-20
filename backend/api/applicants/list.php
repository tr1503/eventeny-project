<?php
require '../../database.php';

$application_type_id = isset($_GET['application_type_id']) ? (int)$_GET['application_type_id'] : 0;

$stmt = $conn->prepare("SELECT Applicants.id, Applicants.name, Applicants.email, Applicants.status, Applicants.submitted_at, ApplicationTypes.title
FROM Applicants
JOIN ApplicationTypes ON Applicants.application_type_id = ApplicationTypes.id
WHERE Applicants.application_type_id = ?");
$stmt->bind_param("i", $application_type_id);

$stmt->execute();
$result = $stmt->get_result();

$submissions = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $submissions[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($submissions);

$stmt->close();
$conn->close();
?>
