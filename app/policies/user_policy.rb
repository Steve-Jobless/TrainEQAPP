class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def dashboard?
    true
  end

  def show?
    true
  end

  def update?
    true
  end
end
