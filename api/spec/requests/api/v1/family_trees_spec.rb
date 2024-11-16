require 'swagger_helper'

RSpec.describe 'api/v1/family_trees', type: :request do
  path '/v1/family_trees' do
    get('list family_trees') do
      tags 'Family Trees'
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/familyTreeOut' }

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
      parameter name: :familyTreeIn, in: :body, schema: { '$ref' => '#/components/schemas/familyTreeIn' }
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
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    get('show family_tree') do
      tags 'Family Trees'
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/familyTreeOut'

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
