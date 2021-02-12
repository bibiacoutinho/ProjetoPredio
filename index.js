//Controle das luzes
var int = 1
function controle() {
    if (int === 1) {
        int = int + 1
        for (let i = 1; i <= 12; i++) {
            j = document.getElementById(`${i}`)
            j.classList.remove("apagada")
            j.classList.add("acesa")
        }
    } else {
        int = int - 1
        for (let i = 1; i <= 12; i++) {
            j = document.getElementById(`${i}`)
            j.classList.remove("acesa")
            j.classList.add("apagada")
        }
    }
}

function janela(id) {
    let j = document.getElementById(id)
    if (j.className == "apagada") {
        j.classList.remove("apagada")
        j.classList.add("acesa")
    } else {
        j.classList.remove("acesa")
        j.classList.add("apagada")
    }
}

//Controle do cenário

function convertPMto24(hour) {      // FUNÇÃO OK retorna apenas hora convertida
    // hour = parâmetro
    //hour = "8:05:55 PM";
    if (hour.length <= 10) {
        let hour24 = parseInt(hour[0]) + 12
        hour = hour.split(":")
        let newHour = (String(hour24) + ":" + hour[1] + ":" + hour[2]).slice(0, 8)
        //console.log("newhour1: " + newHour)
        return newHour
    } else {
        if (hour.slice(0, 2) !== "12") {
            let hour24 = parseInt(hour.slice(0, 2)) + 12
            hour = hour.split(":")
            let newHour = (String(hour24) + ":" + hour[1] + ":" + hour[2]).slice(0, 8)
            //console.log("newhour2: " + newHour)
            return newHour
        }
        //console.log("retorna 12: "+(hour.slice(0,8)))
        return hour.slice(0, 8)
    }
}

function formatTime(time) {     // FUNÇÃO OK    converte sunrise ou sunset pra 24h (pra printar no front)
    if (time.indexOf("PM") !== -1) {
        let timeHour = convertPMto24(time)
        let timeSplit = (time.slice(0, -3)).split(":")
        let timeForm = timeHour + ":" + timeSplit[1]
        console.log(timeForm)
        return timeForm
    } else {
        let timeSplit = (time.slice(0, -3)).split(":")
        let timeForm = timeSplit[0] + ":" + timeSplit[1]
        console.log(timeForm)
        return timeForm
    }
}

function isItSooner(time1, time2) {   //FUNÇÃO OK retorna se h1 é mais cedo que h2
    time1 = time1.split(":")
    time2 = time2.split(":")

    //console.log("time1: "+ time1)
    //console.log("time2: "+ time2)

    let d = new Date();
    let d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), time1[0], time1[1])
    let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), time2[0], time2[1])

    //console.log(d1 < d2)
    return d1 < d2
}

function timeNow() {  //retorna hora em 24h
    let d = new Date();
    let m = String(d.getMinutes())
    let h = d.getHours()
    let time = "0"
    if (m.length = 1){
        time = h + ":0" + m
    } else {
        time = h + ":" + m
    }
    return time
}

function localUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(printFront);
        navigator.geolocation.getCurrentPosition(apiGet);
    } else {
        alert('Não foi possível pegar localização.');
    }
}

function printFront(position) {
    let latId = document.getElementById('lat');
    let lngId = document.getElementById('lng');
    let horaId = document.getElementById('horas');
    horaId.innerHTML = timeNow()
    latId.innerHTML = position.coords.latitude
    lngId.innerHTML = position.coords.longitude
}

function apiGet(position){
    let lat = position?.coords.latitude
    let lng = position?.coords.longitude
    axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`)
   .then(function (response) {
     // handle success
     //console.log(response.data);
     const { sunrise, sunset } = response.data.results;
     isItDay(sunrise, sunset)
     //console.log("sunrise: " + sunrise)
     //console.log("sunset: " + sunset)
     //console.log("timeNow: " + timeNow())
     //console.log(typeof response.data.sunrise);
     return response.data;
   })
   .catch(function (error) {
     // handle error
     console.log(error);
   })
   .then(function () {
     // always executed
   });
}

function isItDay(sunrise,sunset) {    //parâmetros = sunrise e sunset   //ou converte timeNow() para 00:00:00 AM
    let cenario = document.getElementById('principal');                 ////ou converte sunrise/sunset para 24h (mas aí tem que verificar a isItSooner)
    console.log("isItDay retorno sunrise: " + sunrise)
    console.log("isItDay retorno sunset: " + sunset)
    console.log("isItDay retorno timeNow(): "+timeNow())

    if (isItSooner(sunrise, timeNow()) && isItSooner(timeNow(), sunset)) {
        console.log("é dia")
        cenario.classList.remove("noite")
        cenario.classList.add("dia")
    } else {
        console.log("é noite")
        cenario.classList.remove("dia")
        cenario.classList.add("noite")
    }
}

localUser();
printFront();

//vai printar sunrise e sunset no front? se não, nem precisava do formatTime()
