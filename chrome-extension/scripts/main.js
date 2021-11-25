// function createMeeting() {
//   const url = 'https://www.traineq.site/api/v1/meetings';
//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//   })
// }


// function sendMeetingData(data) {
//   const url = 'https://www.traineq.site/meetings';
//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       // "meeting": {starts_at: }
//     })
//   })
// }

// function sendExpressionData(data) {
//   const url = 'https://www.traineq.site/expressions';
//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       // "expressions": {angry: 0.22, }
//     })
//   })
// }


// sendMeetingData();
// sendExpressionData();
// function createExpression({ emotion, confidence }) {
//   const url = 'https://www.traineq.site/api/v1/expressions';
//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       "expression": { emotion, confidence }
//     })
//   })
// }

// createMeeting();
// createExpression();

// function createMeeting() {
//   const url = 'http://localhost:3000/api/v1/meetings';
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "X-User-Email": "etiennewortham@gmail.com",
//       "X-User-Token": "YdzYQscnTHDzWpuY9_zi"
//     },
//   }).then(response => response.json())
//     .then((data) => {
//       console.log({ data });
//     })
// }

// async function createExpression(emotion) {
//   const url = 'http://localhost:3000/api/v1/expressions';
//   const test = await fetch(url, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "X-User-Email": "etiennewortham@gmail.com",
//       "X-User-Token": "YdzYQscnTHDzWpuY9_zi"
//     },
//     body: JSON.stringify({
//       "expression": {
//         emotion,
//         "confidence": 0.7
//       },
//       "participant_id": 1
//     })
//   })
//   console.log(test);
// }
