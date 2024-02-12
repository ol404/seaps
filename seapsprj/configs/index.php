<?php
require 'dbconfig.php';

// SQL query for database
$sql = "SELECT lat, lng, created_date, emergency_type, specific_emergency FROM tbl_gps";

// Use PDO's query method
$stmt = $conn->query($sql);

if ($stmt->rowCount() > 0) {
    $markers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output markers as JSON
    header('Content-Type: application/json'); // Set content type to JSON
    echo json_encode($markers); // Output JSON-formatted array of markers
} else {
    echo json_encode(array('message' => 'No results found')); // Output empty array with message
}


