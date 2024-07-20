<?php
require '../../database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $application_type_id = $_POST['application_type_id'];

    $stmt = $conn->prepare("INSERT INTO Applicants (name, email, application_type_id) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $name, $email, $application_type_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Application submitted successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
