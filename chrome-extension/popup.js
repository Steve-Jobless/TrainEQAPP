function listenClick() {
  const button = document.getElementById('power-btn');
  button.addEventListener('click', event => {
    // if event.target.innerText === 'start' {
    if (event.target.innerText === 'Start') {
      // const $test = 1
      chrome.tabs.executeScript({
        file: 'scripts/monitoring.js'
      });
      // event.target.innerText = 'End'
    }

    // starting things
    // } else {

    // execute a file, which send end post request to rails
   else {
      chrome.tabs.executeScript({
        file: 'scripts/end-meeting.js'
      });
      // event.target.innerText = 'Start'
    }
  })
}
listenClick();
