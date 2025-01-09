require 'swagger_helper'

RSpec.describe 'sessions', type: :request do
  path '/session/new' do
    get('new session', document: false) do
      response(200, 'successful') do
        run_test!
      end
    end
  end

  path '/session' do
    post('login') do
      operationId :login
      parameter name: :login, in: :body, schema: {
        type: :object,
        properties: {
          username: { type: :string },
          password: { type: :string }
        },
        required: %w[ username password ]
      }

      response(200, 'successful') do
        let(:user) { create(:user) }
        let(:username) { user.username }
        let(:password) { user.password }
        run_test!
      end

      response(401, 'unauthorized') do
        let(:username) { Faker::Internet.username }
        let(:password) { Faker::Internet.password }
        run_test!
      end
    end
  end

  path '/session/logout' do
    get('delete session') do
      operationId :logout
      response(200, 'successful') do
        run_test!
      end
    end
  end
end
