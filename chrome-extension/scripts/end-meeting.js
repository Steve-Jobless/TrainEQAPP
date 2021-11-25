let time_date = new Date


async function endMeeting(end_time) {
  const screen_location = document.querySelector(".CpPRrf")
  const meeting_id = screen_location.getAttribute("data-meeting-id")
  const url = `http://localhost:3000/api/v1/meetings/${meeting_id}`;
  const test = await fetch(url, {
    method: 'POST',
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
}

endMeeting(time_date)
