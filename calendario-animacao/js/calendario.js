const data = new Date();
var mes = data.getMonth();
var ano = data.getFullYear();
var diaSelecionado = null;

//calendario do mês
function gerarCalendario(){

const diaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const meses = ["Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let calend_mes = document.getElementById("mes");
calend_mes.classList.add('tituloCor')
calend_mes.innerHTML = meses[mes];

let calend_ano = document.getElementById("ano");
calend_ano.innerHTML = ano;

const calendario = document.getElementById("calendario");
calendario.innerHTML = "";

// montar parte com os dias da semana
let topo = document.createElement("div");
topo.className = "cabecalho";

diaSemana.forEach((dia, index) => {
    
    let criar_div = document.createElement("div");
    if(index === 0 || index === 6){
        criar_div.classList.add('destaqueSemanaCor');
    }
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
        setTimeout( () =>{
            calendario.style.opacity = '1';
        });
    },400);
}

//apertar o dia:
function exibirDia(dia, mes, ano, meses){
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = "";
    mensagem.textContent = `Dia ${dia} de ${meses[mes]} de ${ano}.`
}

gerarCalendario(mes, ano);


//menu hamburguer:
function show() {
    document.querySelector('.hamburguer').classList.toggle('abrir');
    document.querySelector('.navegacao').classList.toggle('ativada');
}

let menuAberto = false;
let tema = "claro";

const bodyCor = document.querySelector('#bodyCor');
const mainCor = document.querySelector('#mainCor');
const titulos = document.getElementsByClassName('tituloCor');
const cabecalhoCor = document.querySelector('.cabecalho');
const destaqueCor = document.getElementsByClassName('destaque');
const destaqueSemanaCor = document.getElementsByClassName('destaqueSemanaCor');
const diasCor = document.getElementsByClassName('dia');

const mudarTema = document.getElementById("alterarTema");
mudarTema.addEventListener('click', () =>{
    tema = (tema === 'claro') ? 'escuro' : 'claro';

    if(tema == "escuro"){
        bodyCor.style.backgroundColor = '#e1f5c4';
        mainCor.style.backgroundColor = '#fffcfc';
        
        if(cabecalhoCor){
            cabecalhoCor.style.backgroundColor = '#95aa61';
        }

        for(let i = 0; i < titulos.length; i++){
            titulos[i].style.color = '#a7cd2c';
        }

        for(let i = 0; i < diasCor.length; i++){
            diasCor[i].style.color = '#2f2f2f';
            diasCor[i].classList.add('claro'); 
            diasCor[i].classList.remove('escuro');
        }

        for(let i = 0; i < destaqueCor.length; i++){
            destaqueCor[i].style.color = '#95aa61';
        }

        for(let i = 0; i < destaqueSemanaCor.length; i++){
            destaqueSemanaCor[i].style.color = '#d6e68a';
        }
        
    } 
    else{

        bodyCor.style.backgroundColor = '#484450';
        mainCor.style.backgroundColor = '#466067';
        
        if(cabecalhoCor){
            cabecalhoCor.style.backgroundColor = '#34baab';
        }
        
        for(let i = 0; i < titulos.length; i++){
            titulos[i].style.color = '#459a96';
        }

        for(let i = 0; i < diasCor.length; i++){
            diasCor[i].style.color = '#c4c8c5';
            diasCor[i].classList.remove('claro'); 
            diasCor[i].classList.add('escuro');
        }

        for(let i = 0; i < destaqueCor.length; i++){
            destaqueCor[i].style.color = '#459a96';
        }

        for(let i = 0; i < destaqueSemanaCor.length; i++){
            destaqueSemanaCor[i].style.color = '#2bd7c3';
        }

        }
        const dias = document.querySelectorAll('.dia');
        dias.forEach(dia => {
            dia.classList.remove('claro', 'escuro'); 
            dia.classList.add(tema === "claro" ? 'claro' : 'escuro'); 
        });
        }
);