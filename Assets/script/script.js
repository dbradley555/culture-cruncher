let countryArray = JSON.parse(localStorage.getItem('countries')) || [];

// Event listener function for search button.
$('#searchBtn').on('click', function () {
  let countryInput = $('#countryInput');
  country = countryInput.val().trim();
  if (country === '') {
    $('.errorMsg').text('Please enter a country');
    countryInput.attr('style', 'border:1px solid #f02849;');
    $('.errorMsg').attr('style', 'color:red;');
    return;
  } else {
    $('.errorMsg').text('');
    countryInput.attr('style', 'border 1px solid #0000; color:black');
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
  let historyArray = countryArray.slice(0, 6); // Only holds 6 results at a time in the search history.
  console.log('updated array is ' + historyArray);
  $('.history').empty();
  for (let i = 0; i < historyArray.length; i++) {
    let listedCountry = $('<button>');
    listedCountry.text(historyArray[i]);
    listedCountry.addClass('m-1 p-2 btn btn-outline-dark rounded-0 listed');
    $('.history').prepend(listedCountry); // Creates and appends button element starting from the top of the Search History container.
    console.log('countries');
  }
  // If results history exceeds 6, overwrite oldest search.
  if (historyArray.length > 5) {
    console.log('limit reached');
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
  let countryPopCommas = data[0].population
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  countryName.text(data[0].name);
  countryContinent.text('Subregion: ' + data[0].subregion);
  countryCapital.text('Capital: ' + data[0].capital);
  countryLanguage.text('Languages: ' + data[0].languages[0].name);
  countryCurrency.text('Currency: ' + data[0].currencies[0].name);
  countryFlag.attr('src', data[0].flags.png);
  countryPopulation.text('Population: ' + countryPopCommas);

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
