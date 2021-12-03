class UsersController < ApplicationController
  def dashboard
    authorize current_user
    @meetings = Meeting.all.where(user_id: current_user)
    @meeting = Meeting.all.where(user_id: current_user).last
    @participants = Participant.all.where(meeting_id: @meeting.id)
    @disengaged = ["sad", "angry", "disgusted", "fearful"]
    @engaged = ["happy", "neutral", "surprised"]
    @all_emotions = []
    comparison
    # scores(@meetings)
    scores(@meeting)
    @expression_array = expressions(@participants)
    @most_disengaged_expression = most_disengaged(@expression_array)
    @message = advice(@most_disengaged_expression)
    @number_of_meetings =@meetings.size
    @chart_options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  end

  def comparison
    @five_meetings_results = []
    @five_meetings_engaged = []
    @five_meetings_disengaged = []
    @last_meetings = Meeting.all.where(user_id: current_user).last(5)
    if !@last_meetings.nil?
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
          if !@total_engages.zero?
            @five_meetings_results << (@engaged_count* 100 / @total_engages).to_i
          else
            @five_meetings_results << 0
          end
      end
    else
      @five_meetings_results << [0, 0, 0, 0, 0]
    end
  end

  def scores(meeting)
    @all_expressions_score = []
    @total_participants = []
    @total_disengaged_count = 0
    @total_engaged_count = 0
    # meetings.each do |meeting|
      @all_participants = Participant.all.where(meeting_id: meeting.id)
      if !@all_participants.nil?
        @total_participants << @all_participants
        expressions(@all_participants).flatten.each do |expression|
          @all_expressions_score << expression
          if @disengaged.include?(expression)
            @total_disengaged_count += 1
          else
            @total_engaged_count += 1
          end
        end
      end
    # end
    @total_participants.flatten!
    @total_happys = @all_expressions_score.count('happy')
  end

  def expressions(participants)
    @expressions = []
    participants.each do |participant|
      @all_expressions = Expression.all.where(participant_id: participant.id)
      @expressions << @all_expressions.map do |expression|
        expression.emotion
      end
    end
    @expressions
  end

  def participant(meetings)
    meetings.each do |meeting|
      @all_participants = Participant.all.where(meeting_id: meeting.id)
    end
  end

  def most_disengaged(expressions)
    @disengaged_expression = {}
    expressions.flatten!
    @disengaged_expression['sad'] = expressions.count('sad')
    @disengaged_expression['disgusted'] = expressions.count('disgusted')
    @disengaged_expression['angry'] = expressions.count('angry')
    @disengaged_expression['fearful'] = expressions.count('fearful')
    return most_disengaged_expression = @disengaged_expression.sort.last
  end

  def advice(emotion)
    tips_hash = {
      "sad": {
        "title": "sadness",
        "emoji": "🥲",
        "backgroundcolor": "rgba(88,88,255,0.25)",
        "tips": [
          "Signs of disappointment? Would you like to hear what is on their mind?",
          "Did something make this participant unhappy? Would you like to ask what is bothering them?",
          "Perhaps you need to say something encouraging."
        ]
      },
      "angry": {
        "title": "anger",
        "emoji": "😡",
        "backgroundcolor": "rgba(255,0,0,0.25)",
        "tips": [
          "Did you say something provocative? Maybe qualify your statement.",
          "Did anyone say something upsetting? Perhaps identify the conflict and address it.",
          "Maybe ask what is on their mind."
        ]
      },
      "fearful": {
        "title": "fear",
        "emoji": "😟",
        "backgroundcolor": "rgba(135,0,135,0.25)",
        "tips": [
          "Did your posture intimidate them? Maybe adjust your posture.",
          "Did you scare them? Pay attention to the tone of your voice.",
          "Maybe be friendlier! Being a kind person helps you with doing business, too."
        ]
      },
      "disgusted": {
        "title": "disgust",
        "emoji": "🤮",
        "backgroundcolor": "rgba(0,255,0,0.25)",
        "tips": [
          "Did you say something uncomfortable? Maybe clarify your intent.",
          "Did they get offended? Maybe you need to apologize for their discomfort.",
          "Perhaps you need to change the topic of conversation."]
      },
      "happy": {
        "title": "happiness",
        "emoji": "🤩",
        "tips": ["You did a great job! Keep up the good work!",]
      },
      "neutral": {
        "title": "no siginificant emotions",
        "emoji": "😶",
        "tips": []
      },
      "surprised": {
        "title": "surprise",
        "emoji": "🤯",
        "tips": []
      }

    }
    if emotion[1].zero?
      tips_hash[:happy]
    else
      tips_hash[emotion[0].to_sym]
    end
  end
end
