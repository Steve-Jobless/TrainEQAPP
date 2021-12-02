class UsersController < ApplicationController
  def dashboard
    authorize current_user
    @meetings = Meeting.all.where(user_id: current_user)
    @meeting = Meeting.all.where(user_id: current_user).last
    @participants = Participant.all.where(meeting_id: @meeting.id)
    @expressions = Expression.all.where(user_id: current_user)
    @disengaged = ["sad", "angry", "disgusted", "fearful"]
    @engaged = ["happy", "neutral", "surprised"]
    @disengaged_count = 0
    @engaged_count = 0
  end
end
