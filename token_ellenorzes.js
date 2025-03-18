//tokenek ellenörzése
const token=localStorage.getItem('adminToken');

//ha nincs token
if(!token){
    window.location.href="fooldal.html";//a főoldalra fogja vinni

}
else{
    console.log("Token letezik be vagy jelentkezve")
}
//kijelentkezes
document.getElementById('kijelentkezes').addEventListener('click',(e)=> {
    e.preventDefault();
    localStorage.removeItem('adminToken');

    window.location.href='fooldal.html';
});

