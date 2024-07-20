<?php
echo "<p>The backend of Eventeny project</p>";
echo "<p>APIs:</p>";
echo "<p>POST /api/applicants/create.php</p>";
echo "<p>This api is for applying an application from applicant. body: name, email, applicationTypeId</p>";
echo "<p>GET /api/applicants/list.php</p>";
echo "<p>This api is for listing all applicants for a specific application type. query params: applicationTypeId</p>";
echo "<p>POST /api/applicants/update-status.php</p>";
echo "<p>This api is for updating the status of an applicant. body: applicantId, status</p>";
echo "<p>POST /api/applicationTypes/create.php</p>";
echo "<p>This api is for create a new application type. body: title, description</p>";
echo "<p>GET /api/applicationTypes/list.php</p>";
echo "<p>This api is for listing all the application types.</p>";
?>