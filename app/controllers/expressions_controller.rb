class ExpressionsController < ApplicationController
  def index
    @expressions = policy_scope(Expression)
  end

  def show
    @expression = Expression.find(params[:id])
    authorize @expression
    @participant = Participant.find(params[:id])
    @meeting = Meeting.find(params[:id])
  end

  def create
    @expression = Expression.new(expression_params)
    @participant = Participant.find(params[:participant_id])
    @meeting = Meeting.find(@participant.meeting_id)
    @expression.participant = @participant
    # authorize @expression
    if @expression.save
      MeetingChannel.broadcast_to(
        @meeting,
        render_to_string(partial: "expressions", locals: { expression: @expression })
      )
      redirect_to meeting_path(@meeting, anchor: "expression-#{@expression.id}")
    else
      render_error
    end
  end

  private

  def render_error
    render json: { errors: @expression.errors.full_messages },
      status: :unprocessable_entity
  end

  def expression_params
    params.require(:expression).permit(:confidence, :emotion)
  end


end
