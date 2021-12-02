class UsersController < ApplicationController
  def dashboard
    authorize current_user
    @meetings = Meeting.all.where(user_id: current_user)
    @meeting = Meeting.all.where(user_id: current_user).last
    # @meeting = Meeting.find(81)
    @participants = Participant.all.where(meeting_id: @meeting.id)
    @expressions = Expression.all.where(user_id: current_user)
    @disengaged = ["sad", "angry", "disgusted", "fearful"]
    @engaged = ["happy", "neutral", "surprised"]
    @all_emotions = []
    comparison
  end

  def comparison
    @five_meetings_results = []
    @five_meetings_engaged = []
    @five_meetings_disengaged = []
    @last_meetings = Meeting.all.where(user_id: current_user).last(5)
    @last_meetings.each do |meeting|
      @disengaged_count = 0
      @engaged_count = 0
        @each_meeting_participants = Participant.all.where(meeting_id: meeting.id)
          @each_meeting_participants.each do |participant|
            @each_participant_expressions = Expression.all.where(participant_id: participant.id)
            @each_participant_expressions.each do |expression|
              if @disengaged.include?(expression.emotion)
                @disengaged_count += 1
              else
                @engaged_count += 1
              end
            end
          end
          @five_meetings_engaged << @engaged_count
          @five_meetings_disengaged << @disengaged_count
          @total_engages = @disengaged_count + @engaged_count
          @five_meetings_results << (@engaged_count* 100 / @total_engages).to_i
      end
  end
end
