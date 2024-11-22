require 'swagger_helper'

RSpec.describe 'api/v1/cabins', type: :request do
  path '/v1/cabins' do
    get('list cabins') do
      tags 'Cabins'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/cabinOut' }

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

    post('create cabin') do
      tags 'Cabins'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :cabinIn, in: :body, schema: { '$ref' => '#/components/schemas/cabinIn' }
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/cabinOut'

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

  path '/v1/cabins/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'
    get('show cabin') do
      tags 'Cabins'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/cabinOut'

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

    put('update cabin') do
      tags 'Cabins'
           security [{Bearer: []}]
      parameter name: :cabinUpdate, in: :body, schema: { '$ref' => '#/components/schemas/cabinUpdate' }
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/cabinOut'

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

    delete('delete cabin') do
      tags 'Cabins'
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
