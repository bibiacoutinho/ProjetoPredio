//Requisições API
const latId = document.getElementById('lat');
const lngId = document.getElementById('lng');
var horaId = document.getElementById('horas');
var cenario = document.getElementById('principal');

// latitude: -23.1793431
// longitude: -45.8754657

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

function formatTime(time) {     // FUNÇÃO OK    time(é parâmetro da função) = sunrise ou sunset
    //let time = "7:27:02 AM"
    if (time.indexOf("PM") !== -1){
        let timeHour = convertPMto24(time)
        let timeSplit = (time.slice(0,-3)).split(":")
        let timeForm = timeHour + ":" + timeSplit[1]
        //console.log(timeForm)
        return timeForm
    } else {
        let timeSplit = (time.slice(0,-3)).split(":")
        let timeForm = timeSplit[0] + ":" + timeSplit[1]
        //console.log(timeForm)
        return timeForm
    }
}

function isItSooner(time1, time2){   //FUNÇÃO OK retorna se h1 é mais cedo que h2
    time1 = time1.split(":")
    time2 = time2.split(":")

    let d = new Date();
    let d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), time1[0], time1[1])
    let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), time2[0], time2[1])

    //console.log(d1 < d2)
    return d1 < d2
}

function isItDay(){    //parâmetros = sunrise e sunset        função meio ok -> não muda cor do cenario
    let sunrise = formatTime("7:27:02 AM")
    let sunset = formatTime("5:05:02 AM")
    //let d = new Date();
    //let timeNow = d.getHours() + ":" + d.getMinutes;
    let timeNow = "1:24"

    if (isItSooner(sunrise,timeNow) && isItSooner(timeNow,sunset)){
        console.log("é dia")
        cenario.classList.remove("noite")
        cenario.classList.add("dia")
    } else {
        console.log("é noite")
        cenario.classList.remove("dia")
        cenario.classList.add("noite")
    }
}

isItDay();

//--------------------------------------------------------------------------------

// function BuscaLatLng(){
//     if ('geolocation' in navigator){
//         navigator.geolocation.getCurrentPosition(function(position){
//             console.log('latitude: '+ position.coords.latitude);
//             console.log('longitude: '+ position.coords.longitude);
//             console.log(position.coords)
//             return position.coords;
//         }, function(error){
//             console.log(error);
//         })
//     } else {
//         alert('Não foi possível pegar localização.');
//     }
// }

// function apiGet(){
//     axios.get(`https://api.sunrise-sunset.org/json?lat=-23.1793431&lng=-45.8754657`)
//    .then(function (response) {
//      // handle success
//      console.log(response.data);
//      console.log(typeof response.data.sunrise);
//      return response.data;
//    })
//    .catch(function (error) {
//      // handle error
//      console.log(error);
//    })
//    .then(function () {
//      // always executed
//    });
// }

// apiGet();

// function LocalUser(){
//     la = BuscaLatLng().latitude;
//     lo = BuscaLatLng().longitude;
//     console.log(la);
//     console.log(lo);
// }



// function InformaLatLng(){
//     latId.innerHTML = BuscaLatLng().coords.latitude;
//     lngId.innerHTML = BuscaLatLng().coords.longitude;
// }




//latitude: -23.1793431
//longitude: -45.8754657
//  function fazGet(url){
//      let request = new XMLHttpRequest();
//      request.open('GET', url, false);
//      request.send();
//      return request.responseText;
//  }

//  function main(){
//      data = fazGet("https://api.sunrise-sunset.org/json?lat=-23.1793431&lng=-45.8754657");
//      u = JSON.parse(data);
//      console.log(u);
//  }

//--------------------------------------------------------------------------------

//*******************************Controle de janelas*******************************

// let int = 1
// function controle() {
//     if (int === 1) {
//         int = int + 1
//         for (let i = 1; i <= 12; i++) {
//             j = document.getElementById(`${i}`)
//             j.classList.remove("apagada")
//             j.classList.add("acesa")
//         }
//     } else {
//         int = int - 1
//         for (let i = 1; i <= 12; i++) {
//             j = document.getElementById(`${i}`)
//             j.classList.remove("acesa")
//             j.classList.add("apagada")
//         }
//     }
// }

//  function janela(id){
//      let j = document.getElementById(id)
//      if(j.className == "apagada"){
//          j.classList.remove("apagada")
//          j.classList.add("acesa")
//      } else{
//          j.classList.remove("acesa")
//          j.classList.add("apagada")
//      }
//  }
