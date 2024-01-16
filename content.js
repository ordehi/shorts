window.addEventListener('load', function () {
  const hideShorts = (hide) => {
    document.querySelectorAll('ytd-rich-shelf-renderer').forEach((element) => {
      if (
        element.querySelector('span#title') &&
        element.querySelector('span#title').textContent.includes('Shorts')
      ) {
        element.style.display = hide ? 'none' : '';
      }
    });
  };

  chrome.storage.sync.get('hideShorts', function (data) {
    if (data.hideShorts) {
      hideShorts(data.hideShorts);
    }
  });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    hideShorts(request.hideShorts);
  });

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  window.addEventListener('scroll', debounce(hideShorts, 300));
});
