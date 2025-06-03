<?php

include 'db.php';
 $result = $conn->query("SELECT * FROM expneses");
 $expenses = [];

 While ($row = $result->fetch_assoc()) {
     $expenses[] = $row;
 }
 echo json_encode($expenses);
?>