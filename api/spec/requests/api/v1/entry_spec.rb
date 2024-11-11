require 'swagger_helper'

RSpec.describe 'api/v1/entry', type: :request do
  path '/v1/entry/initial_payload' do
    get('get initial payload') do
      tags 'Entry'
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
