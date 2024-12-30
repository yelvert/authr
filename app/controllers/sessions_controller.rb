class SessionsController < ApplicationController
  skip_before_action :login_required!

  def new
  end

  def create
    if user = User.authenticate(params[:username], params[:password])
      session[:user_id] = user.id
      redirect_to home_url
    else
      redirect_to new_session_url, alert: "Invalid username or password"
    end
  end

  def destroy
    reset_session
    redirect_to home_url
  end
end
