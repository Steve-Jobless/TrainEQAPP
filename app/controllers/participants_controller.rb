class ParticipantsController < ApplicationController
  # #show is a test code
  def show
   @participant = Participant.find(params[:id])
   @expression = Expression.new
  end
end
