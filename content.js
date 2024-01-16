window.addEventListener('load', function () {
  const findShortsElements = () => {
    return Array.from(
      document.querySelectorAll('ytd-rich-shelf-renderer')
    ).filter((element) => {
      return (
        element.querySelector('span#title') &&
        element.querySelector('span#title').textContent.includes('Shorts')
      );
    });
  };

  const hideShorts = () => {
    chrome.storage.sync.get('hideShorts', function (data) {
      const hide = data.hideShorts;
      findShortsElements().forEach((element) => {
        element.style.display = hide ? 'none' : '';
      });
    });
  };

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

  const intervalId = setInterval(() => {
    const elements = findShortsElements();
    if (elements.length > 0) {
      hideShorts();
      clearInterval(intervalId);
    }
  }, 100);
});
