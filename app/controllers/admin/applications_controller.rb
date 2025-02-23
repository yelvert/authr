class Admin::ApplicationsController < Admin::ApplicationController
  before_action :set_application, only: %i[ show update destroy ]

  def index
    @applications = Application.all
  end

  def show
  end

  def create
    @application = Application.new(application_params)

    if @application.save
      render :show, status: :created, location: [ :admin, @application ]
    else
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  def update
      if @application.update(application_params)
        render :show, status: :ok, location: [ :admin, @application ]
      else
        render json: @application.errors, status: :unprocessable_entity
      end
  end

  def destroy
    @application.destroy!
    head :no_content
  end

  def add_user
    @application.users << @user
    head(:ok)
  end

  def remove_user
    @application.users.destroy(@user)
    head(:ok)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_application
      @application = Application.find(params.expect(:id))
    end

    def set_user
      @user = User.find(prams.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def application_params
      params.expect(application: %i[ name active ].concat([ hostnames: [], groups_custom_ids: [], users_custom_ids: [] ]))
    end
end
