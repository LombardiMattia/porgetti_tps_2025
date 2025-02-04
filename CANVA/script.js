function apri(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
        let contenuto = reader.result;
        popolaTabella(contenuto);
        creaGrafico(contenuto);
        stampaMatrice(contenuto);
        attivaBlocchi();
    }
}

//SEZIONE POPOLA TABELLA
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

    function stampaMatrice(content){
        let matriceC= matrice(content);
        for (let i=0; i < contaRighe(content); i++){
            console.log("\n");
            for (let j=0; j < contaColonne(content); j++){
                console.log(matriceC[i][0]);
            }
        }
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



//SEZIONE CREA GRAFICO

    // creazione array separati
    function arrayRows(content) {
        let matriceC = matrice(content);
        let sbarchi = [];

        for (let i = 1; i < matriceC.length; i++) {
            sbarchi.push(matriceC[i][1]);
        }
        return sbarchi;
    }

    function arrayColoumns(content) {
        let matriceC = matrice(content);
        let anni = [];

        for (let i = 1; i < matriceC.length; i++) {
            anni.push(matriceC[i][0]);
        }
        return anni;
    }

    function creaGrafico(content) {
        // sezione dati
        let matriceRiferimento = matrice(content);
        let sbarchi = arrayRows(content);
        let anni = arrayColoumns(content);

        // Configurazione grafico
        let grafico = document.getElementById('grafico'); // Variabile sembianze grafico
        let context = grafico.getContext('2d'); // grafico bidimensionale

        // personalizzazione grafico
        const WidthGrafico = grafico.width;
        const HeightGrafico = grafico.height;
        const paddingGrafico = 60;

        // personalizzazione barre
        let WidthBarre = (WidthGrafico - (2 * paddingGrafico)) / sbarchi.length;

        // creazione barre
        context.fillStyle = '#2f3041'; // colore barre
        for (let i = 0; i < sbarchi.length; i++) {
            const HeightBarre = sbarchi[i] * (HeightGrafico - 2 * paddingGrafico) / Math.max(...sbarchi);
            const x = paddingGrafico + i * WidthBarre;
            const y = HeightGrafico - paddingGrafico - HeightBarre;
            context.fillRect(x, y, WidthBarre - 10, HeightBarre);
        }

        // aggiunta etichette
        context.fillStyle = 'white';
        context.font = '14px Rubik';
        context.textAlign = 'center';
        for (let i = 0; i < anni.length; i++) {
            const x = paddingGrafico + i * WidthBarre + (WidthBarre - 10) / 2;
            const y = HeightGrafico - paddingGrafico + 60;
            context.fillText(anni[i], x, y);
        }

        // aggiungi etichette sull'asse Y
        aggiungiEtichetteY(sbarchi, context, WidthGrafico, HeightGrafico, paddingGrafico);

        // aggiunta assi
        // asse y
        context.beginPath();
        context.moveTo(paddingGrafico, paddingGrafico);
        context.lineTo(paddingGrafico, HeightGrafico - paddingGrafico);
        context.strokeStyle = 'white';
        context.lineWidth= 2
        context.stroke();

        // asse x
        context.beginPath();
        context.moveTo(paddingGrafico, HeightGrafico - paddingGrafico);
        context.lineTo(WidthGrafico - paddingGrafico, HeightGrafico - paddingGrafico);
        context.stroke();
    }

    // Aggiunta etichette all'asse Y
    function aggiungiEtichetteY(sbarchi, context, WidthGrafico, HeightGrafico, paddingGrafico) {
        context.fillStyle = 'white';
        context.font = '14px Rubik';
        context.textAlign = 'right'; // Allineamento delle etichette a destra

        // Determina il massimo valore di sbarchi
        let maxSbarchi = Math.max(...sbarchi);
        
        // Definisci un intervallo per le etichette, ad esempio ogni 1000
        let intervallo = 20000;
        
        // Crea etichette ogni intervallo
        for (let i = 0; i <= maxSbarchi; i += intervallo) {
            const y = HeightGrafico - paddingGrafico - (i / maxSbarchi) * (HeightGrafico - 2 * paddingGrafico);
            context.fillText(i, paddingGrafico - 10, y); // Aggiungi un offset per allontanare l'etichetta dall'asse Y
        }
    }

    //funzione sparisce

    function attivaBlocchi(){
        document.getElementById('spazio_tabella').style.display='block';
        document.getElementById('contenitore').style.display= 'block';
    }
