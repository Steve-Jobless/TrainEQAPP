class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :meetings

  include DeviseTokenAuth::Concerns::User
  acts_as_token_authenticatable
end
