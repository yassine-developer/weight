// les variables
const prenom = document.querySelector("#prenom");
const dateNaissance = document.querySelector("#date");
const poids = document.querySelector("#poids");
const taille = document.querySelector("#taille");
const button = document.querySelector("#btn-acceuille");
const envoyer = document.querySelector(".btn-ajouter");
const reset = document.querySelector(".btn-reset");
const newpoids = document.querySelector("#newpoids");
const nomaffiche = document.querySelector("#helloname")
const lastWeight = document.querySelector("#lastWeight");
const bmi = document.querySelector("#bmi");
const bmitext = document.querySelector("#verdict");
const login = document.querySelector(".login");
const agecalcule = document.querySelector("#agecalculé");

const userData = [];
const weightdata = [];
const jours = [];
let i = 1;

// les fonctions

function sauvegarderDansLocalStorage() {
    const dataToStore = {
        userData: userData,
        weightdata: weightdata,
        jours: jours
    };
    localStorage.setItem("appData", JSON.stringify(dataToStore));
}

function calculerBmi(taille, poids) {
    return (poids / ((taille / 100) * (taille / 100))).toFixed(2);
}

function calculerage(date) {
    const dateNaissance = new Date(date);
    const dateactuel = new Date();
    let age = dateactuel.getFullYear() - dateNaissance.getFullYear();
    if (dateactuel.getMonth() < dateNaissance.getMonth()) {
        age--;
    } else if (dateactuel.getMonth() === dateNaissance.getMonth() && dateactuel.getDate() < dateNaissance.getDate()) {
        age--;
    } else {
        return age;
    }
}

function dernierpoids() {
    return weightdata[weightdata.length - 1];
}

function evaluerbmi(bmi) {
    if (bmi < 16.5) { return "Famine" };
    if (bmi < 18.5) { return "Maigreur" };
    if (bmi < 25) { return "Corpulence normale" };
    if (bmi < 30) { return "Surpoids" };
    if (bmi < 35) { return "Obésité modérée" };
    if (bmi < 40) { return "Obésité sévère" };
    return "Obésité morbide";
}


function displayGraphe() {
    console.log(weightdata);
    console.log(jours);
    const ctx = document.querySelector("#myChart").getContext("2d");
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: jours,
            datasets: [{
                label: "poids(en kg)",
                data: weightdata,
                borderColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            responsive: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'jour'
                    }
                },
                y: {
                    min: 0,
                    title: {
                        display: true,
                        text: 'indice de masse'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// les events listener

button.addEventListener('click', (e) => {
    e.preventDefault();
    login.classList.add("active");
    // sauvegarde des donnees utilisateur et mise a jour des mes variable : userData, weightdata, jours.
    userData.push({ prenom: prenom.value, date: dateNaissance.value, poids: poids.value, taille: taille.value });
    jours.push(`jour ${i}`);
    weightdata.push(poids.value);
    // remplissage  des champs
    nomaffiche.textContent = `${userData[0].prenom}`;
    lastWeight.textContent = `${userData[0].poids}`;
    bmi.textContent = `${calculerBmi(userData[0].taille, userData[0].poids)}`;
    bmitext.textContent = `${evaluerbmi(calculerBmi(userData[0].taille, weightdata[weightdata.length - 1]))}`;
    console.log(calculerBmi(userData[0].taille), weightdata[weightdata.length - 1]);
    agecalcule.textContent = `${calculerage(userData[0].date)}`;
    displayGraphe();
    sauvegarderDansLocalStorage();
});



envoyer.addEventListener('click', () => {
    // mise a jour des varible: i, jours, weightdata.
    i++;
    jours.push(`jour ${i}`);
    weightdata.push(newpoids.value);
    // affichage des champs
    lastWeight.textContent = `${dernierpoids()}`;
    bmi.textContent = `${calculerBmi(userData[0].taille, weightdata[weightdata.length - 1])}`;
    bmitext.textContent = `${evaluerbmi(calculerBmi(userData[0].taille, weightdata[weightdata.length - 1]))}`;
    console.log(calculerBmi(userData[0].taille), weightdata[weightdata.length - 1]);
    displayGraphe();
    sauvegarderDansLocalStorage();
})

reset.addEventListener('click',()=>{
    // on vide le local storage.
    localStorage.removeItem("appData");
    // reinitialise les variables
    userData.length = 0;
    weightdata.length = 0;
    jours.length = 0;
    i=1;

    // on vide le formulaire
    prenom.value = "";
    dateNaissance.value = "";
    poids.value = "";
    taille.value = "";
    newpoids.value = "";
    // on remet le login
    login.classList.remove("active");
    // on vide les champs pour l'age le bmi et le dernier poids
    nomaffiche.textContent = "";
    bmi.textContent = "";
    bmitext.textContent = "";
    lastWeight.textContent = "";
    agecalcule.textContent = "";
    //on detruit le graphe
     if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
})

//gestion du refresh de la page

window.onload = () => {
    const storedData = JSON.parse(localStorage.getItem("appData"));

    if (storedData) {
        userData.push(...storedData.userData);
        weightdata.push(...storedData.weightdata);
        jours.push(...storedData.jours);

        login.classList.add("active");

        // Affichage des infos récupérées
        lastWeight.textContent = `${dernierpoids()}`;
        bmi.textContent = `${calculerBmi(userData[0].taille, dernierpoids())}`;
        bmitext.textContent = `${evaluerbmi(calculerBmi(userData[0].taille, dernierpoids()))}`;
        agecalcule.textContent = `${calculerage(userData[0].date)}`;
        displayGraphe();
    }
}

