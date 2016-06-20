const DEFAULT_WAITING = ["waiting", "bored", "still", "wait", "mundane", "tired", "dull", "sleeping"];
const BETA_API_KEY = "dc6zaTOxFJmzC"
const GIPHY_RANDOM_SEARCH_URL = `https://api.giphy.com/v1/gifs/random?api_key=${BETA_API_KEY}&tag=`

chrome.storage.sync.get({
    gifType: "dancing",
}, function(options) {
    let gifType = gifTypeForQueue(options.gifType);
    $.ajax({
        url: `${GIPHY_RANDOM_SEARCH_URL}${URLForGifType(gifType)}`,
        success: function(result) {
            image_url = result.data.image_url;
            $('#side-panel').append(`
					<div class="container-fluid pane-frame track-mouse expanded" style="margin-top:20px;">
					<div class="row">
					<div class="col-xs-24 pane-header">
					<a title="collapse" class="collapse" href="#" onclick="document.getElementById('giphygif').style.display = document.getElementById('giphygif').style.display == 'none' ? 'block' : 'none'; return false">
					<img style="width: 16px; height: 16px; " alt="collapse" class="icon-collapse icon-sm" src="/static/1b6f1120/images/16x16/collapse.png">
					</a>
					<span id="giftitle">${gifType} gif</span>
          </div></div>
					<img id="giphygif" src='${image_url}' width=100%>
					</div>`);
        }
    });
    setInterval(function() {
        gifType = gifTypeForQueue(options.gifType);
        $.ajax({
            url: `${GIPHY_RANDOM_SEARCH_URL}${URLForGifType(gifType)}`,
            success: function(result) {
                image_url = result.data.image_url;
                $('#giphygif').attr('src', image_url);
                $('#giftitle').innerText = `${gifType} gif`;
            }
        });
    }, 11000);
});

function gifTypeForQueue(default_gif){
  return isBuildInQueue() ? randomWaitingWord() : default_gif;
}

function URLForGifType(gifword){
	return gifword.replace(" ", "+");
}

function randomWaitingWord(){
	return DEFAULT_WAITING[(Math.random() * DEFAULT_WAITING.length) | 0];
}

function isBuildInQueue() {
    return document.querySelector("#buildQueue .model-link") != null;
}