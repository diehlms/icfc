require 'swagger_helper'

RSpec.describe 'api/v1/family_members', type: :request do
  path '/v1/family_members' do
    post('create family_member') do
      tags 'Family Members'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :familyMemberIn, in: :body, schema: { '$ref' => '#/components/schemas/familyMemberIn' }
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

    put('update family_member') do
      tags 'Family Members'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :relationshipArray, in: :body, schema: { '$ref' => '#/components/schemas/relationshipArray' }
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

  path '/v1/family_members/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'
    delete('delete family_member') do
      tags 'Family Members'
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
