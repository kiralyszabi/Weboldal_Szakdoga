function indul(){


    fetch("http://localhost:3000/visszajelzesek")
    .then(x => x.json())
    .then(y => megjelenit(y))




}
function megjelenit(y) {
    console.log(y)
    document.getElementById("visszaj").innerHTML=""
    for (const elem of y) {
        document.getElementById("visszaj").innerHTML += `
        
        <div class="col-sm-4">
        <div class=adatok>
        <strong>Név: </strong>${elem.nev}
        <br>
        <strong>Email: </strong>${elem.email}
        <br>
        <strong>Üzenete: </strong><i>${elem.uzenet}</i>
        <br>
        <button id="${elem.kapcsolat_id}" onclick="torles(this.id)"><span style="color: red;">Törlés</span></button>
        <button  onclick="elfogadas(${elem.kapcsolat_id})"><span style="color: green;">Elfogadás</span></button>
        </div>
        <br>
        </div>
        
        
        `

    }


}

function  elfogadas(parameter){

    var adatok = {
        "bevitel1": parameter
    };
    

    fetch("http://localhost:3000/elfogadvauzenetek", {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.text())
    .then(szoveg => {
        if (szoveg=="Sikeres") {
            alert("Az üzenet sikeresen felvéve");
            indul()
        } else {
            alert("Hiba");
        }
    })
}





function torles(parameter){
    

 const biztos = confirm("Biztosan törli az üzenetet?");

    if (biztos) {
        var adatok = {
            "bevitel1": parameter
        };

    fetch("http://localhost:3000/visszajelzestorles", {
        method: "DELETE",
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.text())
    .then(szoveg => {
        if (szoveg=="Sikeres") {
            alert("Az üzenet sikeresen törölve!");
            indul()
        } else {
            alert("Hiba történt a törlés során!");
        }
    })
    .catch(error => {
        console.error("Hiba történt a törlés során:", error);
        alert("Hiba történt a törlés során!");
    });
} else {
    // Ha a felhasználó a "Nem" gombra kattintott, akkor nem történik semmi
    alert("A törlés nem történt meg.");
}
}

indul();

