// Saves options to chrome.storage
function save_options() {
  var gif_type = document.getElementById('gif_type').value;

  chrome.storage.sync.set({
    gifType: gif_type,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Gif Type saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  //all enabled by default
  chrome.storage.sync.get({
    gifType: "dancing",
  }, function(enabled) {
    document.getElementById('gif_type').value = enabled.gifType;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);