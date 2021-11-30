// const screenShot = document.getElementsByTagName('img')[0]
console.log("Hello!")
// console.log($test)
// console.log(screenShot)

let port_emotion
const screen_location = document.querySelector(".pHsCke")
let meeting_id = null

setTimeout(() => {
  port_emotion = chrome.runtime.connect({ name: "emotionDetector" });
  port_emotion.onMessage.addListener(function ({ emotion }) {
    console.log(emotion)
    displayResults(emotion)
    console.log(1212, meeting_id)

    port_emotion.postMessage({ meeting_id: localStorage.meeting_id });

  });
}, 1000);

let canvas_height = window.screen.height;
let canvas_width = window.screen.width;


const takeScreenShots = () => {
  // return html2canvas(document.querySelector("#test"))

  const videos = document.querySelectorAll("video")
  return Array.from(videos).map(video => {
    var canvas = document.createElement('canvas');
    canvas.setAttribute("participant-id", video.dataset.participantId)
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas
  });
  // document.body.appendChild(canvas) //<--to check the what is being displayed on the canvas
  // return canvas

}




const startMonitoring =  () => {
  console.log("The start monitor is being called")
  //create a meeting

  //every 10 seconds:
  setInterval(async () => {
    console.log("inside of the interval")
    //take screenshot of the canvas
    const screenShots = await takeScreenShots()
    screenShots.forEach(screenShot => {
      //feed the screenshot into the emotion-detector
      // participantId?
      port_emotion.postMessage({ participantId: screenShot.dataset.participantId, screenShot: screenShot.toDataURL() });
    });

    //output sent to the api at the back

    //display the feedback
  }, 3000)
}

const displayResults = (display_message) => {
  const screen_location = document.querySelector(".ZY8hPc gtgjre pZFrDd")

  screen_location.forEach(element => {


  });
const insertedContent = document.querySelector(".insertedContent");
if(insertedContent) {
    insertedContent.parentNode.removeChild(insertedContent);
}
  screen_location.insertAdjacentHTML('beforeend', `<h1 class ='insertedContent' style="font-size: 16px; color:white; text-align: center; z-index: 9999">${display_message[0].toUpperCase() + display_message.substring(1)}</h1>`);

}



function createMeeting() {
  const url = 'http://localhost:3000/api/v1/meetings';
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": "example@example.com",
      "X-User-Token": "_XNbsrvpVFHKXuXv19zk"
    },
    body: JSON.stringify({
      "number_of_participants": document.querySelectorAll("video").length
    }) ,
  }).then(response => response.json())
    .then((data) => {

      console.log(data)
      // const screen_location = document.querySelector(".pHsCke")
      // chrome.storage.local.set({ meeting_id: data.id, participant_id: data.meeting.participant  }, function () {
      // });
      // meeting_id = data.id
      const videos = document.querySelectorAll("video")


      data.participants.forEach((participantId, index)=> {
        videos[index].setAttribute("participant-id", participantId)
      });
    })
}

createMeeting()
startMonitoring()
