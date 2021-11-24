class UsersController < ApplicationController
  def dashboard
    authorize current_user
    @meetings = Meeting.all.where(user_id: current_user)
    # @bookings_as_owner = current_user.bookings_as_owner
    @expressions = Expression.all.where(user_id: current_user)
  end
end
