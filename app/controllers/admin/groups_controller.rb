class Admin::GroupsController < Admin::ApplicationController
  before_action :set_group, only: %i[ show edit update destroy add_user remove_user ]
  before_action :set_user, only: %i[ add_user remove_user ]

  def index
    @groups = Group.all
    render json:
  end

  def show
  end

  def create
    @group = Group.new(group_params)

    if @group.save
      render :show, status: :created, location: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def update
      if @group.update(group_params)
        render :show, status: :ok, location: @group
      else
        render json: @group.errors, status: :unprocessable_entity
      end
  end

  # DELETE /groups/1 or /groups/1.json
  def destroy
    @group.destroy!
    head :no_content
  end

  def add_user
    @group.users << @user
    head(:ok)
  end

  def remove_user
    @group.users.destroy(@user)
    head(:ok)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params.expect(:id))
    end

    def set_user
      @user = User.find(prams.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def group_params
      params.expect(group: %i[ name ])
    end
end
