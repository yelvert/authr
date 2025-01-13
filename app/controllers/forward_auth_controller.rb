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
      return head(:unauthorized) unless authenticate_host_docker(host, current_user)
      return head(
        :ok,
        "X-Authr-User-Id" => current_user.id,
        "X-Authr-User-Username" => current_user.username,
        "X-Authr-User-Name" => current_user.name,
        "X-Authr-Group-Ids" => current_user.groups.to_a.map(&:id).join(","),
        "X-Authr-Group-Names" => current_user.groups.to_a.map(&:name).join(","),
      )
    end
    redirect_to(forward_auth_login_url(rd: uri), allow_other_host: true)
  end

  def login; end

  private def authenticate_host_docker(host, user)
    authr_containers = Docker::Container.all(all: true, filters: { label: [ "authr.host" ] }.to_json).map(&:info)
    host_containers = authr_containers.select { |x| x["Labels"]["authr.host"].split(/,\s?/).include? host }
    raise "Only 1 container should be exist for the authr.host #{host}" if host_containers.count > 1
    host_container = host_containers.first
    return false unless host_container.present?
    allowed_user_ids = host_container["Labels"]["authr.allowed_user_ids"].split(/,\s?/).map(&:to_i)
    allowed_users = host_container["Labels"]["authr.allowed_users"].split(/,\s?/)
    allowed_group_ids = host_container["Labels"]["authr.allowed_group_ids"].split(/,\s?/).map(&:to_i)
    allowed_groups = host_container["Labels"]["authr.allowed_groups"].split(/,\s?/)
    return true if allowed_user_ids.include?(user.id)
    return true if allowed_users.include?(user.username)
    groups = user.groups.to_a
    return true if groups.map(&:id).intersection(allowed_group_ids).present?
    return true if groups.map(&:name).intersection(allowed_groups).present?
    false
  end
end
