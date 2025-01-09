class CurrentUserController < ApplicationController
  def whoami
    @user = current_user
  end
end
