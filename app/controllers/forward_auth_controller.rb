class ForwardAuthController < ApplicationController
  skip_before_action :login_required!

  def check
    proto = request.headers["HTTP_X_FORWARDED_PROTO"]
    host = request.headers["HTTP_X_FORWARDED_HOST"]
    port = request.headers["HTTP_X_FORWARDED_PORT"]
    path = request.headers["HTTP_X_FORWARDED_URI"]
    uri = URI("#{proto}://#{host}:#{port}#{path}")
    head(:ok, "Remote-User" => current_user.id, "Remote-Name" => current_user.name) if logged_in?
    redirect_to(forward_auth_login_url(rd: uri), allow_other_host: true)
  end

  def login
    return if request.get?
    if user = User.authenticate(params[:username], params[:password])
      set_current_user user
      head(:ok, location: params[:rd])
    else
      head(:unprocessable_entity)
    end
  end
end
