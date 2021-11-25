class UsersController < ApplicationController
  def dashboard
    authorize current_user
    @meetings = Meeting.all.where(user_id: current_user)
    # @bookings_as_owner = current_user.bookings_as_owner
    @expressions = Expression.all.where(user_id: current_user)
    # @participant = Participant.find(1)
    # @happy = Expression.all.where(participant_id:1).where(emotion:"happy").count
    # @sad = Expression.all.where(participant_id:1).where(emotion:"sad").count
    # @neutral = Expression.all.where(participant_id:1).where(emotion:"neutral").count
    # @angry = Expression.all.where(participant_id:1).where(emotion:"angry").count
    # @disgusted = Expression.all.where(participant_id:1).where(emotion:"disgusted").count
    # @suprised = Expression.all.where(participant_id:1).where(emotion:"suprised").count
    # @fearful = Expression.all.where(participant_id:1).where(emotion:"fearful").count
    # @emotions = [ @happy, @sad, @neutral, @angry, @disgusted, @surprised, @fearful]
    @emotions = [
      Expression.all.where(participant_id:13).where(emotion:"happy").count,
      Expression.all.where(participant_id:13).where(emotion:"sad").count,
      Expression.all.where(participant_id:13).where(emotion:"neutral").count,
      Expression.all.where(participant_id:13).where(emotion:"angry").count,
      Expression.all.where(participant_id:13).where(emotion:"disgusted").count,
      Expression.all.where(participant_id:13).where(emotion:"surprised").count,
      Expression.all.where(participant_id:13).where(emotion:"fearful").count
    ]

  end
end
