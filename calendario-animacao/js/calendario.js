

const data = new Date();
// var hoje = data.getDate();
// hoje = int(hoje);
var mes = data.getMonth();
var ano = data.getFullYear();
var diaSelecionado = null;

//calendario do mês
function gerarCalendario(){

const diaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const meses = ["Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let calend_mes = document.getElementById("mes");
calend_mes.innerHTML = meses[mes];

let calend_ano = document.getElementById("ano");
calend_ano.innerHTML = ano;

const calendario = document.getElementById("calendario");
calendario.innerHTML = "";

// montar parte com os dias da semana
let topo = document.createElement("div");
topo.className = "cabecalho";

diaSemana.forEach(dia => {
    let criar_div = document.createElement("div");
    criar_div.textContent = dia;
    topo.appendChild(criar_div);
});
calendario.appendChild(topo);

// dias do calendario
let qnt_dias = new Date(ano, mes+1, 0).getDate();
let primeiro_dia = new Date(ano, mes, 1).getDay();
let dias = document.createElement("div");
dias.className = "dias";

//dias em branco do mÊs anterior
for(let i = 0; i< primeiro_dia; i++){
    let criar_div = document.createElement("div");
    criar_div.className = "dia";
    dias.appendChild(criar_div);
}
calendario.appendChild(dias);

//dias do mês atual
for(let dia = 1; dia<=qnt_dias; dia++){
    let criar_div = document.createElement("div");
    if ((dia+primeiro_dia) % 7 === 0 || (dia+primeiro_dia)%7 === 1){
        criar_div.classList.add("dia", "destaque");

    } else{
        criar_div.className = "dia";
    };
    
    criar_div.textContent = dia;
    criar_div.addEventListener('click', function(){
        
        if(diaSelecionado){
            diaSelecionado.classList.remove("selecionado");
        }

        criar_div.classList.add ("selecionado");
        diaSelecionado = criar_div;
        
        exibirDia(dia, mes, ano, meses);

    });
   
    dias.appendChild(criar_div);
};
calendario.appendChild(dias);


};

//apertar botão de voltar:
const botaoVoltar = document.getElementById("voltar");
botaoVoltar.addEventListener('click', function(){
    mudarMes(-1);

    
});

//apertar botão avançar:
const botaoAvancar = document.getElementById("avancar");
botaoAvancar.addEventListener('click', function(){
    mudarMes(1);
});

function mudarMes(direcao){
    const calendario = document.getElementById("calendario");

    calendario.classList.add("transicao");
    calendario.style.opacity = '0';

    setTimeout( () =>{
        if(direcao === -1){
            if (mes != 0){
                mes--;
            }else{
                ano--;
                mes = 11;
            }
            
            
        }
        if(direcao === 1){
            if (mes != 11){
                mes++;
            }else{
                ano++;
                mes = 0;
            }
            
        }
        
        gerarCalendario(mes,ano);
       

        // calendario.classList.remove("calendario-sair");
        // calendario.classList.add("calendario-entrar");

        setTimeout( () =>{
            calendario.style.opacity = '1';
        });
    },400);
}

//apertar o dia:
function exibirDia(dia, mes, ano, meses){
    // const meses = ["Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = "";
    mensagem.textContent = `Dia ${dia} de ${meses[mes]} de ${ano}.`
}

gerarCalendario(mes, ano);
