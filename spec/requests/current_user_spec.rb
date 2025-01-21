require 'swagger_helper'

RSpec.describe 'current_user', type: :request do
  path '/current_user' do
    get('whoami') do
      operationId :Whoami
      after do |example|
        example.metadata[:response][:content] = {
          'application/json' => {
            example: JSON.parse(response.body, symbolize_names: true)
          }
        }
      end
      response(200, 'successful') do
        schema name: :CurrentUserWhoamiResponse,
          type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            username: { type: :string }
          },
          required: %i[ id name username ]
        run_test!
      end

      response(401, 'unauthorized') do
        run_test!
      end
    end

    put('update') do
      parameter name: :current_user,
        in: :body,
        schema: {
          type: :object,
          properties: {
            current_user: {
              type: :object,
              properties: {
                name: { type: :string },
                username: { type: :string },
                password: { type: :string },
                password_confirmation: { type: :string }
              }
            }
          },
          required: %i[ current_user ]
        }

      after do |example|
        example.metadata[:response][:content] = {
          'application/json' => {
            example: JSON.parse(response.body, symbolize_names: true)
          }
        }
      end

      response(200, 'successful') do
        schema name: 'CurrentUserUpdateResponse',
          type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            username: { type: :string }
          },
          required: %i[ id name username ]

        let(:current_user) { create(:user) }
        let(:id) { current_user.id }
        run_test!
      end
      response(422, 'unprocessible entitiy') do
        let(:current_user) { create(:user) }
        let(:id) { current_user.id }
        schema(error_schema(:current_user_update_errors, %i[ name username password password_confirmation ]))
        run_test!
      end
      response(401, 'unauthorized') do
        run_test!
      end
    end
  end
end
