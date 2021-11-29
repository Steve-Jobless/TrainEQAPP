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
      await createExpression(emotion)
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


async function createExpression(emotion) {
  let meeting_id;
  chrome.storage.local.get(['meeting_id'], async function(result) {
  meeting_id = result.meeting_id;
  console.log(meeting_id)

  const url = 'http://localhost:3000/api/v1/expressions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": "example@example.com",
      "X-User-Token": "_XNbsrvpVFHKXuXv19zk"
    },
    body: JSON.stringify({
      "expression": {
        emotion,
        "confidence": 0.7
      },
      "meeting_id": meeting_id
    })
  })
  console.log({ response })

});


}
