let countryArray = JSON.parse(localStorage.getItem('countries')) || [];

// Event listener function for search button.
$('#searchBtn').on('click', function () {
  let countryInput = $('#countryInput');
  country = countryInput.val().trim();
  if (country === '') {
    // $('.errorMsg').text('Please enter a country');
    countryInput.attr('style', 'border:1px solid #f02849;');
    countryInput.attr('placeholder', 'Please enter a country');
    return;
  } else {
    $('.errorMsg').text('');
    countryInput.attr('style', 'border 1px solid #0000; color:black');
    countryArray.unshift(country);
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
  $('#flag').empty();
  $('#countryName').empty();
  $('#factList').empty();

});

//click function from the serach history list when the selected list item is clicked
$('.history').on('click', function (event) {
  event.preventDefault();
  // console.log(($('.history').value = event.target.textContent));
  fetchCulture(($('.history').value = event.target.textContent));
});

function displayHistory() {
  // filters cityArray to only display the most recent searches
  let historyArray = countryArray.slice(0, 8); // Only holds 6 results at a time in the search history.
  console.log('updated array is ' + historyArray);
  $('.history').empty();
  for (let i = 0; i < historyArray.length; i++) {
    let listedCountry = $('<button>');
    listedCountry.text(historyArray[i]);
    listedCountry.addClass('list black-text');
    $('.history').append(listedCountry); // Creates and appends button element starting from the top of the Search History container.
    console.log('countries');
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
  $('#flag').empty();
  $('#countryName').empty();
  $('#factList').empty();

  let countryName = $('<h4>');
  let countryContinent = $('<p>');
  let countryCapital = $('<p>');
  let countryLanguage = $('<p>');
  let countryCurrency = $('<p>');
  let countryFlag = $('<img>');
  let countryPopulation = $('<p>');
  let countryPopCommas = data[0].population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  countryName.text(data[0].name);
  countryContinent.text('Region: ' + data[0].subregion);
  countryCapital.text('Capital: ' + data[0].capital);
  countryLanguage.text('Languages: ' + data[0].languages[0].name);
  countryCurrency.text('Currency: ' + data[0].currencies[0].name);
  countryFlag.attr('src', data[0].flags.png);
  countryPopulation.text('Population: ' + countryPopCommas);

  $('#flag').append(countryFlag,);
  $('#countryName').append(countryName);

  $('#factList').append(
    countryContinent,
    countryCapital,
    countryLanguage,
    countryCurrency,
    countryPopulation
  );
}

// Random country selector when button is clicked

$('#randomBtn').click(randomGenerator);

function randomGenerator() {
  const country_list = [
    'Afghanistan',
    'Åland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bonaire',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos',
    'Colombia',
    'Comoros',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    "Côte d'Ivoire",
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea',
    'Kuwait',
    'Kyrgyzstan',
    'Lao',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'North Macedonia',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Réunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Türkiye',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Viet Nam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  let country = country_list[Math.floor(Math.random() * country_list.length)];

  console.log(country);
  fetchCulture(country);
  countryArray.unshift(country);
  localStorage.setItem('countries', JSON.stringify(countryArray));
  displayHistory();

  videoDisplay.css('display', 'none');
  $(videoDisplay).empty();

  $.ajax({
    type: 'GET',
    url: ytURL,
    data: {
      key: ytAPIKey,

      q: `Popular food in ${country}`,

      part: 'snippet',
      maxResults: 1,
      type: 'video',
      videoEmbeddable: true,
      allowFullScreen: true,
    },
    success: function (data) {
      embedVideo(data);
    },
    error: function (response) {
      console.log('Request Failed');
    },
  });
}

displayHistory();
