function adatokbetoltese() {
    fetch("http://localhost:3000/varosnevek")
        .then(x => x.json())
        .then(y => tipusok(y));

    fetch("http://localhost:3000/adatokLista")
        .then(x => x.json())
        .then(y => mindenadat(y));

    fetch("http://localhost:3000/esemenytipusok")
        .then(x => x.json())
        .then(y => esemenynektipusai(y));
    
}
adatokbetoltese();

function tipusok(adatok) {
    console.log(adatok);
    var sz = "<option value='osszesadat'>Összes esemény</option>";
    for (var elem of adatok) {
        sz += ` <option value="${elem.vnev}">${elem.vnev}</option>`
    }
    document.getElementById("tipusoklista").innerHTML = sz;
}

function esemenynektipusai(tip) {
    console.log(tip);
    var sz = "<option value='osszesadat'>Összes esemény</option>";
    for (var elem of tip) {
        sz += ` <option value="${elem.tipus_nev}">${elem.tipus_nev}</option>`
    }
    document.getElementById("esemenytipusok").innerHTML = sz;
}

function mindenadat(adatok) {
    console.log(adatok);
    var sz = "";
    var keresettadat = document.getElementById("keresettadat").value.toLowerCase();  // A keresett adat kisbetűs formája

    for (var elem of adatok) {
        // Kiemelés a szövegben
        var nev = elem.nev.replace(new RegExp(keresettadat, 'gi'), (match) => `<span class="highlight">${match}</span>`);
        var helyszin_nev = elem.helyszin_nev.replace(new RegExp(keresettadat, 'gi'), (match) => `<span class="highlight">${match}</span>`);
        var tipus_nev = elem.tipus_nev.replace(new RegExp(keresettadat, 'gi'), (match) => `<span class="highlight">${match}</span>`);
        var vnev = elem.vnev.replace(new RegExp(keresettadat, 'gi'), (match) => `<span class="highlight">${match}</span>`);

        sz += `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="osszesadat">
                <span style="font-weight:bold;font-size: 25px;text-decoration:overline">${vnev}</span>
                <br>
                <span style="font-weight:bold">Típus:</span> ${tipus_nev}
                <br>
                <span style="font-weight:bold">Helyszín: </span>
                <span style="font-style:italic;font-size: 18px;">${helyszin_nev}</span>
                <br>
                <span style="font-weight:bold">Neve: </span> ${nev}
                <br>
                <span style="font-weight:bold">Dátum: </span>
                <span style="text-decoration:underline;">${elem.datum}</span>
                <br>
                <span style="font-weight:bold">Leírás: </span> ${elem.leiras.substring(0, 200)}...
            </div>
        </div>
        `;
    }
    document.getElementById("osszes").innerHTML = sz;
}

//városnevek lenyilo---------------------
function kereses2() {
    var keresettadat2 = document.getElementById("tipusoklista").value;
    console.log(keresettadat2)
    if(keresettadat2=="osszesadat"){
        adatokbetoltese()
    }
    varosokszures(keresettadat2);
}
function varosokszures(kulcsszo) {
    fetch("http://localhost:3000/szures/" + kulcsszo)
        .then(x => x.json())
        .then(y => mindenadat(y));
}


//tipsok rész--------------
function kereses3() {
    var keresettadat2 = document.getElementById("esemenytipusok").value;
    //alert(keresettadat2)
    console.log(keresettadat2)
    if(keresettadat2=="osszesadat"){
        adatokbetoltese()
    }
    tipusszures(keresettadat2);
}
function tipusszures(kulcsszo) {
    fetch("http://localhost:3000/szurestipus/" + kulcsszo)
        .then(x => x.json())
        .then(y => mindenadat(y));
}


//input kereso
function kereses()
{
    var keresettadat=document.getElementById("keresettadat").value;
    if(document.getElementById("keresettadat").value=="")adatokbetoltese();
    else keresesmezo(keresettadat);
}
function keresesmezo(kulcsszo){
    fetch("http://localhost:3000/keresek/"+kulcsszo)
    .then(x=>x.json())
    .then(y=>mindenadat(y));
}






//fooldal chatbot

// Válaszok előre meghatározottak
const answers = {
    "Hogyan kell keresni?": "Lenyílóban található bal oldalon a városok alapján való szűrés majd középen a típusok alapján lehet és jobb szélen lehet a keresőmezőbe rákeresni az adott városra, típusára vagy az esemény nevére.",
  };
  
  // Modal megnyitása
  function openChat() {
    const modal = document.getElementById('chat-modal');
    modal.style.display = "block";
  
    // Kezdő üzenet a chatbot felületén
    const chatBox = document.getElementById('chat-box');
  
    // Bot üzenete profilképpel
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
  
    // Profilkép hozzáadása
    const profileImage = document.createElement('img');
    profileImage.src = '/kepek/chatbot.png'; //  kép URL-je
    botMessage.appendChild(profileImage);
  
    // A válasz szöveg hozzáadása
    const textNode = document.createElement('span');
    textNode.innerText = "Szia! Úgy látom segítségre szorulsz.";
    botMessage.appendChild(textNode);
  
    chatBox.appendChild(botMessage);
  }
  
  // Modal bezárása és chat újraindítása
  function closeChat() {
    const modal = document.getElementById('chat-modal');
    modal.style.display = "none";
  
    // Töröljük a chatbox tartalmát
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
  
    // Visszaállítjuk a gombokat is
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = `
      <button class="chat-button" onclick="sendQuestion('Hogyan kell keresni?', this)">Hogyan kell keresni?</button>
    `;
  }
  
  // Function a kérdések és válaszok kezelésére
  function sendQuestion(question, buttonElement) {
    const chatBox = document.getElementById('chat-box');
  
    // Felhasználói üzenet hozzáadása
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.innerText = question;
    chatBox.appendChild(userMessage);
  
    // Bot válaszának hozzáadása
    const botResponse = answers[question] || "Sajnálom, nem értem a kérdést.";
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
  
    // Profilkép hozzáadása
    const profileImage = document.createElement('img');
    profileImage.src = '/kepek/chatbot.png';  //  kép URL-je
    botMessage.appendChild(profileImage);
  
    // A válasz szöveg hozzáadása
    const textNode = document.createElement('span');
    textNode.innerText = botResponse;
    botMessage.appendChild(textNode);
  
    chatBox.appendChild(botMessage);
  
    // Görgetés a legújabb üzenethez
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Kép pirosra változtatása és letiltása
    buttonElement.style.backgroundColor ="#FF3632"; // Pirossá válik
    buttonElement.disabled = true; // Letiltja a gombot, hogy ne lehessen újra kattintani
  }
  
  // Ha a felhasználó a modal ablak kívülre kattint
  window.onclick = function(event) {
    const modal = document.getElementById('chat-modal');
    if (event.target === modal) {
      closeChat();
    }
  }





    