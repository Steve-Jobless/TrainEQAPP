class Api::V1::MeetingsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_meeting, only: [ :show, :update ]

  def show
  end

  def update
    @user = current_user
    @meeting.end_at = Time.new
     if @meeting.save!
       redirect_to dashboard_path
     else
      render_error
    end
  end

  def create
    if params[:meeting].present?
      @meeting = Meeting.new(meeting_params)
    else
      @meeting = Meeting.new
    end
    @meeting.user = current_user
    authorize @meeting
    if @meeting.save

      #get number of participants from params
      #create participants
      number_of_participants = params[:number_of_participants]
      number_of_participants.times do
        Participant.create(meeting: @meeting)
        
      end
      #store ids of participants
      #render the ids in the show

      render :show
    else
      render_error
    end
  end

  private

  def set_meeting
    @meeting = Meeting.find(params[:id])
    authorize @meeting
  end

  def meeting_params
    params.require(:meeting).permit(:start_at, :end_at)
  end

  def render_error
    render json: { errors: @meeting.errors.full_messages },
      status: :unprocessable_entity
  end
end
