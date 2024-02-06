<?php
include 'pass.php';
//to connect
$dsn = "mysql:host=$servername;dbname=$dbname";
// getting the data
$coor = $_GET['coor'] ?? null;  // Use nullish coalescing operator for safety
$emergency_type = $_GET['emergency_type'] ?? null;

date_default_timezone_set('Asia/Manila');

// Create connection
try {
    $conn = new PDO($dsn, $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) { 
    echo "Connection failed: " . $e->getMessage();
    // If connection fails, explicitly close the PDO object (good practice)
    if ($conn) {
        $conn = null; // Close the connection
    }
    die(); // Terminate script execution

// Connection is now successfully established and available in $conn
}

