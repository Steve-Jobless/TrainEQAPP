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
        const emotion = getMax(result[0])
        port.postMessage({ participantId: msg.participantId, emotion: emotion });
        await createExpression({ emotion, participantId: msg.participantId })
      }
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

const getMax = ({ expressions }) => {
  const max_emotion = (Object.keys(expressions).reduce(function (a, b) { return expressions[a] > expressions[b] ? a : b }))
  return max_emotion
}


async function createExpression({ emotion, participantId }) {
  let meeting_id;
  chrome.storage.local.get(['meeting_id'], async function (result) {
    meeting_id = result.meeting_id;
    console.log(meeting_id)

    const url = 'https://traineq.site/api/v1/expressions';
    chrome.storage.local.get(['email', 'token'], async function (result) {
      console.log('Email is ' + result.email);
      console.log('Token is ' + result.token);
      const email = result.email;
      const token = result.token;
      // const email = '20@gmail.com';
      // const token = 'uZopBdGrsuk4-wNxGJBg';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": result.email,
          "X-User-Token": result.token
        },
        body: JSON.stringify({
          "expression": {
            emotion,
            "confidence": 0.7
          },
          "participant_id": participantId
        })
      })
      console.log({ response })
    })
  });


}
