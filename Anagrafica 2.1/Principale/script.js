const nColonne = 6;
var arrayId = ["nome", "cognome", "city", "indirizzo", "mail", "cf"];

function inviaPagina() {
    // controllo campi
    if (controlloTuttiICampi() == true) {
        alert("Devi compilare tutti i campi");
        pulisciCampi();
        return;
    }
    console.log("Sono dentro");

 
    //controlli sui campi, nome/cognome/città
    if (controllaStringhe() == true){
        alert("Non puoi inserire numeri e/o caratteri speciali nei campi: nome, cognome e città.");
        pulisciCampi();
        return;
    }

      //Controllo sull'indirizzo
      if (controlloIndirizzo() == true){
        alert("Assicurati che nel campo indirizzo vi sia il nome della via ed il numero civico spearati dalla virgola.");
        pulisciCampi();
        return;
    }

        //controllo sulla mail
        if (controlloMail() == true){
        alert("Assicurati che nel campo mail vi sia almeno un punto ed una chiocciola.");
        pulisciCampi();
        return;
    }

    //Creazione del vettore da passare
    var vettoreDati = caricaArray().join('/');

    //salvo informazioni
    localStorage.setItem('vectorData', vettoreDati);
    location.href = "../Destinazione/destinazione.htm";


}

// Controllo che tutti i campi siano pieni
function controlloTuttiICampi() {
    let conta = 0;
    for (let i = 0; i < nColonne; i++) {
        if (document.getElementById(arrayId[i]).value != "") {
            conta++;
        }
    }

    // Se il numero di campi compilati è minore di quello totale, restituisce true
    if (conta < nColonne) {
        return true;  // Almeno un campo è vuoto
    }

    return false; // Tutti i campi sono compilati
}

// Funzione per pulire i campi
function pulisciCampi() {
    for (let i = 0; i < nColonne; i++) {
        document.getElementById(arrayId[i]).value = '';
    }
}

//Controlli per i campi stringa (nome, cognome, città)
function controllaStringhe() {
    let controlloNome = document.getElementById("nome").value;
    let controlloCognome = document.getElementById("cognome").value;
    let controlloCity = document.getElementById("city").value;


    // Rimuovo eventuali stili di errore precedenti
    document.getElementById("nome").style.borderColor = '';
    document.getElementById("cognome").style.borderColor = '';
    document.getElementById("city").style.borderColor = '';

    // Controllo se c'è almeno un numero o carattere non valido in uno dei campi
    if (/\d/.test(controlloNome) || /[^a-zA-Z]/.test(controlloNome)) {
        return true;
    }

    if (/\d/.test(controlloCognome) || /[^a-zA-Z]/.test(controlloCognome)) {
        return true;
    }

    if (/\d/.test(controlloCity) || /[^a-zA-Z]/.test(controlloCity)) {
        return true;
    }


    return false; // Nessun errore, i campi sono validi
}


function controlloIndirizzo(){
    let controllo= document.getElementById("indirizzo").value;

    if(!(/\d/.test(controllo)))
        return true;

    if(!(/,/.test(controllo)))
        return true;

    if(!(/[a-z]/i.test(controllo)))
        return true;

    return false;
}

//Controllo sulla mail
function controlloMail(){
    let controlloMail= document.getElementById("mail").value;

    if (!(/./.test(controlloMail)))
        return true;

    if (!(/@/.test(controlloMail)))
        return true;

    if (!(/[a-z]/i.test(controlloMail)))
        return true;
    return false;
}

function caricaArray(){
    let array=[];
    for (let i=0; i < nColonne; i++){
        array[i]= document.getElementById(arrayId[i]).value;
    }
    return array;
}