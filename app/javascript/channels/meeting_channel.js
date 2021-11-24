import consumer from "./consumer";

const initMeetingCable = () => {
  const expressionsContainer = document.getElementById('expressions');
  if (expressionsContainer) {
    const id = expressionsContainer.dataset.meetingId;

    consumer.subscriptions.create({ channel: "MeetingChannel", id: id }, {
      received(data) {
        console.log(data); // called when data is broadcast in the cable
        expressionsContainer.insertAdjacentHTML('beforeend', data);
      },
    });
  }
}

export { initMeetingCable };
