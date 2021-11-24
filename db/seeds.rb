puts "Cleaning database..."
Expression.destroy_all
Participant.destroy_all
Meeting.destroy_all
User.destroy_all

puts "Creating users..."
mai = User.create!(
  email: "sfyitan@gmail.com",
  password: "123123",
)

etienne = User.create!(
  email: "etiennewortham@gmail.com",
  password: "123123",
)

puts "Users finished, now creating meetings..."

meeting1 = Meeting.create!(
  start_at: '2019-06-26T04:17:29+00:00',
  end_at:'2019-06-26T05:17:29+00:00',
  user: User.first
)

meeting2 = Meeting.create!(
  start_at: '2020-06-26T04:17:29+00:00',
  end_at:'2020-06-26T05:47:29+00:00',
  user: User.first
)

meeting3 = Meeting.create!(
  start_at: '2020-06-26T04:47:29+00:00',
  end_at:'2020-06-26T05:47:29+00:00',
  user: User.last
)

puts "Meetings finished, now creating participants..."

john = Participant.create!(
  name: 'John',
  meeting: Meeting.first
)

jane = Participant.create!(
  name: 'Jane',
  meeting: Meeting.second
)

joe = Participant.create!(
  name: 'Joe',
  meeting: Meeting.third
)

puts "Participants finished, now creating expressions for all participants..."

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'neutral'
)

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'happy'
)

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'sad'
)

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'angry'
)

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'fearful'
)

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'disgusted'
)

Expression.create!(
  participant: Participant.first,
  confidence:rand(0.7..1.0),
  emotion:'surprised'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'neutral'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'happy'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'sad'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'angry'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'fearful'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'disgusted'
)

Expression.create!(
  participant: Participant.second,
  confidence:rand(0.7..1.0),
  emotion:'surprised'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'neutral'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'happy'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'sad'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'angry'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'fearful'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'disgusted'
)

Expression.create!(
  participant: Participant.third,
  confidence:rand(0.7..1.0),
  emotion:'surprised'
)

puts "Finished!"
