chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "emotionDetector");
  port.onMessage.addListener(function (msg) {

    const image = document.createElement('img')
    image.src = msg.screenShot
    image.onload = async () => {
      const canvas = faceapi.createCanvasFromMedia(image)
      const result = await analyzeEmotions(canvas)

      // return result
      port.postMessage({ result: result });
      console.log(logResultsToBE(result))
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

const logResultsToBE = (emotions) => {
  emotions.forEach((emotion) => {
    // Object.entries(emotion.expressions).forEach((key, value) =>{
    // })
    const max_emotion = (Object.keys(emotion.expressions).reduce(function (a, b) { return emotion.expressions[a] > emotion.expressions[b] ? a : b }))
    // const max_emotion_value = (Object.values(emotion.expressions).reduce(function (a, b) { return emotion.expressions[a] > emotion.expressions[b] ? a : b }))
    console.log(max_emotion)
    // return (max_emotion)
    // console.log(max_emotion_value)
  })

 }
