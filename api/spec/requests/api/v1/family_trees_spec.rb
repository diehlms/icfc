require 'swagger_helper'

RSpec.describe 'api/v1/family_trees', type: :request do
  path '/v1/family_trees' do
    get('list family_trees') do
      tags 'Family Trees'
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

    post('create family_tree') do
      tags 'Family Trees'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :familyTreeIn, in: :body, schema: { "$refs" => "#/components/schemas/familyTreeIn"}
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

  path '/v1/family_trees/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show family_tree') do
      tags 'Family Trees'
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

    patch('update family_tree') do
      tags 'Family Trees'
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

    put('update family_tree') do
      tags 'Family Trees'
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

    delete('delete family_tree') do
      tags 'Family Trees'
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
