const ytAPIKey = config.youtubeAPIKey;
const ytURL = 'https://www.googleapis.com/youtube/v3/search';
const videoDisplay = $('#videoDisplay');
const searchBtn = $('#searchBtn');

// event listener
searchBtn.on('click', getYoutubeVideo);

// FUNCTIONS TO EMBED A YOUTUBE VIDEO - NEEDS TO BE LINKED TO THE SEARCH TERM

function getYoutubeVideo() {
  videoDisplay.css('display', 'none');
  $(videoDisplay).empty();

  let countryInput = $('#countryInput');
  country = countryInput.val().trim();

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

// Function that embeds YouTube video
function embedVideo(data) {
  let dataTitle = data.items[0].snippet.title;
  let dataVideoID = data.items[0].id.videoId;
  const videoEl = $('<iframe>');
  const videoTitle = $('<h5>');
  videoTitle.addClass('video');
  videoTitle.text(dataTitle);
  videoEl.attr('allowFullScreen', '');
  videoEl.attr('width', '100%');
  videoEl.attr('height', '100%');
  videoEl.attr('src', `https://www.youtube.com/embed/${dataVideoID}`);
  videoDisplay.css('display', 'inline');
  videoDisplay.append(videoTitle);
  videoDisplay.append(videoEl);
}
