chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "emotionDetector");
  port.onMessage.addListener(function (msg) {

    const image = document.createElement('img')
    image.src = msg.screenShot
    image.onload = async () => {
      const canvas = faceapi.createCanvasFromMedia(image)
      const result = await analyzeEmotions(canvas)
      console.log(result)
      // logResultsToBE(emotions)
    }

  });
});

//load models
console.log("loading models...")
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
  faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(() => {
  console.log("models loaded...")
})

const analyzeEmotions = async (screenShot) => {
  return await faceapi
    .detectAllFaces(screenShot, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions()
}

const logResultsToBE = (emotions) => { }
