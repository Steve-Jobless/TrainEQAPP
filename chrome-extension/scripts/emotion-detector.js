chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "emotionDetector");
  port.onMessage.addListener(function (msg) {

    const image = document.createElement('img')
    image.src = msg.screenShot
    image.onload = async () => {
      const canvas = faceapi.createCanvasFromMedia(image)
      const result = await analyzeEmotions(canvas)

      // return result
      if (result.length > 0) {
      const emotion = logResultsToBE(result)
      port.postMessage({ emotion: emotion });
      // sendExpressionData(emotion)
    }}

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
  const emotion = emotions[0]
    const max_emotion = (Object.keys(emotion.expressions).reduce(function (a, b) { return emotion.expressions[a] > emotion.expressions[b] ? a : b }))
    return max_emotion
 }


//  function sendExpressionData(emotion) {
//   const url = 'https://www.traineq.site/expressions';
//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       "expressions": emotion,
//       "confidence": 1
//     })
//   })
// }
