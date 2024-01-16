window.addEventListener('load', function () {
  const hideShorts = () => {
    chrome.storage.sync.get('hideShorts', function (data) {
      const hide = data.hideShorts;
      document
        .querySelectorAll('ytd-rich-shelf-renderer')
        .forEach((element) => {
          if (
            element.querySelector('span#title') &&
            element.querySelector('span#title').textContent.includes('Shorts')
          ) {
            element.style.display = hide ? 'none' : '';
          }
        });
    });
  };

  hideShorts();

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    hideShorts();
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
