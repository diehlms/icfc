require 'swagger_helper'

RSpec.describe 'api/v1/galleries', type: :request do
  path '/v1/galleries' do
    get('list galleries') do
      tags 'Galleries'
           security [{Bearer: []}]
      consumes 'application/json'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/galleryOut' }

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

    post('create gallery') do
      tags 'Galleries'
           security [{Bearer: []}]
      produces 'application/json'
      parameter name: :galleryIn, in: :body, schema: { '$ref' => '#/components/schemas/galleryIn' }
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

  path '/v1/galleries/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    delete('delete gallery') do
      tags 'Galleries'
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
