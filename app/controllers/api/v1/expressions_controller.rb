class Api::V1::ExpressionsController < Api::V1::BaseController
  def index
    @expressions = policy_scope(Expression)
  end

  def show
    @expression = Expression.find(params[:id])
    authorize @expression
  end

  def create
    @expression = expression.new(expression_params)
    participant = Participant.find(params[:participant_id])
    @expression.participant = participant
    authorize @expression
    if @expression.save
      render :show, status: :created
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
