require 'swagger_helper'

RSpec.describe 'api/v1/logs', type: :request do
  path '/v1/logs' do
    get('get logs') do
      tags 'Logs'
           security [{Bearer: []}]
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
  end
end
