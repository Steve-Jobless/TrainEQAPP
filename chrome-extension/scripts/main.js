function createMeeting() {
  const url = 'https://www.traineq.site/meetings';
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
  })
}

function createExpression({emotion, confidence, participantId}) {
  const url = 'https://www.traineq.site/expressions';
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "expression": { emotion, confidence, participant_id: participantId　}
    })
  })
}


createMeeting();
createExpression();
