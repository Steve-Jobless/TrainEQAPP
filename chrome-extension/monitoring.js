const screenShot = document.getElementsByTagName('img')[0]
console.log("Hello!")
console.log(screenShot)





const takeScreenShot = () => {
  return html2canvas(document.querySelector("img"))
}


const startMonitoring = (screenShot) => {
  console.log("The start monitor is being called")
  //create a meeting

  //every 30 seconds:
  setInterval(async () => {
    console.log("inside of the interval")
    //take screenshot of the canvas
    const testShot = await takeScreenShot()
    //feed the screenshot into the emotion-detector
    console.log(testShot)
    const emotions = analyzeEmotions(testShot)
    //output sent to the api at the back
    // logResultsToBE(emotions)
    //display the feedback
    // displayResults(emotions)
  }, 10000)
}

//load models

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  console.log("loading models")
]).then(startMonitoring(screenShot))




const analyzeEmotions = (screenShot) => {
    setTimeout(async () => {
      const detections = await faceapi
        .detectAllFaces(screenShot, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
      console.log(detections)
        , 10000
    })
    console.log("inside of analyze")
}

const logResultsToBE = (emotions) => {}

const displayResults = (emotions) => {}
