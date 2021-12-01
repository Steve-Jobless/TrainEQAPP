function listenClick() {
  const button = document.getElementById('power-btn');
  button.addEventListener('click', event => {
    // if event.target.innerText === 'start' {
    if (event.target.innerText === 'Start') {
      // const $test = 1
      chrome.tabs.executeScript({
        file: 'scripts/monitoring.js'
      });
    }

  })
}
function listenClick_two() {
  const end_button = document.getElementById('end-btn');
  end_button.addEventListener('click', event => {
    // if event.target.innerText === 'start' {
    if (event.target.innerText === 'End') {
      // const $test = 1
      chrome.tabs.executeScript({
        file: 'scripts/end-meeting.js'
      });
      // Tentatively connect to local
      // window.open("http://www.traineq.site/dashboard");
      window.open("http://localhost:3000/dashboard");
    }
  })
}

listenClick();
listenClick_two();
