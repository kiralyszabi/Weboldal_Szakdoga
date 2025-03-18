fetch("http://localhost:3000/elfogadvamegjelenitve")
    .then(x => x.json())
    .then(v => megjelenit(v))


function megjelenit(v) {
    for (const elem of v) {
        document.getElementById("elfogadvavelemenyek").innerHTML += `
                <div class="col-sm-4" style="margin-bottom: 50px;">
                <div class="formazas">
                <br>
                <i>"${elem.uzenet}"</i>
                <br>
                <strong>-${elem.nev}-</strong>
                </div>  
            </div>

    `

    }


}