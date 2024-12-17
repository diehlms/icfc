require 'swagger_helper'

RSpec.describe 'api/v1/maintenance', type: :request do
  path '/v1/toggle_maintenance' do
    post('toggle maintenance_mode') do
      tags 'Maintenance'
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
