class Expression < ApplicationRecord
  belongs_to :participant

  validates :emotion, presence: true
  validates :confidence, presence: true
end
