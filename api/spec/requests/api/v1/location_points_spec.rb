require 'swagger_helper'

RSpec.describe 'api/v1/location_points', type: :request do
  path '/v1/location_points' do
    get('list location_points') do
      tags 'Location Points'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
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

    post('create location_point') do
      tags 'Location Points'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :locationPointIn, in: :body, schema: { '$ref' => '#/components/schemas/locationPointIn' }
      response(200, 'successful') do
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

  path '/v1/location_points/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    delete('delete location_point') do
      tags 'Location Points'
           security [{Bearer: []}]
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
