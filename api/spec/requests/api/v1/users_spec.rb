require 'swagger_helper'

RSpec.describe 'api/v1/users', type: :request do
  path '/v1/users' do
    get('list users') do
      tags 'Users'
           security [{Bearer: []}]
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

  path '/v1/users/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    get('show user') do
      tags 'Users'
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


    put('update user') do
      tags 'Users'
      security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :userUpdate, in: :body, schema: { '$ref' => '#/components/schemas/userUpdate' }
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

    delete('delete user') do
      tags 'Users'
           security [{Bearer: []}]
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
