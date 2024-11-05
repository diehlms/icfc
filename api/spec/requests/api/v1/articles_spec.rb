require 'swagger_helper'

RSpec.describe 'api/v1/articles', type: :request do
  path '/v1/articles' do
    get('list articles') do
      tags 'Articles'
      parameter name: :page, in: :query, type: :integer, description: 'Page number for pagination'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/articleOut' }

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

    post('create article') do
      tags 'Articles'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :articleIn, in: :body, schema: { '$ref' => '#/components/schemas/articleIn' }
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/articleOut'

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

  path '/v1/articles/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'
    get('show article') do
      tags 'Articles'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/articleOut'

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

    put('update article') do
      tags 'Articles'
      parameter name: :articleUpdate, in: :body, schema: { '$ref' => '#/components/schemas/articleUpdate' }
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/articleOut'

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

    delete('delete article') do
      tags 'Articles'
      parameter name: :req, in: :body, schema: { '$ref' => '#/components/schemas/createUpdateBaseModel' }
      consumes 'application/json'
      produces 'application/json'
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
