class Api::V1::MeetingsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show, :update ]
  before_action :set_meeting, only: [ :show, :update ]

  def show
  end

  def update
    if @meeting.update(meeting_params)
      render :show
    else
      render_error
    end
  end

  def create
    @meeting = Meeting.new(meeting_params)
    @meeting.user = current_user
    authorize @meeting
    if @meeting.save
      render :show
    else
      render_error
    end
  end

  private

  def set_meeting
    @meeting = Meeting.find(params[:id])
  end

  def meeting_params
    params.require(:meeting).permit(:start_at, :end_at)
  end

  def render_error
    render json: { errors: @meeting.errors.full_messages },
      status: :unprocessable_entity
  end
end
