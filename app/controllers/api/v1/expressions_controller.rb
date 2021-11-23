class Api::V1::ExpressionsController < Api::V1::BaseController
  def index
    @expressions = policy_scope(Expression)
  end
end
