class Meeting < ApplicationRecord
  belongs_to :user
  has_many :participants
  has_many :expressions, through: :participants

  validates :start_at, presence: true
  # validates :end_at, presence: true
end
