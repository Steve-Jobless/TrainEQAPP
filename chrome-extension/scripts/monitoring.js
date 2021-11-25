// const screenShot = document.getElementsByTagName('img')[0]
console.log("Hello!")
// console.log(screenShot)

let port
setTimeout(() => {
  port = chrome.runtime.connect({ name: "emotionDetector" });
  port.onMessage.addListener(function (msg) {
    console.log(msg)
    // const emotions = msg.result
    // console.log(emotions)
    // const display_message = logResultsToBE(emotions)
    // console.log(display_message)
    displayResults(msg.emotion)
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
  }, 10000)
}

const displayResults = (display_message) => {
  const screen_location = document.querySelector(".CpPRrf")

const insertedContent = document.querySelector(".insertedContent");
if(insertedContent) {
    insertedContent.parentNode.removeChild(insertedContent);
}
screen_location.insertAdjacentHTML('beforeend', `<h1 class ='insertedContent' style="margin:0px;">${display_message}</h1>`);

}

startMonitoring()

// const logResultsToBE = (emotions) => {
//   emotions.forEach((emotion) => {
//     // Object.entries(emotion.expressions).forEach((key, value) =>{
//     // })
//     const max_emotion = (Object.keys(emotion.expressions).reduce(function (a, b) { return emotion.expressions[a] > emotion.expressions[b] ? a : b }))
//     // const max_emotion_value = (Object.values(emotion.expressions).reduce(function (a, b) { return emotion.expressions[a] > emotion.expressions[b] ? a : b }))
//     // console.log(max_emotion)
//     return max_emotion
//     // console.log(max_emotion_value)
//   })

// }
