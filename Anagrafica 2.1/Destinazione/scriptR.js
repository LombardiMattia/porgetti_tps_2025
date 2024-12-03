// Recupera il dato dal localStorage
const nColonne = 6;
var tabella = document.getElementById('tabella_generica'); // Creazione tabella
var tbody = tabella.getElementsByTagName('tbody')[0]; // Creazione del tbody

var vectorData = localStorage.getItem('vectorData');
if (vectorData) {
    var array = vectorData.split('/'); // Suddivide i dati separati da "/"
    console.log(array[0]); // Mostra il primo valore in console per il debug

    // Crea una nuova riga
    var tr = document.createElement('tr'); 

    // Itera su ogni elemento dell'array e crea una cella per ogni dato
    for (let i = 0; i < nColonne; i++) {
        let td = document.createElement('td'); // Crea una nuova cella
        let valore = array[i] || "N/A"; // Se non c'è un valore, usa "N/A"
        
        td.textContent = valore; // Imposta il testo della cella
        tr.appendChild(td); // Aggiungi la cella alla riga
    }

    // Aggiungi la riga al corpo della tabella
    tbody.appendChild(tr); // Aggiunge la nuova riga al tbody
    console.log("Riga aggiunta con successo!");
} else {
    console.log("Nessun dato trovato nel localStorage.");
}
