function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var main = document.getElementById('main');
    

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
        main.style.marginLeft = '0';
        
    } else {
        sidebar.style.width = '250px';
        main.style.marginLeft = '250px';
      
    }
}
function expandSection() {
    var openBtn = document.getElementById('openBtn');
if (openBtn.style.width === '120px') {
    openBtn.style.width = '200px';
} else {
    openBtn.style.width = '120px';
}
}

function salvaJSON() {
    let nome = document.getElementById("nome").value;
    let password = document.getElementById("myInput").value;
    let città = document.getElementById("city").value;
        if(nome == "" || password == ""|| città == ""){
            alert("devi compilare tutti campi");
        }
        else{
            let utenti = {
                "nome": nome,
                "password": password  
            };
            let city = città;
            localStorage.setItem("citta", city);
            var jsonString = JSON.stringify(utenti);
                localStorage.setItem("datiUtente", jsonString);
                console.log("Dati salvati:", jsonString);
                alert("dati salvati");
                window.location.href = "index.html";
                inviaDatiAlBackend(datiJSON);

                var name = document.getElementById("name").value;
                var location = document.getElementById("location").value;
        }
    }
$(document).ready(function() {
    $('#submitButton').click(function(){
        var inputCity = $('#cityInput').val();
        var weatherType = $('#weatherType').val();
        
        var apiUrl = '';
        if (weatherType === 'current') {
            apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputCity+'&appid=50a7aa80fa492fa92e874d23ad061374&units=metric';
        } else if (weatherType === 'forecast') {
            apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputCity+'&appid=50a7aa80fa492fa92e874d23ad061374&units=metric';
        }

        fetch(apiUrl)
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                if (weatherType === 'current') {
                    displayCurrentWeather(data);
                } else if (weatherType === 'forecast') {
                    displayForecast(data);
                }
                $('#cityInput').val('');
            })
            .catch(error => {
                handleError(error);
            });
    });
});

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function displayCurrentWeather(data) {
    var cityName = data['name'];
    var tempValue = data['main']['temp'];
    var descValue = data['weather'][0]['description'];
    $('#name').text("Meteo per " + cityName);
    $('.desc').text("Descrizione: " + descValue);
    $('.temp').text("Temperatura: " + tempValue + "°C");
    $('.forecast').empty();
}

function displayForecast(data) {
    var cityName = data['city']['name'];
    $('#name').text("Meteo per " + cityName);
    $('.desc').empty();
    $('.temp').empty();
    $('.forecast').empty();
    var groupedForecast = groupForecastByDay(data.list);
    groupedForecast.forEach(dayForecast => {
        var dayElement = $('<div class="day-forecast">');
        var dayHeader = $('<h3>').text(dayForecast.date);
        dayElement.append(dayHeader);
        dayForecast.forecasts.forEach(forecast => {
            var forecastItem = $('<p>').text("Ore " + forecast.time + ": " + forecast.temp + "°C, " + forecast.desc);
            dayElement.append(forecastItem);
        });
        $('.forecast').append(dayElement);
    });
}

function groupForecastByDay(forecastList) {
    var groupedForecast = {};
    forecastList.forEach(forecast => {
        var dateTime = new Date(forecast.dt * 1000);
        var dateKey = dateTime.toLocaleDateString();
        if (!groupedForecast[dateKey]) {
            groupedForecast[dateKey] = [];
        }
        groupedForecast[dateKey].push({
            time: dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            temp: forecast.main.temp,
            desc: forecast.weather[0].description
        });
    });

    var result = [];
    for (var date in groupedForecast) {
        result.push({
            date: date,
            forecasts: groupedForecast[date]
        });
    }
    return result;
}

function handleError(error) {
    alert("Si è verificato un errore nella richiesta: " + error.message);
    console.log(error);
}
;


// Funzioni per gestire il popup
function openPopup() {
    document.getElementById("popup").style.display = "flex";
    setTimeout(closePopup, 5000); // Chiude automaticamente dopo 5 secondi
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}


   function salvaJSON() {
    let nome = document.getElementById("nome").value;
    let password = document.getElementById("myInput").value;
    let città = document.getElementById("city").value;
    if (nome == "" || password == "" || città == "") {
      alert("devi compilare tutti campi");
      return false;
    } else {
      // Costruisci la stringa di query con i parametri
      let queryString = `?nome=${nome}&citta=${città}`;  
      window.location.href = "index.html" + queryString; // Redirect con parametri
      return true;
    }
  }