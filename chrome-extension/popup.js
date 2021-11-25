function listenClick() {
  const button = document.getElementById('launch-btn');
  button.addEventListener('click', () => {
    chrome.tabs.executeScript({
      file: 'scripts/monitoring.js'
    });
  })
}

listenClick();
