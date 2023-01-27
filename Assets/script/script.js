let countryArray = JSON.parse(localStorage.getItem('countries')) || [];

// Event listener function for search button.
$('#searchBtn').on('click', function () {
  let countryInput = $('#countryInput');
  country = countryInput.val().trim();
  if (country === '') {
    countryInput.attr('placeholder', '*City cannot be empty*');
    return;
  } else {
    countryArray.push(country);
    localStorage.setItem('countries', JSON.stringify(countryArray));
    displayHistory();
    countryInput.val('');
  }
  fetchCulture(country);
});

//  Clears the the search history list
$('#clearBtn').on('click', function () {
  localStorage.clear();
  countryArray = [];
  $('.history').empty();
});

//click funtion from the serach history list when the selected list item is clicked
$('.history').on('click', function (event) {
  event.preventDefault();
  console.log(($('.history').value = event.target.textContent));
  fetchCulture(($('.history').value = event.target.textContent));
});

function displayHistory() {
  // filters cityArray to only display the most recent searches
  let historyArray = countryArray.reverse().slice(0, 6);
  console.log('updated array is ' + historyArray);
  $('.history').empty();
  for (let i = 0; i < historyArray.length; i++) {
    let listedCountry = $('<button>');
    listedCountry.text(historyArray[i]);
    listedCountry.addClass('m-1 p-2 btn btn-outline-dark rounded-0 listed');
    $('.history').append(listedCountry);
  }
}
function fetchCulture(country) {
  // Creates API call for inputed country
  let restURL = 'https://restcountries.com/v2/name/' + country;

  fetch(restURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cultureDisplay(data);
    });
}

function cultureDisplay(data) {
  $('#cultureDisplay').empty();

  let countryName = $('<h3>');
  let countryContinent = $('<p>');
  let countryCapital = $('<p>');
  let countryLanguage = $('<p>');
  let countryCurrency = $('<p>');
  let countryFlag = $('<img>');
  let countryPopulation = $('<p>');

  countryName.text(data[0].name.common);
  countryContinent.text('Continent: ' + data[0].continent);
  countryCapital.text('Capital: ' + data[0].capital);
  countryLanguage.text('Languages: ' + data[0].languages[0].name);
  countryCurrency.text('Currency: ' + data[0].currencies[0].name);
  countryFlag.attr('src', data[0].flags.png);
  countryPopulation.text('Population: ' + data[0].population);

  $('#cultureDisplay').append(
    countryName,
    countryFlag,
    countryContinent,
    countryCapital,
    countryLanguage,
    countryCurrency,
    countryPopulation
  );
}

// function fetchVideo(country){
//     let youtubeKey = AIzaSyBebX8RUr7J4vhMZF9vetbGgSKadOyS8z4;
//     let youtubeURL =

// }

displayHistory();
