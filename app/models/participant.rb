class Participant < ApplicationRecord
  belongs_to :meeting
  has_many :expressions

  validates :name, presence: true
end
