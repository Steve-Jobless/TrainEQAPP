class UsersController < ApplicationController

  def dashboard
    authorize current_user
    @user = current_user
    @meetings = Meeting.all.where(user_id: current_user)
    # @meeting = Meeting.all.where(user_id: current_user).last
    @meeting = Meeting.find(81)
    @participants = Participant.all.where(meeting_id: @meeting.id)
    @disengaged = ["sad", "angry", "disgusted", "fearful"]
    @engaged = ["happy", "neutral", "surprised"]
    @all_emotions = []
    comparison(@meeting)
    scores(@meeting)

    @expression_array = expressions(@participants)
    @emotions_array = emotion_counter(@expression_array.flatten!)
    @most_disengaged_expression = most_disengaged(@expression_array)
    @message = advice(@most_disengaged_expression)
    @total_participants = @meetings.map do |meeting|
      Participant.all.where(meeting_id: meeting.id)
    end.flatten!
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

  # To show the specific meeting of the user
  def show
    authorize current_user
    @meeting = Meeting.find(params[:id])
  end

  def update
    @user = current_user
    authorize @user
    if @user.update(user_params)
      redirect_to dashboard_path
    else
      render :update
    end
  end

  def comparison(latest_meeting)
    @five_meetings_results = []
    @five_meetings_dates = []
    @last_meetings = Meeting.all.where(user_id: current_user).where('id <= ?', latest_meeting.id).last(5)
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
          @total_engages = @disengaged_count + @engaged_count
          if !@total_engages.zero?
            @five_meetings_results << ( @engaged_count * 100 / @total_engages).to_i
          else
            @five_meetings_results << 0
          end
          @five_meetings_dates << meeting.created_at.strftime("%-m/%-d %T")
      end
    else
      @five_meetings_results << [0, 0, 0, 0, 0]
    end
  end

  def scores(meeting)
    @meeting_participants = participant(meeting)
    @all_expressions_score = expressions(@meeting_participants).flatten
    @total_disengaged_count = 0
    @total_engaged_count = 0
    if !@meeting_participants.nil?
      @all_expressions_score.each do |expression|
        @disengaged.include?(expression) ? @total_disengaged_count += 1 : @total_engaged_count += 1
      end
    end
    @total_happys = @all_expressions_score.count('happy')
  end

  def expressions(participants)
    @expressions = []
    if !participants.nil?
      participants.each do |participant|
        @participant_all_expressions = Expression.all.where(participant_id: participant.id)
        @expressions << @participant_all_expressions.map do |expression|
          expression.emotion
        end
      end
    end
    @expressions
  end

  def emotion_counter(emotions)
     [
      emotions.count("happy"),
      emotions.count("neutral"),
      emotions.count("surprised"),
      emotions.count("sad"),
      emotions.count("angry"),
      emotions.count("disgusted"),
      emotions.count("fearful"),
    ]
  end

  def participant(meeting)
    @all_participants = Participant.all.where(meeting_id: meeting.id)
    # meetings.each do |meeting|
    #   @all_participants = Participant.all.where(meeting_id: meeting.id)
    # end
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

private

def user_params
  params.require(:user).permit(:avatar)
end
