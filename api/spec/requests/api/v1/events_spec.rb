require 'swagger_helper'

RSpec.describe 'api/v1/events', type: :request do
  path '/v1/events' do
    get('list events') do
      tags 'Events'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/eventOut' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    post('create event') do
      tags 'Events'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :eventIn, in: :body, schema: { '$ref' => '#/components/schemas/eventIn' }
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/eventOut'

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/v1/events/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    get('show event') do
      tags 'Events'
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/eventOut'

        let(:id) { '123' }
        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    put('update event') do
      tags 'Events'
      parameter name: :eventIn, in: :body, schema: { '$ref' => '#/components/schemas/eventIn' }
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/eventOut'

        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    delete('delete event') do
      tags 'Events'
      parameter name: :req, in: :body, schema: { '$ref' => '#/components/schemas/createUpdateBaseModel' }
      produces 'application/json'
      consumes 'application/json'
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
