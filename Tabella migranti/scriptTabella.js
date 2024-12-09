function apri(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
        let contenuto = reader.result;
        popolaTabella(contenuto);
    }
}

function matrice(content) {
    let matriceC = [];
    const nRighe = contaRighe(content);
    const nColonne = contaColonne(content);

    let righe = content.split("\n");

    for (let i = 0; i < nRighe; i++) {
        matriceC[i] = [];
        let celle = righe[i].split(',');

        for (let j = 0; j < nColonne; j++) {
            // Rimuove i doppi apici prima di assegnare il valore alla cella
            matriceC[i][j] = celle[j].replace(/"/g, '');  // Rimuove i doppi apici e gli spazi extra
        }
    }

    return matriceC;
}


function contaRighe(content) {
    return content.split("\n").length;
}

function contaColonne(content) {
    let righe = content.split("\n");
    return righe[0].split(',').length;
}

function popolaTabella(content) {
    let tabella = document.getElementById('tabella');
    // Pulisce la tabella esistente prima di aggiungere nuove righe
    tabella.innerHTML = '';

    const nColonne = contaColonne(content);
    const nRighe = contaRighe(content);

    const matriceCarica = matrice(content);

    for (let r = 0; r < nRighe; r++) {
        let tr = document.createElement('tr');
        for (let c = 0; c < nColonne; c++) {
            let td = document.createElement('td');
            td.textContent = matriceCarica[r][c];
            tr.appendChild(td);
        }
        tabella.appendChild(tr);
    }

        let contenitoreTabella= document.getElementById("spazio_tabella")
        contenitoreTabella.appendChild(tabella);

}
