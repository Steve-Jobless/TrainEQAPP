const tipsHash = {
  "sad": {
    "title": "sadness",
    "emoji": "🥲",
    "backgroundcolor": "rgba(88,88,255,0.25)",
    "tips": [
      "Signs of disappointment? Would you like to hear what is on their mind?",
      "Did something make this participant unhappy? Would you like to ask what is bothering them?",
      "Perhaps you need to say something encouraging."
    ]
  },
  "angry": {
    "title": "anger",
    "emoji": "😡",
    "backgroundcolor": "rgba(255,0,0,0.25)",
    "tips": [
      "Did you say something provocative? Maybe qualify your statement.",
      "Did anyone say something upsetting? Perhaps identify the conflict and address it.",
      "Maybe ask what is on their mind."
    ]
  },
  "fearful": {
    "title": "fear",
    "emoji": "😟",
    "backgroundcolor": "rgba(135,0,135,0.25)",
    "tips": [
      "Did your posture intimidate them? Maybe adjust your posture.",
      "Did you scare them? Pay attention to the tone of your voice.",
      "Maybe be friendlier! Being a kind person helps you with doing business, too."
    ]
  },
  "disgusted": {
    "title": "disgust",
    "emoji": "🤮",
    "backgroundcolor": "rgba(0,255,0,0.25)",
    "tips": [
      "Did you say something uncomfortable? Maybe clarify your intent.",
      "Did they get offended? Maybe you need to apologize for their discomfort.",
      "Perhaps you need to change the topic of conversation."]
  },
  "happy": {
    "title": "happiness",
    "emoji": "🤩",
    "tips": []
  },
  "neutral": {
    "title": "no siginificant emotions",
    "emoji": "😶",
    "tips": []
  },
  "surprised": {
    "title": "surprise",
    "emoji": "🤯",
    "tips": []
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
  return setInterval(async () => {
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
  // const emojiVar = `<span id='emotion-participant-${participantId}' class ='insertedContent' style="top:10px; left:10px; font-size:4rem; color:black; z-index: 9999; position: absolute;">${tipsHash[emotion].emoji}</span>`
  const numberOfAvailableTips = tipsHash[emotion].tips.length
  const tipsMessage = tipsHash[emotion].tips[Math.floor(Math.random() * (numberOfAvailableTips))]
  const tipsEmoji = tipsHash[emotion].emoji
  const backgroundColor = tipsHash[emotion].backgroundcolor

  const emojiVar = `<span>${tipsEmoji}</span>`

  const gifUrl = chrome.runtime.getURL(`images/animated_emoji/${emotion}.gif`)
  const animatedEmoji = `<div><img src="${gifUrl}" style="width: 35px; height: 35px"></div>`
  // console.log(animatedEmoji);



  const messageVar = `<p style="width: 150px; word-break: normal; white-space: normal; overflow-wrap: normal; font-size:12px; margin=0px"><span id="displayed-message">${tipsMessage}</p>`;


  const negativeEmotion = ["sad", "angry", "disgusted", "fearful"]
  const commonStyle = `top:10px; left:10px; font-size:2rem; color:black; z-index: 9999; position: absolute;`
  const negativeEmotionStyle = `padding: 5px; border-radius: 5px; border: 0.5px solid grey; background-color:${backgroundColor}; min-width:250px; min-height:70px; display:flex; justify-content:space-around; align-items: center;`

  // console.log(negativeEmotion.includes(emotion));

  if (negativeEmotion.includes(emotion)) {
    const displayDiv = `<div id='emotion-participant-${participantId}' class='insertedContent' style="${commonStyle} ${negativeEmotionStyle}">${animatedEmoji} ${messageVar}</div>`
    screen_location.parentNode.insertAdjacentHTML('afterend', displayDiv);
  } else {
    const displayDiv = `<div id='emotion-participant-${participantId}' class='insertedContent' style="${commonStyle}">${animatedEmoji}</div>`
    screen_location.parentNode.insertAdjacentHTML('afterend', displayDiv);
  }
  // screen_location.parentNode.insertAdjacentHTML('afterend', displayDiv);
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
window.monitor = startMonitoring()
