<?php
require '../../database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $applicant_id = $_POST['applicant_id'];
    $status = $_POST['status'];

    $stmt = $conn->prepare("UPDATE Applicants SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $applicant_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "200"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
