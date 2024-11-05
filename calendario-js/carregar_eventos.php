<?php

$servername = "127.0.0.1:3307";
$username = "root"; 
$password = ""; 
$dbname = "calendario_eventos"; 

$conexao = new mysqli($servername, $username, $password, $dbname);


if ($conexao->connect_error) {
    die("Conexão falhou: " . $conexao->connect_error);
}

$sql2 = "SELECT data_evento FROM eventos";
$dias = $conexao->query(($sql2));

$eventos = [];

if($dias -> num_rows > 0) {
    while($row = $dias -> fetch_assoc()) {
        $eventos [] = $row['data_evento'];
    }
}
echo json_encode($eventos);

$conexao->close();
?>
