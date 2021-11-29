json.extract! @meeting, :id, :start_at, :end_at
json.participants @meeting.participants.pluck(:id)
