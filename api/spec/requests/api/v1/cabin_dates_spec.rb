require 'swagger_helper'

RSpec.describe 'api/v1/cabin_dates', type: :request do
  path '/v1/cabin_dates' do
    post('create cabin_date') do
      tags 'Cabin Dates'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :articleIn, in: :body, schema: { "$ref" => "#/components/schemas/cabinDateIn" }
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
    delete('delete cabin_date') do
      tags 'Cabin Dates'
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
