function createMeeting() {
  const url = 'https://www.traineq.site/api/v1/meetings';
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
  })
}


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
function createExpression({ emotion, confidence }) {
  const url = 'https://www.traineq.site/api/v1/expressions';
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "expression": { emotion, confidence }
    })
  })
}

// createMeeting();
// createExpression();
