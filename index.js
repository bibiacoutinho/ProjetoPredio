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

function convertPMto24(hour) {
    if (hour.length <= 10) {
        let hour24 = parseInt(hour[0]) + 12
        hour = hour.split(":")
        let newHour = (String(hour24) + ":" + hour[1] + ":" + hour[2]).slice(0, 8)
        return newHour
    } else {
        if (hour.slice(0, 2) !== "12") {
            let hour24 = parseInt(hour.slice(0, 2)) + 12
            hour = hour.split(":")
            let newHour = (String(hour24) + ":" + hour[1] + ":" + hour[2]).slice(0, 8)
            return newHour
        }
        return hour.slice(0, 8)
    }
}

function formatTime(time) { 
    if (time.indexOf("PM") !== -1) {
        let timeForm = (convertPMto24(time)).slice(0,-3)
        return timeForm
    } else {
        let timeSplit = (time.slice(0, -3)).split(":")
        let timeForm = timeSplit[0] + ":" + timeSplit[1]
        return timeForm
    }
}

function isItSooner(time1, time2) {
    time1 = time1.split(":")
    time2 = time2.split(":")
    let d = new Date();
    let d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), time1[0], time1[1])
    let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), time2[0], time2[1])
    return d1 < d2
}

function timeNow() {
    let d = new Date();
    let m = String(d.getMinutes())
    let h = d.getHours()
    let time = "0"
    if (m.length == 1){
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

function apiGet(position){
    let lat = position?.coords.latitude
    let lng = position?.coords.longitude
    axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`)
   .then(function (response) {
     const { sunrise, sunset } = response.data.results;
     isItDay(sunrise, sunset)
     printFront(position, sunrise,sunset)
     return response.data;
   })
   .catch(function (error) {
     console.log(error);
   })
   .then(function () {
   });
}

function printFront(position,sunrise,sunset) {
    let latId = document.getElementById('lat');
    let lngId = document.getElementById('lng');
    let horaId = document.getElementById('horas');
    let sunriseId = document.getElementById('sunrise');
    let sunsetId = document.getElementById('sunset');
    horaId.innerHTML = timeNow()
    latId.innerHTML = position.coords.latitude
    lngId.innerHTML = position.coords.longitude
    sunriseId.innerHTML = sunrise
    sunsetId.innerHTML = sunset
}

function isItDay(sunrise,sunset) {
    let cenario = document.getElementById('principal');
    sunrise = formatTime(sunrise)
    sunset = formatTime(sunset)
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
