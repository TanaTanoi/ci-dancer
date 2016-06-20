const DEFAULT_WAITING = ["waiting", "bored", "still", "wait", "mundane", "tired", "dull"];
chrome.storage.sync.get({
    gifType: "dancing",
}, function(options) {
    let gifType = options.gifType;
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${gifTypeForURL(gifType)}`,
        success: function(result) {
            image_url = result.data.image_url;
            $('#side-panel').append(`
					<div class="container-fluid pane-frame track-mouse expanded" style="margin-top:20px;">
					<div class="row">
					<div class="col-xs-24 pane-header">
					<a title="collapse" class="collapse" href="#" onclick="document.getElementById('giphygif').style.display = document.getElementById('giphygif').style.display == 'none' ? 'block' : 'none'; return false">
					<img style="width: 16px; height: 16px; " alt="collapse" class="icon-collapse icon-sm" src="/static/1b6f1120/images/16x16/collapse.png">
					</a>
					${gifType} gif</div></div>
					<img id="giphygif" src='${image_url}' width=100%>
					</div>`);
        }
    });
    setInterval(function() {
        gifType = gifTypeForURL(options.gifType);
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${gifType}`,
            success: function(result) {
                image_url = result.data.image_url;
                $('#giphygif').attr('src', image_url);
            }
        });
    }, 11000);
});

function gifTypeForURL(default_gif){
	return isBuildInQueue() ? randomWaitingWord() : default_gif.replace(" ", "+");
}

function randomWaitingWord(){
	return DEFAULT_WAITING[(Math.random() * DEFAULT_WAITING.length) | 0];
}

function isBuildInQueue() {
    return document.querySelector("#buildQueue .model-link") != null;
}