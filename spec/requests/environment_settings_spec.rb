require 'swagger_helper'

RSpec.describe 'environment_settings', type: :request do
  path '/environment/settings' do
    get('environment settings') do
      operationId :environment_settings
      after do |example|
        example.metadata[:response][:content] = {
          'application/json' => {
            example: JSON.parse(response.body, symbolize_names: true)
          }
        }
      end
      response(200, 'successful') do
        schema name: :EnvironmentSettingsResponse,
          type: :object,
          properties: {
            site_name: { type: :string }
          },
          required: %i[ site_name ]
        run_test!
      end
    end
  end
end
