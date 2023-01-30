const historyVideo = $('.history');
historyVideo.on('click', getHistoryVideo);

function getHistoryVideo(event) {
  videoDisplay.css('display', 'none');
  $(videoDisplay).empty();

  historyVideo.value = event.target.textContent;
  console.log('YOUTUBE API CALL');

  $.ajax({
    type: 'GET',
    url: ytURL,
    data: {
      key: ytAPIKey,

      q: `Popular food in ${historyVideo.value}`,

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
