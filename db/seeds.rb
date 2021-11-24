# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Cleaning database..."
User.destroy_all
Meeting.destroy_all
Participant.destroy_all
Expression.destroy_all

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
  user_id:1
)

meeting2 = Meeting.create!(
  start_at: '2020-06-26T04:17:29+00:00',
  end_at:'2020-06-26T05:47:29+00:00',
  user_id:1
)

meeting3 = Meeting.create!(
  start_at: '2020-06-26T04:47:29+00:00',
  end_at:'2020-06-26T05:47:29+00:00',
  user_id:2
)

puts "Meetings finished, now creating particapnts..."

john = Participant.create!(
  name: 'John',
  meeting_id:1
)

jane = Participant.create!(
  name: 'Jane',
  meeting_id:2
)

joe = Participant.create!(
  name: 'Joe',
  meeting_id:3
)

puts "participants finished, now creating expressions for all participants..."

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'neutral'
)

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'happy'
)

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'sad'
)

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'angry'
)

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'fearful'
)

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'disgusted'
)

Expression.create!(
  participant_id:1,
  confidence:rand(0.7..1.0),
  emotion:'surprised'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'neutral'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'happy'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'sad'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'angry'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'fearful'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'disgusted'
)

Expression.create!(
  participant_id:2,
  confidence:rand(0.7..1.0),
  emotion:'surprised'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'neutral'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'happy'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'sad'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'angry'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'fearful'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'disgusted'
)

Expression.create!(
  participant_id:3,
  confidence:rand(0.7..1.0),
  emotion:'surprised'
)

puts "Finished!"


# user = User.new(email: "sfyitan@gmail.com", password: "123123")
# user.save
# meeting = Meeting.new(start_at: '2019-06-26T04:17:29+00:00',end_at:'2019-06-26T05:17:29+00:00',user_id:1)
# meeting.save
# participant = Participant.new(name: 'testman', meeting_id:1)
# participant.save
# expression = Expression.new(participant_id:1, confidence:0.00010264792217640206, emotion:'sad')
# expression.save
