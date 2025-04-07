function kapcsolatfelvitel() {
  const datum = new Date();
  const dateString = datum.getFullYear() + "-" + (datum.getMonth() + 1) + "-" + datum.getDate();



  var adatok = {
    "bevitel1": document.getElementById("bevitel1").value,
    "bevitel2": document.getElementById("bevitel2").value,
    "bevitel3": document.getElementById("bevitel3").value,
    "datum": dateString  // A mai dátum hozzáadása
  }


  // E-mail validálás regex-szel
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Ellenőrzés, hogy a bevitt e-mail címek megfelelnek a formátumnak
  if (!emailRegex.test(adatok.bevitel2)) {
    document.getElementById("visszajelzes").innerHTML = "A beírt adatok nem megfelőlek az üzenet elküldésére!";
    document.getElementById("visszajelzes").style.color = "red";  // Hibás üzenet
    return; // Ha a validálás nem sikerül, ne folytasd a beküldést
  }

  if (adatok.bevitel1 == "" || adatok.bevitel2 == "" || adatok.bevitel3 == "") {
    document.getElementById("visszajelzes").innerHTML = "Minden mezőt ki kell tölteni!";
    document.getElementById("visszajelzes").style.color = "red";  // Hibás üzenet


  } 
  /*if (adatok.bevitel3.Length> 255) {
    document.getElementById("visszajelzes").innerHTML = "Meghaladja a 255 szót";
    document.getElementById("visszajelzes").style.color = "red";  // Hibás üzenet
    return;
  }
  */
  else {

    // Ha minden mező ki van töltve és az e-mailek érvényesek, küldjük el az üzenetet
    fetch(Cim + "kapcsolatfelvitel_web", {
      method: "POST",
      body: JSON.stringify(adatok),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(x => x.text())
      .then(y => {
        document.getElementById("visszajelzes").innerHTML = y;
        document.getElementById("visszajelzes").style.color = "green";
      })
  }
}



// Válaszok előre meghatározottak
const answers = {
  "Mi a neved?": "A nevem Chatbot, azért lettem létrehozva, hogy a gyakori kérdésekre válaszokat adjak.",
  "Miért hoztátok létre ezt a weboldalt?": "Mindenkinek megszeretnénk mutatni Magyarországon az összes elérhető programokat.",
  "Hogyan tudok saját eseményt feltölteni?": "Saját eseményt a mobil applikációnkon keresztűl tudsz feltölteni."
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
  textNode.innerText = "Szia! Hogyan segíthetek?";
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
    <button class="chat-button" onclick="sendQuestion('Mi a neved?', this)">Mi a neved?</button>
    <button class="chat-button" onclick="sendQuestion('Miért hoztátok létre ezt a weboldalt?', this)">Miért hoztátok létre ezt a weboldalt?</button>
    <button class="chat-button" onclick="sendQuestion('Hogyan tudok saját eseményt feltölteni?', this)">Hogyan tudok saját eseményt feltölteni?</button>
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
  buttonElement.style.backgroundColor = "#FF3632"; // Pirossá válik
  buttonElement.disabled = true; // Letiltja a gombot, hogy ne lehessen újra kattintani
}

// Ha a felhasználó a modal ablak kívülre kattint
window.onclick = function (event) {
  const modal = document.getElementById('chat-modal');
  if (event.target === modal) {
    closeChat();
  }
}





