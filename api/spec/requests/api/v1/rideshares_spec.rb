require 'swagger_helper'

RSpec.describe 'api/v1/rideshares', type: :request do
  path '/v1/rideshares' do
    get('list rideshares') do
      tags 'Rideshares'
           security [{Bearer: []}]
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/rideshareOut' }

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

    post('create rideshare') do
      tags 'Rideshares'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :rideshareIn, in: :body, schema: { '$ref' => '#/components/schemas/rideshareIn' }
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/rideshareOut'

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

  path '/v1/rideshares/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'
    get('show rideshare') do
      tags 'Rideshares'
           security [{Bearer: []}]
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/rideshareOut'

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

    put('update rideshare') do
      tags 'Rideshares'
           security [{Bearer: []}]
      parameter name: :rideshareIn, in: :body, schema: { '$ref' => '#/components/schemas/rideshareIn' }
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/rideshareOut'

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

    delete('delete rideshare') do
      tags 'Rideshares'
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
