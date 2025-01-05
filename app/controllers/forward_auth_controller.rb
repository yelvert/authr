class ForwardAuthController < ApplicationController
  skip_before_action :login_required!

  layout false

  def index
    proto = request.headers["HTTP_X_FORWARDED_PROTO"]
    host = request.headers["HTTP_X_FORWARDED_HOST"]
    port = request.headers["HTTP_X_FORWARDED_PORT"]
    path = request.headers["HTTP_X_FORWARDED_URI"]
    uri = URI("#{proto}://#{host}:#{port}#{path}")
    return head(:ok, "Remote-User" => current_user.id, "Remote-Name" => current_user.name) if logged_in?
    redirect_to(forward_auth_login_url(rd: uri), allow_other_host: true)
  end

  def login; end
end
