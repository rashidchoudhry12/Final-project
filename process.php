<?php
include 'db.php';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $category = $_POST['category'];
    $amount = $_POST['amount'];
    $date = $_POST['date'];
    $description = $_POST['description'];

    // Validate input (optional but recommended)
    if (empty($category) || empty($amount) || empty($date)) {
        echo "Please fill in all required fields.";
        exit();
    }

    // Insert data into the database using prepared statements
    $sql = "INSERT INTO expneses (category, amount, date, description) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdss", $category, $amount, $date, $description);

    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Handle delete request
if (isset($_GET["delete"])) {
    $id = $_GET["delete"];
    $sql = "DELETE FROM expneses WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Expense deleted!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>