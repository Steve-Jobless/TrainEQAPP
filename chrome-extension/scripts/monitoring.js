// const screenShot = document.getElementsByTagName('img')[0]
console.log("Hello!")
// console.log(screenShot)

let port_emotion
setTimeout(() => {
  port_emotion = chrome.runtime.connect({ name: "emotionDetector" });
  port_emotion.onMessage.addListener(function ({ emotion }) {
    console.log(emotion)
    displayResults(emotion)
  });
}, 1000);




const takeScreenShot = () => {
  // return html2canvas(document.querySelector("#test"))
  var canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  var ctx = canvas.getContext('2d');
  const video = document.querySelectorAll("video")[0]
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas
}




const startMonitoring =  () => {
  console.log("The start monitor is being called")
  //create a meeting

  //every 10 seconds:
  setInterval(async () => {
    console.log("inside of the interval")
    //take screenshot of the canvas
    const screenShot = await takeScreenShot()
    //feed the screenshot into the emotion-detector
    port_emotion.postMessage({ screenShot: screenShot.toDataURL() });

    //output sent to the api at the back

    //display the feedback
  }, 10000)
}

const displayResults = (display_message) => {
  const screen_location = document.querySelector(".CpPRrf")

const insertedContent = document.querySelector(".insertedContent");
if(insertedContent) {
    insertedContent.parentNode.removeChild(insertedContent);
}
  screen_location.insertAdjacentHTML('beforeend', `<h1 class ='insertedContent' style="margin:0px; color:white; text-align: center;">${display_message[0].toUpperCase() + display_message.substring(1)}</h1>`);

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
  }).then(response => response.json())
    .then((data) => {
      console.log({ data });
    })
}

createMeeting()
startMonitoring()
