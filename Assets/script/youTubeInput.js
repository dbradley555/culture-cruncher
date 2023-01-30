const historyVideo = $('.history')
historyVideo.on('click', getVideoBtn);

function getHistoryVideo(event) {
    videoDisplay.css('display', 'none');
    $(videoDisplay).empty();
  
    let countryInput = $(".history").value = event.target.textContent
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