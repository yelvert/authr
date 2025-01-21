class ApplicationController < ActionController::Base
  skip_forgery_protection
  before_action :login_required!

  layout :false

  helper_method :current_user

  def current_user
    @current_user ||= User.where(id: session[:user_id]).first
  end

  def set_current_user(user)
    @current_user = user
  end

  def logged_in? = current_user.present?

  def login_required!
    logged_in? || respond_to do |format|
      format.html { redirect_to(new_session_url) }
      format.json  { head(:unauthorized) }
    end
  end
end
