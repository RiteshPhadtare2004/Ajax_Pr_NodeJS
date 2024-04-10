<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $users = json_decode(file_get_contents("users.json"), true);
    $users[] = array("username" => $username, "password" => $password);
    file_put_contents("users.json", json_encode($users));

    echo json_encode(array("success" => true, "message" => "User registered successfully."));
} else {
    echo json_encode(array("success" => false, "message" => "Failed to register user."));
}
?>
