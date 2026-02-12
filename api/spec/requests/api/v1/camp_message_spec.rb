require 'swagger_helper'

RSpec.describe 'api/v1/camp_messages', type: :request do
  path '/v1/camp_messages' do
    get('list camp_messages') do
      tags 'Camp Messages'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/campMessageOut' }

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

    post('create camp message') do
      tags 'Camp Messages'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :campMessageIn, in: :body, schema: { '$ref' => '#/components/schemas/campMessageIn' }
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/campMessageOut'

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

  path '/v1/camp_messages/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'
    delete('delete camp message') do
      tags 'Camp Messages'
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
