const data = new Date();
var mes = data.getMonth();
var ano = data.getFullYear();
var diaSelecionado = null;
let tema = "claro";
let tipoCalendario = 'mensal';
let semanaAtual = 0;


//calendario do mensal:
function gerarCalendario(tipoCalendario) {

    const diaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let calend_mes = document.getElementById("mes");
    calend_mes.innerHTML = meses[mes];

    let calend_ano = document.getElementById("ano");
    calend_ano.innerHTML = ano;

    const calendario = document.getElementById("calendario");
    calendario.innerHTML = "";

    // montar parte com os dias da semana
    let topo = document.createElement("div");
    topo.classList.add("cabecalho");
    if (tema === "escuro") topo.classList.add("escuro");

    diaSemana.forEach((dia, index) => {

        let criar_div = document.createElement("div");
        if (index === 0 || index === 6) {
            criar_div.classList.add('destaqueSemanaCor');
        }
        if (tema === "escuro") criar_div.classList.add("escuro");
        criar_div.textContent = dia;
        topo.appendChild(criar_div);
    });
    calendario.appendChild(topo);

    if (tipoCalendario === 'mensal') {
        calendarioMensal(meses);
    } else {
        calendarioSemanal(meses);
    }

    const elementosEscuro = document.querySelectorAll(".escuro");
    if (tema === 'claro') {
        elementosEscuro.forEach(elemento => {
            elemento.classList.toggle('escuro')
        })
    }
  
    carregar_eventos();
};

function calendarioMensal(meses) {
    const calendario = document.getElementById("calendario");

    let qnt_dias = new Date(ano, mes + 1, 0).getDate();
    let primeiro_dia = new Date(ano, mes, 1).getDay();
    let dias = document.createElement("div");
    dias.className = "dias";

    //dias em branco do mÊs anterior
    for (let i = 0; i < primeiro_dia; i++) {
        let criar_div = document.createElement("div");
        criar_div.className = "dia";
        dias.appendChild(criar_div);
    }
    calendario.appendChild(dias);

    //dias do mês atual
    for (let dia = 1; dia <= qnt_dias; dia++) {
        let criar_div = document.createElement("div");
        criar_div.classList.add('dia');
        if (tema === "escuro") criar_div.classList.add("escuro");
        if ((dia + primeiro_dia) % 7 === 0 || (dia + primeiro_dia) % 7 === 1) {
            criar_div.classList.add("destaque");
        }
        

        criar_div.textContent = dia;
        criar_div.setAttribute('data-date', `${ano}-${String(mes+1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`);
        criar_div.addEventListener('click', function () {

            if (diaSelecionado) {
                diaSelecionado.classList.remove("selecionado");
            }

            criar_div.classList.add("selecionado");
            diaSelecionado = criar_div;

            exibirDia(dia, mes, ano, meses);

        });
        

        dias.appendChild(criar_div);

    };
    calendario.appendChild(dias);
}

function calendarioSemanal(meses) {
    const calendario = document.getElementById('calendario');

    let primeiroDiaSemana = new Date(ano, mes, 1 + semanaAtual * 7);
    let diaSemanaInicia = primeiroDiaSemana.getDay()
    primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() - diaSemanaInicia);

    let mesAtual = primeiroDiaSemana.getMonth();
    let anoAtual = primeiroDiaSemana.getFullYear();

    let mesCalendario = document.getElementById("mes");
    mesCalendario.innerHTML = meses[mesAtual];
    document.getElementById('ano').innerHTML = anoAtual

    let dias = document.createElement("div");
    dias.className = "dias";


    for (let i = 0; i < 7; i++) {
        let dataAtual = new Date(anoAtual, mesAtual, primeiroDiaSemana.getDate() + i);
        let dia = document.createElement("div");
        dia.classList.add('dia', 'calenSemanal');
        dia.textContent = dataAtual.getDate();

        if (dataAtual.getDay() === 0 || dataAtual.getDay() === 6) dia.classList.add('destaque');

        if (tema === 'escuro') dia.classList.add("escuro");

        if (dataAtual.getMonth() !== mes) {
            dia.classList.add("foraMes");
        }

        dia.addEventListener('click', function () {

            if (diaSelecionado) {
                diaSelecionado.classList.remove("selecionado");
            }

            dia.classList.add("selecionado");
            diaSelecionado = dia;

            exibirDia(dataAtual.getDate(), mesAtual, anoAtual, meses);
        });

        dias.appendChild(dia);
    }
    calendario.appendChild(dias);
}

