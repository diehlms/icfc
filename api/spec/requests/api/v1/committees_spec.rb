require 'swagger_helper'

RSpec.describe 'api/v1/committees', type: :request do
  path '/v1/committees' do
    get('list committees') do
      tags 'Committees'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :committeeOut, items: { '$ref' => '#/components/schemas/committeeOut' }

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
