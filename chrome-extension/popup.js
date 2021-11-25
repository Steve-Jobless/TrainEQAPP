function listenClick() {
  const button = document.getElementById('power-btn');
  button.addEventListener('click', () => {
    chrome.tabs.executeScript({
      file: 'scripts/monitoring.js'
    });
  })
}

listenClick();
