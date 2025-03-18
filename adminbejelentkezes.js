var admin_felhasznalonev=""
var admin_jelszo=""


const bejelentkezes_ellenorzese=()=>{
    admin_felhasznalonev=document.getElementById("admin_felhasznalonev_input").value;
    admin_jelszo=document.getElementById("admin_jelszo_input").value;
    bejelentkezes()
}

const bejelentkezes = async () => {
    try{
        let response= await fetch("http://localhost:3000/adminBejelentkezes",{
            method: "POST",
            body: JSON.stringify({
                "admin_felhasznalonev":admin_felhasznalonev,
                "admin_jelszo":admin_jelszo
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        let data=await response.json();
        
        if(response.ok && data.token){
            localStorage.setItem('adminToken',data.token);
            window.location.href="visszajelzesek.html";
        } else{
            document.getElementById("hiba_uzenet").innerHTML ="Hibás felhasználó név vagy jelszó!";
            document.getElementById("hiba_uzenet").style.color = "red";
        }
    } catch(error){
        console.error("Hiba a bejelentkezés során: ",error);
        document.getElementById("hiba_uzenet").innerHTML="Hibás felhasználó név vagy jelszó!";
        document.getElementById("hiba_uzenet").style.color = "red";
    }
}