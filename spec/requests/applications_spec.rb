require 'swagger_helper'

RSpec.describe 'admin', type: :request do
  describe 'applications' do
    global_schema :application_list_response, {
      name: 'AppicationListResponse',
      type: :object,
      properties: {
        id: { type: :integer },
        name: { type: :string },
        hostnames: { type: :array, items: { type: :string } },
        active: { type: :boolean },
        source: { type: :string, enum: %i[ custom docker ] }

      },
      required: %i[ id name hostnames source active ]
    }

    global_schema :application_detail_response, {
      name: 'ApplicationDetailResponse',
      type: :object,
      properties: {
        id: { type: :integer },
        name: { type: :string },
        hostnames: { type: :array, items: { type: :string } },
        active: { type: :boolean },
        source: { type: :string, enum: %i[ custom docker ] },
        groups_custom_ids: { type: :array, items: { type: :integer } },
        groups_generated_ids: { type: :array, items: { type: :integer } },
        users_custom_ids: { type: :array, items: { type: :integer } },
        users_generated_ids: { type: :array, items: { type: :integer } }
      },
      required: %i[ id name hostnames source active groups users groups_custom_ids groups_generated_ids users_custom_ids users_generated_ids ]
    }

    create_update_schema = {
      type: :object,
      properties: {
        name: { type: :string },
        hostnames: { type: :array, items: { type: :string } },
        active: { type: :boolean },
        groups_custom_ids: { type: :array, items: { type: :integer } },
        users_custom_ids: { type: :array, items: { type: :integer } }
      }
    }

    error_schema :application_errors, %i[ name hostnames source active groups_custom_ids users_custom_ids ]

    path '/admin/applications' do
      get('list') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        response(200, 'successful') do
          schema name: 'ApplicationsListResponse', type: :array, items: schema_ref_obj(:application_list_response)
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end

      post('create') do
        parameter name: :application,
          in: :body,
          schema: {
            type: :object,
            properties: {
              application: create_update_schema.dup.merge(required: %i[ name hostnames active ])
            },
            required: %i[ application ]
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end

        response(200, 'successful') do
          schema schema_ref_obj(:application_detail_response)
          let(:application) { build(:application) }
          run_test!
        end
        response(422, 'unprocessible entitiy') do
          schema schema_ref_obj(:application_errors).merge(name: 'ApplicationCreateErrorResponse')
          let(:application) { Application.new }
          run_test!
        end
        response(401, 'unauthorized') do
          run_test!
        end
      end
    end

    path '/admin/applications/{id}' do
      parameter name: :id, in: :path, type: [ :integer, :string ]

      get('show') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        response(200, 'successful') do
          schema schema_ref_obj(:application_detail_response)
          let(:application) { create(:application) }
          let(:id) { application.id }
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end

      put('update') do
        parameter name: :application,
          in: :body,
          schema: {
            type: :object,
            properties: {
              application: create_update_schema.dup
            },
            required: %i[ application ]
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end

        response(200, 'successful') do
          schema schema_ref_obj(:application_detail_response)
          let(:application) { create(:application) }
          let(:id) { application.id }
          run_test!
        end
        response(422, 'unprocessible entitiy') do
          let(:application) { create(:application) }
          let(:id) { application.id }
          schema schema_ref_obj(:application_errors).merge(name: 'ApplicationCreateErrorResponse')
          run_test!
        end
        response(401, 'unauthorized') do
          run_test!
        end
      end

      delete('destroy') do
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        response(204, 'successful') do
          let(:application) { create(:application) }
          let(:id) { application.id }
          run_test!
        end

        response(401, 'unauthorized') do
          run_test!
        end
      end
    end
  end
end