//apertar botão de voltar:
const botaoVoltar = document.getElementById("voltar");
botaoVoltar.addEventListener('click', function () {
    if (tipoCalendario == "mensal") {
        mudarMes(-1);
    }
    else {
        mudarSemana(-1);
    }
});

//apertar botão avançar:
const botaoAvancar = document.getElementById("avancar");
botaoAvancar.addEventListener('click', function () {
    if (tipoCalendario == "mensal") {
        mudarMes(1);
    }
    else {
        mudarSemana(1);
    }
});

function mudarMes(direcao) {
    const calendario = document.getElementById("calendario");

    calendario.classList.add("transicao");
    calendario.style.opacity = '0';

    setTimeout(() => {
        if (direcao === -1) {
            if (mes != 0) {
                mes--;
            } else {
                ano--;
                mes = 11;
            }

        }
        if (direcao === 1) {
            if (mes != 11) {
                mes++;
            } else {
                ano++;
                mes = 0;
            }

        }

        gerarCalendario(tipoCalendario);
        setTimeout(() => {
            calendario.style.opacity = '1';
        });
    }, 400);
}

function mudarSemana(direcao) {
    const calendario = document.getElementById("calendario");
    calendario.classList.add("transicao");
    calendario.style.opacity = '0';

    setTimeout(() => {
    semanaAtual += direcao;
    gerarCalendario(tipoCalendario);

    setTimeout(() => {
        calendario.style.opacity = '1';
    });
    }, 400);
}

//apertar o dia:
function exibirDia(dia, mes, ano, meses) {
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = "";
    mensagem.textContent = `Dia ${dia} de ${meses[mes]} de ${ano}.`

    const dataSelecionada = `${ano}/${String(mes+1).padStart(2, '0')}/${String(dia).padStart(2, '0')}`;
    document.getElementById("data_evento").value = dataSelecionada;
    document.getElementById("modal").style.display = "flex";
    
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none"; 
}
}

//menu hamburguer:
function show() {
    document.querySelector('.hamburguer').classList.toggle('abrir');
    document.querySelector('.navegacao').classList.toggle('ativada');
}

//alterar tema:
const mudarTema = document.getElementById("alterarTema");
mudarTema.addEventListener('click', () => {
    tema = (tema === 'claro') ? 'escuro' : 'claro';
    document.body.classList.toggle("escuro", tema === "escuro");
    document.getElementById("main").classList.toggle("escuro", tema === "escuro");

    const titulos = document.querySelectorAll(".tituloCor");
    titulos.forEach(titulo =>
        titulo.classList.toggle("escuro", tema === "escuro"));
    gerarCalendario(tipoCalendario);

});

// alterar tipo de calendario:
const mudarCalendario = document.getElementById("mudarCalendario");
mudarCalendario.addEventListener('click', () => {
    tipoCalendario = (tipoCalendario === 'mensal') ? 'semanal' : 'mensal';
    semanaAtual = 0;

    if (tipoCalendario === 'mensal') {
        gerarCalendario(tipoCalendario);
        //ver como envia que é mensal
    } else {
        gerarCalendario(tipoCalendario);
        //ver como envia que é semanal
    }
})

// form para o php:
document.getElementById("eventoForm").addEventListener('submit', function (event){
    event.preventDefault();

    const data_evento = document.getElementById("data_evento").value;
    const nome_evento = document.getElementById("nome_evento").value;
    const descricao_evento = document.getElementById("descricao_evento").value;

    fetch('salvar_evento.php',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data_evento=${data_evento}&nome_evento=${encodeURIComponent(nome_evento)}&descricao_evento=${encodeURIComponent(descricao_evento)}`
    })

    .then (response => response.text())
    .then (resultado =>{
        console.log(resultado);
        document.getElementById('modal').style.display ='none';
    })

    .catch (error => console.error("Erro:", error));


})

async function carregar_eventos() {
    try{
        const datas = await fetch('carregar_eventos.php');
        const diasComEvento = await datas.json();

        destacarDiasComEvento(diasComEvento);
    }
    catch(error){
        console.error("Erro ao carregar os eventos:", error);
    }
}
function destacarDiasComEvento(diasComEvento){
    const dias = document.querySelectorAll(".dia");

    dias.forEach(dia => {
        const dataDia = dia.getAttribute("data-date");

        if (diasComEvento.includes(dataDia)){
            dia.classList.add('com-evento');
        }
    })

}


gerarCalendario(tipoCalendario);