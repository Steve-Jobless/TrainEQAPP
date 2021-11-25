class Meeting < ApplicationRecord
  belongs_to :user
  has_many :participants
  has_many :expressions, through: :participants

  validates :start_at, presence: true

  before_validation :ensure_start_at

  # validates :end_at, presence: true

  private

  def ensure_start_at
    if start_at.nil?
      self.start_at = DateTime.now
    end
  end
end
