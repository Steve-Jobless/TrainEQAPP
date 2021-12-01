const tipsHash = {
  "sad": {
    "title": "sadness",
    "emoji": "🥲",
    "tips": [
      "Signs of disappointment? Would you like to hear what is on their mind?",
      "Did something make this participant unhappy? Would you like to ask what is bothering them?",
      "Perhaps you need to say something encouraging."
    ]
  },
  "angry": {
    "title": "anger",
    "emoji": "😡",
    "tips": [
      "Did you say something provocative? Maybe qualify your statement.",
      "Did anyone say something upsetting? Perhaps identify the conflict and address it.",
      "Maybe ask what is on their mind."
    ]
  },
  "fearful": {
    "title": "fear",
    "emoji": "😟",
    "tips": [
      "Did your posture intimidate them? Maybe adjust your posture.",
      "Did you scare them? Pay attention to the tone of your voice.",
      "Maybe be friendlier! Being a kind person helps you with doing business, too."
    ]
  },
  "disgusted": {
    "title": "disgust",
    "emoji": "🤮",
    "tips": [
      "Did you say something uncomfortable? Maybe clarify your intent.",
      "Did they get offended? Maybe you need to apologize for their discomfort.",
      "Perhaps you need to change the topic of conversation."]
  },
  "happy": {
    "title": "happiness",
    "emoji": "🤩"
  },
  "neutral": {
    "title": "no siginificant emotions",
    "emoji": "😶"
  },
  "surprised": {
    "title": "surprise",
    "emoji": "🤯"
  }
}

// const screenShot = document.getElementsByTagName('img')[0]
console.log("Hello!")
// console.log($test)
// console.log(screenShot)
// console.log(tipsHash);
// console.log(tipsHash.sad);
// console.log(tipsHash.sad.emoji);

let port_emotion

setTimeout(() => {
  port_emotion = chrome.runtime.connect({ name: "emotionDetector" });
  port_emotion.onMessage.addListener(function ({ emotion, participantId }) {
    console.log(emotion, participantId)
    displayResults(emotion, participantId)

  });
}, 1000);

let canvas_height = window.screen.height;
let canvas_width = window.screen.width;


const takeScreenShots = () => {
  // return html2canvas(document.querySelector("#test"))

  const videos = document.querySelectorAll("video")
  return Array.from(videos).map(video => {
    var canvas = document.createElement('canvas');
    canvas.setAttribute("data-participant-id", video.dataset.participantId)
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas
  });
  // document.body.appendChild(canvas) //<--to check the what is being displayed on the canvas
  // return canvas

}




const startMonitoring = () => {
  console.log("The start monitor is being called")
  //create a meeting

  //every 10 seconds:
  setInterval(async () => {
    console.log("inside of the interval")
    //take screenshot of the canvas
    const screenShots = await takeScreenShots()
    screenShots.forEach(screenShot => {
      //feed the screenshot into the emotion-detector
      // participantId?
      port_emotion.postMessage({ participantId: screenShot.dataset.participantId, screenShot: screenShot.toDataURL() });
    });

    //output sent to the api at the back

    //display the feedback
  }, 3000)
}

const displayResults = (emotion, participantId) => {
  const video = document.querySelector(`video[data-participant-id='${participantId}']`)
  console.log(`video[data-participant-id='${participantId}']`, video)
  console.log(video)


  const screen_location = video

  const insertedContent = document.querySelector(`#emotion-participant-${participantId}`);
  if (insertedContent) {
    insertedContent.parentNode.removeChild(insertedContent);
  }
  const emojiVar = `<span id='emotion-participant-${participantId}' class ='insertedContent' style="top:10px; left:10px; font-size:4rem; color:black; z-index: 9999; position: absolute;">${tipsHash[emotion].emoji}</span>`

  screen_location.parentNode.insertAdjacentHTML('afterend', emojiVar);
}



async function createMeeting() {
  const url = 'http://localhost:3000/api/v1/meetings';
  await chrome.storage.local.get(['email', 'token'], async function (result) {
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
        "X-User-Email": email,
        "X-User-Token": token
      },
      body: JSON.stringify({
        "number_of_participants": document.querySelectorAll("video").length
      }),
    })
    const data = await response.json()
    console.log(data)
    // const screen_location = document.querySelector(".pHsCke")
    // chrome.storage.local.set({ meeting_id: data.id, participant_id: data.meeting.participant  }, function () {
    // });
    // meeting_id = data.id
    const videos = document.querySelectorAll("video")


    data.participants.forEach((participantId, index) => {
      videos[index].setAttribute("data-participant-id", participantId)
    });
  })
}

createMeeting()
startMonitoring()
