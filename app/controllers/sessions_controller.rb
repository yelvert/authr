class SessionsController < ApplicationController
  skip_before_action :login_required!
  layout false

  def new
  end

  def create
    binding.pry
    if user = User.authenticate(params[:username], params[:password])
      session[:user_id] = user.id
      head(:ok)
    else
      head(:unauthorized)
    end
  end

  def destroy
    reset_session
    head(:ok)
  end
end
