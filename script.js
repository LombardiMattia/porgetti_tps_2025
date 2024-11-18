// Variabili globali
var tabella = document.getElementById('tabella_generica'); // Creazione tabella
var tbody = tabella.getElementsByTagName('tbody')[0]; // Creazione del tbody
var nColonne = tabella.getElementsByTagName('th').length; // Conteggio colonne
var arrayId = ["nome", "cognome", "city", "indirizzo", "mail", "cf"];

// Funzione attivabile dal bottone
function popolaTabella() {

    //controllo che tutti i campi non siano vuoti
        let conta = 0;
        for (let i = 0; i < nColonne; i++) {
            let campo = document.getElementById(arrayId[i]);
            if (campo && campo.value !== "") { // Verifica che il campo non sia vuoto
                conta++;
            }
        }
    
        if (conta === 0) { // Se nessun campo è compilato
            return;
        }

    var tr = document.createElement('tr'); // Crea una nuova riga ogni volta
    for (let i = 0; i < nColonne; i++) {
        let td = document.createElement('td');
        let elementoDom = document.getElementById(arrayId[i]);
        let valore;

        if (elementoDom) {
            valore = elementoDom.value; // Se l'elemento esiste, prendi il valore
        } else {
            valore = "N/A"; // Altrimenti usa "N/A"
        }

        td.textContent = valore; // Imposta il testo della cella
        tr.appendChild(td);
    }
    tbody.appendChild(tr); // Aggiunge la nuova riga al tbody
    console.log("Riga aggiunta con successo!");


    //pulisco campi id
    for (let i=0; i < nColonne; i++){
        document.getElementById(arrayId[i]).value= '';
    }
}

function azzera(){

if(tbody.rows.length) {
    tbody.deleteRow(0);  // Rimuove la prima riga
}
}

