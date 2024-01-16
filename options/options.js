document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('hideShorts', function (data) {
    document.getElementById('hide-shorts-checkbox').checked = data.hideShorts;
  });
});

document
  .getElementById('hide-shorts-checkbox')
  .addEventListener('change', function () {
    var hideShorts = this.checked;
    chrome.storage.sync.set({ hideShorts: hideShorts }, function () {
      console.log('Options saved');
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { hideShorts: hideShorts });
    });
  });
