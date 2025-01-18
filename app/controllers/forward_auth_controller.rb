class ForwardAuthController < ApplicationController
  skip_before_action :login_required!

  def index
    proto = request.headers["HTTP_X_FORWARDED_PROTO"]
    host = request.headers["HTTP_X_FORWARDED_HOST"]
    port = request.headers["HTTP_X_FORWARDED_PORT"]
    path = request.headers["HTTP_X_FORWARDED_URI"]
    uri = URI("#{proto}://#{host}:#{port}#{path}")
    logger.info "Forward auth: #{uri}"
    if logged_in?
      if authenticate_application(host, current_user)
        return head(
          :ok,
          "X-Authr-User-Id" => current_user.id,
          "X-Authr-User-Username" => current_user.username,
          "X-Authr-User-Name" => current_user.name,
          "X-Authr-Group-Ids" => current_user.groups.to_a.map(&:id).join(","),
          "X-Authr-Group-Names" => current_user.groups.to_a.map(&:name).join(","),
        )
      else
        reset_session
        return redirect_to(forward_auth_login_url(rd: uri, unauthorized: true), allow_other_host: true)
      end
    end
    redirect_to(forward_auth_login_url(rd: uri), allow_other_host: true)
  end

  def login
    reset_session
  end

  private def authenticate_application(host, user)
    @application = Application.for_hostname(host).first
    return false unless @application
    return true if @application.application_groups.where(group_id: user.group_ids).exists?
    return true if @application.application_users.where(user_id: user.id).exists?
    false
  end
end
