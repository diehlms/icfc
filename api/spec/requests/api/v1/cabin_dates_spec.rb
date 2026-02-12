require 'swagger_helper'

RSpec.describe 'api/v1/cabin_dates', type: :request do
  path '/v1/cabin_dates' do
    post('create cabin_date') do
      tags 'Cabin Dates'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :cabinDateIn, in: :body, schema: { '$ref' => '#/components/schemas/cabinDateIn' }
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

  path '/v1/cabin_dates/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    delete('delete cabin_date') do
      tags 'Cabin Dates'
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
