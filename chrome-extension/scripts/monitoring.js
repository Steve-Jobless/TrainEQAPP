// const screenShot = document.getElementsByTagName('img')[0]
console.log("Hello!")
// console.log(screenShot)

let port
setTimeout(() => {
  port = chrome.runtime.connect({ name: "emotionDetector" });
  port.onMessage.addListener(function (msg) {
    console.log(msg)

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
    port.postMessage({ screenShot: screenShot.toDataURL() });

    //output sent to the api at the back

    //display the feedback
    // displayResults(emotions)
    displayResults()

  }, 10000)
}

const displayResults = () => {
  const screen_location = document.querySelector(".CpPRrf")
  screen_location.insertAdjacentHTML("beforeend", "<h1 style='text-align:center;'>Happy</h1>")
}

startMonitoring()
