<?php
$host = "db-two-tier-1.cxxxxx.us-east-1.rds.amazonaws.com"; // RDS endpoint
$db   = "two-tier";
$user = "admin";
$pass = "admin#123";
$port = 3306;

$conn = new mysqli($host, $user, $pass, $db, $port);
if ($conn->connect_error) {
    die("DB connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT NOW() AS nowtime");
$row = $result->fetch_assoc();

echo "<h1>✓ EC2 + RDS Working!</h1>";
echo "<p>Database Server Time: " . $row['nowtime'] . "</p>";
echo "<hr>";

// Fetch test data
$test = $conn->query("SELECT * FROM test");
if ($test) {
    while ($msg = $test->fetch_assoc()) {
        echo "<p>" . $msg['msg'] . "</p>";
    }
}

$conn->close();
?>