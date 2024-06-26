require 'swagger_helper'

RSpec.describe 'api/v1/search', type: :request do
  path '/v1/search' do
    post('create search') do
      tags 'Search'
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
end