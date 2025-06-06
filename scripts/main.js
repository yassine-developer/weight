const prenom = document.querySelector("#prenom");
const dateNaissance = document.querySelector("#date");
const poids = document.querySelector("#poids");
const taille = document.querySelector("#taille");
const button = document.querySelector("btn-acceille");

function displayGraphe(){
    const ctx = document.querySelector("#myChart").getContext("2d");
    if(window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new chart(ctx,{
        type:line,
        data : {
            labels:jours,
            datasets:[{
                label:"poids(en kg)",
                data : poids,
                borderColor: 'rgba(75, 192, 192, 1)'
            }]
        }
    })
}

button.addEventListener('click', () => {
    const data = [{prenom :prenom.value,date:dateNaissance.value, poids:poids.value,taille:taille.value}];
    localStorage.setItem("infoUser",data);
})