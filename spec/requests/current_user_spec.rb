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
  end
end
