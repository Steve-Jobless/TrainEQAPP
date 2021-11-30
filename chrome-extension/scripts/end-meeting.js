let time_date = new Date


async function endMeeting(end_time) {

  chrome.storage.local.get(['meeting_id'], async function (result) {
    meeting_id = result.meeting_id;
    console.log(meeting_id)

    const url = `http://localhost:3000/api/v1/meetings/${meeting_id}`;
    const test = await fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "X-User-Email": "example@example.com",
        "X-User-Token": "_XNbsrvpVFHKXuXv19zk"
      },
      body: JSON.stringify({
        "end_at":
          end_time,
        "participant_id": 1
      })
    })
    console.log(test);


  });

}

endMeeting(time_date)
