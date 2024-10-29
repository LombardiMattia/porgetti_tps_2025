let operazione = '';
let memoria = 0;

var val1=0;
var val2=0;

function aggiungi(numero) {
    document.getElementById("inserimento").value += numero;
}

function setOperazione(op) {
    operazione = op;
    document.getElementById("memoria").value = document.getElementById("inserimento").value + ' ' + op;
    document.getElementById("inserimento").value = '';
}

function cancella(tipo) {
    if (tipo === 'CE') document.getElementById("inserimento").value = '';
    else if (tipo === 'C') {
        document.getElementById("inserimento").value = '';
        document.getElementById("memoria").value = '';
        operazione = '';
    }
    else if (tipo === 'back') {
        let input = document.getElementById("inserimento").value;
        document.getElementById("inserimento").value = input.slice(0, -1);
    }
}

function calcola() {
    val1 = parseFloat(document.getElementById("memoria").value);
    val2 = parseFloat(document.getElementById("inserimento").value);
    let risultato;
    
    switch (operazione) {
        case '+': risultato = val1 + val2; break;
        case '-': risultato = val1 - val2; break;
        case '*': risultato = val1 * val2; break;
        case '/': risultato = val2 !== 0 ? val1 / val2 : 'Errore'; break;
        case '√': risultato = Math.sqrt(val1); break;
        case '^2': risultato = Math.pow(val1, 2); break;
        case '1/x': risultato = val1 !== 0 ? 1 / val1 : 'Errore'; break;
        case '%': risultato = (val1) / 100; break;
    }
    
    document.getElementById("inserimento").value = risultato;
    document.getElementById("memoria").value = '';
    operazione = '';
}

function punto() {
    let input = document.getElementById("inserimento").value;
    if (!input.includes('.')) document.getElementById("inserimento").value += '.';
}

function opposto() {
    let input = document.getElementById("inserimento").value;
    document.getElementById("inserimento").value = input.charAt(0) === '-' ? input.slice(1) : '-' + input;
}