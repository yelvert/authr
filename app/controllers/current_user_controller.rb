class CurrentUserController < ApplicationController
  def whoami
    @user = current_user
  end

  def update
    if current_user.update(current_user_params)
      render :whoami, status: :ok
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private

    def current_user_params
      params.expect(current_user: %i[ name username password password_confirmation ])
    end
end
