class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :login_required!

  def current_user
    @current_user ||= User.where(id: session[:user_id]).first
  end

  def logged_in? = current_user.present?

  def login_required!
    logged_in? || redirect_to(new_session_url)
  end
end
