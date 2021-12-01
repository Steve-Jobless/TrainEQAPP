class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!

  # include DeviseTokenAuth::Concerns::SetUserByToken
end
