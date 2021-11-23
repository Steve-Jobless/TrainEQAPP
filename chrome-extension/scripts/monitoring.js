const input = document.getElementById('myImg')
console.log("HellO!")


//load models

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  console.log("loading models")
]).then(startMonitoring)


const startMonitoring = () => {
  //create a meeting

  //every 30 seconds:
  setInterval( () => {
    //take screenshot of the canvas
    const screenShot = takeScreenShot()
    //feed the screenshot into the emotion-detector
    const emotions = analyzeEmotions(screenShot)
    //output sent to the api at the back
    logResultsToBE(emotions)
    //display the feedback
    displayResults(emotions)
  }, 30000)
}

const takeScreenShot = () => {}

const analyzeEmotions = (screenShot) => {
    setTimeout(async () => {
      const detections = await faceapi
        .detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
      console.log(detections)
        , 10000
    })
}

const logResultsToBE = (emotions) => {}

const displayResults = (emotions) => {}
