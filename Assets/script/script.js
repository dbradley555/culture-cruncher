function loadPage() {
  let city;
  let cityArray = JSON.parse(localStorage.getItem('cities')) || [];
  // Creates API call Key for inputed City
  const APIKey = '851f848d274c31bfc439d660f647c15c';
  let APICall =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    APIKey;

  // Event listener function for search button.
  $('#searchBtn').on('click', function () {
    let cityInput = $('#cityInput');
    city = cityInput.val().trim();
    if (city === '') {
      return;
    }
    cityArray.push(city);
    localStorage.setItem('cities', JSON.stringify(cityArray));
    displayHistory();
    location.reload();
  });

  //  Clears the the search history list
  $('#clearBtn').on('click', function () {
    localStorage.clear();
    cityArray = [];
    displayHistory();
    location.reload();
  });

  function displayHistory() {
    $('.history').innerHTML = '';
    for (let i = 0; i < cityArray.length; i++) {
      let listedCity = $('<button>');
      listedCity.text(cityArray[i]);
      listedCity.addClass('p-2 btn btn-light rounded-0 d-block');
      listedCity.on('click', function () {
        fetchWeather(listedCity.val());
      });
      $('.history').append(listedCity);
    }
  }

  displayHistory();
  if (cityArray.length > 0) {
    fetchWeather(cityArray[cityArray.length - 1]);
  }
  function fetchWeather() {}
}

loadPage();

// // displays the searched city into search History
// function displayHistory() {
//     let searchHistory = $(".history");
//     // searchHistory.innerHTML = "";

//     for (let i = 0; i < cityArray.length; i++) {
//         let city = cityArray[i];
//         let listedCity = $("<button>").text(city).addClass("p-2 btn btn-light rounded-0 d-block");

//         searchHistory.append(listedCity)
//     };
// };

// // saves the searched city into the local storage
// function saveSearch(){
//     localStorage.setItem("cityArray", JSON.stringify(cityArray));
//     displayHistory();
// }

// function load() {
//     let storedHistory = JSON.parse(localStorage.getItem("cityArray")) || [];

//     if (storedHistory !== null) {
//         cityArray = storedHistory;
//     }
//     displayHistory();
// }

// // Event listener function for search button.
// $("#searchBtn").on('click',function(event){
//     event.preventDefault();
//     let cityField = $("#cityInput");
//     cityInput = cityField.val().trim();

//     if (cityInput === "") {
//         return;
//       }
//     cityArray.push(cityInput);
//     cityField.val("");

//     saveSearch();
//     displayHistory();
// });

// // Clears the the search history list
// $("#clearBtn").on("click", function(){
//     localStorage.clear();
//     let cityArray = [];
//     location.reload();
// });

// load();
