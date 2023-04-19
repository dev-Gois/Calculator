// Variáveis

const display = document.getElementById("display");

let numeroUm = "";
let numeroDois = "";
let operador = null;
let resultado = null;
let entrada;
let numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let operadores = ['*', '/', '%', '-', '+'];
let funcionais = ['Backspace', 'Delete', 'Enter'];

// Funções
function Limpar() {
    numeroUm = "";
    numeroDois = "";
    operador = null;
    resultado = null;
    display.value = "";
}

function Apagar() {
    if(resultado !== null) {
        resultado = resultado.toString().slice(0, -1);
        display.value = resultado;
    } else if(operador !== null) {
        if(numeroDois == "") {
            operador = null;
            display.value = numeroUm;
        } else {
            numeroDois = numeroDois.slice(0, -1);
            display.value = numeroUm + " " + operador + " " + numeroDois;
        }
    } else {
        numeroUm = numeroUm.slice(0, -1);
        display.value = numeroUm;
    }
}


function Calcular() {
    if(operador === "%") {
resultado = (Number(numeroUm) / 100) * Number(numeroDois);
    } else if(operador === "+") {
resultado = Number(numeroUm) + Number(numeroDois);
    } else if(operador === "-") {
resultado = Number(numeroUm) - Number(numeroDois);
    } else if(operador === "*") {
resultado = Number(numeroUm) * Number(numeroDois);
    } else if(operador === "/") {
resultado = Number(numeroUm) / Number(numeroDois);
    }

    if(isNaN(resultado)) {
        display.value = "";
        resultado = null;
    } else {
        display.value = resultado;
    }
    numeroUm = "";
    numeroDois = "";
    operador = null;
}

function definirOperador(entrada) {
    if(resultado !== null) {
        numeroUm = resultado;
        numeroDois = "";
        resultado = null;
    }   
    
    if(numeroUm === "") {
        numeroUm = "0";
    }

    operador = entrada;
    display.value = numeroUm + " " + operador;
}

function definirNumero(numero) {

    if(resultado !== null) {
        Limpar();
        numeroUm += numero;
        display.value = numeroUm;
    } else if (operador !== null) {
        numeroDois += numero;
        display.value = numeroUm + " " + operador + " " + numeroDois;
    } else {
        numeroUm += numero;
        display.value = numeroUm;
    }
}

function Decimal() {
    if(numeroUm === "" || (operador !== null && numeroDois === "")) {
        definirNumero("0.");
    } else {
        definirNumero(".");
    }
}

function Tecla(entrada) {
    if(numeros.includes(entrada.key)) {
        definirNumero(entrada.key);
    } else if (operadores.includes(entrada.key)) {
        definirOperador(entrada.key);
    } else if (funcionais.includes(entrada.key)) {
        if(entrada.key === "Delete") {
            Limpar();
        } else if (entrada.key === 'Backspace'){
            Apagar();
        } else {
            Calcular();
        }
}
}
//Butões

document.getElementById('limpar').addEventListener('click', Limpar);
document.getElementById('apagar').addEventListener('click', Apagar);
document.getElementById('porcentagem').addEventListener('click', () => definirOperador('%'));
document.getElementById('divisao').addEventListener('click', () => definirOperador('/'));
document.getElementById('multiplicar').addEventListener('click', () => definirOperador('*'));
document.getElementById('subtrair').addEventListener('click', () => definirOperador('-'));
document.getElementById('somar').addEventListener('click', () => definirOperador('+'));
document.getElementById('igual').addEventListener('click', Calcular);

//Butões para Números

document.getElementById('ponto').addEventListener('click', Decimal);
document.getElementById('0').addEventListener('click', () => definirNumero('0'));
document.getElementById('1').addEventListener('click', () => definirNumero('1'));
document.getElementById('2').addEventListener('click', () => definirNumero('2'));
document.getElementById('3').addEventListener('click', () => definirNumero('3'));
document.getElementById('4').addEventListener('click', () => definirNumero('4'));
document.getElementById('5').addEventListener('click', () => definirNumero('5'));
document.getElementById('6').addEventListener('click', () => definirNumero('6'));
document.getElementById('7').addEventListener('click', () => definirNumero('7'));
document.getElementById('8').addEventListener('click', () => definirNumero('8'));
document.getElementById('9').addEventListener('click', () => definirNumero('9'));

//Butões no teclado

document.addEventListener("keydown", Tecla);
