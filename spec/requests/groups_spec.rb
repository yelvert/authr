require 'swagger_helper'

RSpec.describe 'admin', type: :request do
  describe 'groups' do
    global_schema :group_response, {
      name: 'GroupResponse',
      type: :object,
      properties: {
        id: { type: :integer },
        name: { type: :string }
      },
      required: %i[ id name ]
    }

    create_update_schema = {
      type: :object,
      properties: {
        name: { type: :string }
      }
    }

    error_schema :group_errors, %i[ name ]

    path '/admin/groups' do
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
          schema name: 'GroupsListResponse', type: :array, items: schema_ref_obj(:group_response)
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end

      post('create') do
        parameter name: :group,
          in: :body,
          schema: {
            type: :object,
            properties: {
              group: create_update_schema.dup.merge(required: %i[ name ])
            },
            required: %i[ group ]
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end

        response(200, 'successful') do
          schema schema_ref_obj(:group_response)
          let(:group) { build(:group) }
          run_test!
        end
        response(422, 'unprocessible entitiy') do
          schema schema_ref_obj(:group_errors).merge(name: 'GroupCreateErrorResponse')
          let(:group) { Group.new }
          run_test!
        end
        response(401, 'unauthorized') do
          run_test!
        end
      end
    end

    path '/admin/groups/{id}' do
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
          schema schema_ref_obj(:group_response)
          let(:group) { create(:group) }
          let(:id) { group.id }
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end

      put('update') do
        parameter name: :group,
          in: :body,
          schema: {
            type: :object,
            properties: {
              group: create_update_schema.dup
            },
            required: %i[ group ]
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end

        response(200, 'successful') do
          schema schema_ref_obj(:group_response)
          let(:group) { create(:group) }
          let(:id) { group.id }
          run_test!
        end
        response(422, 'unprocessible entitiy') do
          let(:group) { create(:group) }
          let(:id) { group.id }
          schema schema_ref_obj(:group_errors).merge(name: 'GroupCreateErrorResponse')
          run_test!
        end
        response(401, 'unauthorized') do
          run_test!
        end
      end
    end

    path '/admin/groups/{id}/users/{user_id}' do
      parameter name: :id, in: :path, type: :integer
      parameter name: :user_id, in: :path, type: :integer

      put 'add_user' do
        operationId :groupsAddUser
        response 200, 'successful' do
          let(:group) { create(:group) }
          let(:id) { group.id }
          let(:user) { create(:user) }
          let(:user_id) { user.id }
          run_test!
        end
      end

      delete 'remove_user' do
        operationId :groupsRemoveUser
        response 200, 'successful' do
          let(:group) { create(:group) }
          let(:id) { group.id }
          let(:user) { create(:user) }
          let(:user_id) { user.id }
          run_test!
        end
      end
    end
  end
end
