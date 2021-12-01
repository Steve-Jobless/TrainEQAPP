// function listenClick() {
//   const button = document.getElementById('power-btn');
//   button.addEventListener('click', event => {
//     // if event.target.innerText === 'start' {
//     if (event.target.innerText === 'Start') {
//       // const $test = 1
//       chrome.tabs.executeScript({
//         file: 'scripts/monitoring.js'
//       });
//     }

//   })
// }
// function listenClick_two() {
//   const end_button = document.getElementById('end-btn');
//   end_button.addEventListener('click', event => {
//     // if event.target.innerText === 'start' {
//     if (event.target.innerText === 'End') {
//       // const $test = 1
//       chrome.tabs.executeScript({
//         file: 'scripts/end-meeting.js'
//       });
//       window.open("http://www.traineq.site/dashboard");
//     }

//   })
// }




function checkBoxtoggle() {
  const button = document.getElementById('checkbox-btn');
  button.checked = window.sessionActive
  button.addEventListener('change', function () {
    if (this.checked) {
      chrome.tabs.executeScript({
        file: 'scripts/monitoring.js'
      });
      window.sessionActive = true;
    } else {
      chrome.tabs.executeScript({
        file: 'scripts/end-meeting.js'
      });

      window.open("http://www.traineq.site/dashboard");
      window.sessionActive = false;
    }

  });

}

// listenClick();
// listenClick_two();
checkBoxtoggle();
