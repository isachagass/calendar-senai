<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Calendário</title>
</head>
<body>
    <main>
       <section>

        <div id="direita">
            <div id="container">
                    <?php
                    date_default_timezone_set('America/Sao_Paulo');
                    $ano = date('Y');
                    $mes = date('m');
                    $semana = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
                    $qnt_dias = cal_days_in_month(CAL_GREGORIAN, $mes, $ano);
                    $primeiro_dia = date('N', strtotime("$ano-$mes-01"));
                    $hoje = (int)date('d');
                    $meses = ["","Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

                    echo "<h1 id='mes'>$meses[$mes]</h1><br>";
                    echo "<table>";

                    echo "<tr>";
                    foreach ($semana as $j){
                        echo "<th>$j</th>";
                    }
                    echo "</tr><tr>";

                    for ($i = 0; $i<$primeiro_dia; $i++){
                        echo "<td></td>";
                    }
                    for ($dia = 1; $dia <= $qnt_dias; $dia++){
                        if ($dia === $hoje){
                            echo '<td class="diaAtual">'.$dia."</td>";
                        }
                        else{
                            echo "<td>$dia</td>";
                        }
                        if(($dia+$primeiro_dia) % 7 === 0){
                            echo "</tr><tr>";
                        }
                    }
                    echo "</tr>";            
                                
                    echo "</table><br>";  
         
                    echo "<div><h1 id='ano'>$ano</h1></div>";
                    ?>
                    
            </div>
            
        </div>
       </section>
    </main>
    
</body>
</html>