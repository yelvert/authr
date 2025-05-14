class EnvironmentController < ApplicationController
  skip_before_action :login_required!

  def settings
  end
end
