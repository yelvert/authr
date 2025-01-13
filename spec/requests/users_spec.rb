require 'swagger_helper'

RSpec.describe 'admin', type: :request do
  describe 'users' do
    global_schema :user_response, {
      name: 'UserResponse',
      type: :object,
      properties: {
        id: { type: :integer },
        name: { type: :string },
        username: { type: :string },
        group_ids: { type: :array, items: { type: :integer } }
      },
      required: %i[ id name username group_ids ]
    }

    create_update_schema = {
      type: :object,
      properties: {
        name: { type: :string },
        username: { type: :string },
        password: { type: :string },
        password_confirmation: { type: :string },
        group_ids: { type: :array, items: { type: :integer } }
      }
    }

    error_schema :user_errors, %i[ name username password password_confirmation group_ids ]

    path '/admin/users' do
      get('list') do
        # operationId :list
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        response(200, 'successful') do
          schema name: 'UsersListResponse', type: :array, items: schema_ref_obj(:user_response)
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end

      post('create') do
        parameter name: :user,
          in: :body,
          schema: {
            type: :object,
            properties: {
              user: create_update_schema.dup.merge(required: %i[ name username password password_confirmation ])
            },
            required: %i[ user ]
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end

        response(200, 'successful') do
          schema schema_ref_obj(:user_response)
          let(:user) { build(:user) }
          run_test!
        end
        response(422, 'unprocessible entitiy') do
          schema schema_ref_obj(:user_errors).merge(name: 'UserCreateErrorResponse')
          let(:user) { User.new }
          run_test!
        end
        response(401, 'unauthorized') do
          run_test!
        end
      end
    end

    path '/admin/users/{id}' do
      parameter name: :id, in: :path, type: :integer

      get('show') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        response(200, 'successful') do
          schema schema_ref_obj(:user_response)
          let(:user) { create(:user) }
          let(:id) { user.id }
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end

      put('update') do
        parameter name: :user,
          in: :body,
          schema: {
            type: :object,
            properties: {
              user: create_update_schema.dup
            },
            required: %i[ user ]
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end

        response(200, 'successful') do
          schema schema_ref_obj(:user_response)
          let(:user) { create(:user) }
          let(:id) { user.id }
          run_test!
        end
        response(422, 'unprocessible entitiy') do
          let(:user) { create(:user) }
          let(:id) { user.id }
          schema schema_ref_obj(:user_errors).merge(name: 'UserCreateErrorResponse')
          run_test!
        end
        response(401, 'unauthorized') do
          run_test!
        end
      end
    end

    path '/admin/users/{id}/groups/{group_id}' do
      parameter name: :id, in: :path, type: :integer
      parameter name: :group_id, in: :path, type: :integer

      put 'add_group' do
        operationId :usersAddGroup
        response 200, 'successful' do
          let(:user) { create(:user) }
          let(:id) { user.id }
          let(:group) { create(:group) }
          let(:group_id) { group.id }
          run_test!
        end
      end

      delete 'remove_group' do
        operationId :usersRemoveGroup
        response 200, 'successful' do
          let(:user) { create(:user) }
          let(:id) { user.id }
          let(:group) { create(:group) }
          let(:group_id) { group.id }
          run_test!
        end
      end
    end
  end
end
