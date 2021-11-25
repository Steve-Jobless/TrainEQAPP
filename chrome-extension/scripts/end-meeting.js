let time_date = new Date

function endMeeting(end_time) {
  const url = `http://localhost:3000/api/v1/meetings/${}`;
  const test = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": "example@example.com",
      "X-User-Token": "_XNbsrvpVFHKXuXv19zk"
    },
    body: JSON.stringify({
      "end_at": {
        end_time,
      },
       "meeting_id": {
          end_time,
        },
      "participant_id": 1
    })
  })
  console.log(test);
}

endMeeting(time_date)
