class Admin::UsersController < Admin::ApplicationController
  before_action :set_user, only: %i[ show update destroy add_group remove_group ]
  before_action :set_group, only: %i[ add_group remove_group ]

  def index
    @users = User.all
  end

  def show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :show, status: :created, location: [ :admin, @user ]
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render :show, status: :ok, location: [ :admin, @user ]
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy!
    head :no_content
  end

  def add_group
    @user.groups << @group
    head(:ok)
  end

  def remove_group
    @user.groups.destroy(@group)
    head(:ok)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params.expect(:id))
    end

    def set_group
      @group = Group.find(params.expect(:group_id))
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.expect(user: %i[ name username password password_confirmation admin ])
    end
end
