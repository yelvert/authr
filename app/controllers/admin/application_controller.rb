class Admin::ApplicationController < ApplicationController
  before_action :admin_required!

  def is_admin? = current_user.admin?

  def admin_required!
    is_admin? || respond_to do |format|
      format.html { redirect_to(new_session_url) }
      format.json  { head(:unauthorized) }
    end
  end
end
