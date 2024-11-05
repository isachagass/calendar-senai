<?php

$servername = "127.0.0.1:3307";
$username = "root"; 
$password = ""; 
$dbname = "calendario_eventos"; 

$conexao = new mysqli($servername, $username, $password, $dbname);


if ($conexao->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$nome_evento = $_POST['nome_evento'];
$descricao_evento = $_POST['descricao_evento'];
$data_evento = $_POST['data_evento'];

$sql1 = "INSERT INTO eventos (data_evento, nome_evento, descricao_evento) VALUES ('$data_evento', '$nome_evento', '$descricao_evento')";

if ($conexao->query($sql1) === TRUE) {
    echo "Novo evento criado com sucesso!";
} else {
    echo "Erro: " . $sql1 . "<br>" . $conexao->error;
}


$conexao->close();
?>
