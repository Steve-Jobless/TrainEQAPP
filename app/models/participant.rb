class Participant < ApplicationRecord
  belongs_to :meeting

  validates :name, presence: true
end
