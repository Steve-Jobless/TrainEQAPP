class V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!

  # include DeviseTokenAuth::Concerns::SetUserByToken
end
