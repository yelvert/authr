class SessionsController < ApplicationController
  skip_before_action :login_required!
  layout false

  def new
  end

  def create
    if user = User.authenticate(params[:username], params[:password])
      session[:user_id] = user.id
      head(:ok)
    else
      head(:unauthorized)
    end
  end

  def destroy
    reset_session
    respond_to do |format|
      format.html { redirect_to(new_session_url) }
      format.json  { head(:ok) }
    end
  end
end
