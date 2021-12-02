let time_date = new Date


async function endMeeting(end_time) {

  chrome.storage.local.get(['meeting_id', 'email', 'token'], async function (result) {
    meeting_id = result.meeting_id;
    email = result.email;
    token = result.token;
    console.log(meeting_id, email, token);

    const url = `https://www.traineq.site/api/v1/meetings/${meeting_id}`;
    const test = await fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "X-User-Email": email,
        "X-User-Token": token
      },
      body: JSON.stringify({
        "end_at":
          end_time,
      })
    })
    window.localStorage.setItem('email', email);
    console.log(test);
  });
}

endMeeting(time_date)
clearInterval(window.monitor)
