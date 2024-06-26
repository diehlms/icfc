require 'swagger_helper'

RSpec.describe 'api/v1/comments', type: :request do
  path '/v1/comments' do
    get('list comments') do
      tags 'Comments'
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

    post('create comment') do
      tags 'Comments'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :articleIn, in: :body, schema: { "$ref" => "#/components/schemas/commentIn" }
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

  path '/v1/comments/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'

    delete('delete comment') do
      tags 'Comments'
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
