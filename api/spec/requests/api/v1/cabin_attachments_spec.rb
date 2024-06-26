require 'swagger_helper'

RSpec.describe 'api/v1/cabin_attachments', type: :request do
  path '/v1/cabin_attachments' do
    get('list cabin_attachments') do
      tags 'Cabin Attachments'
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

    post('create cabin_attachment') do
      tags 'Cabin Attachments'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :articleIn, in: :body, schema: { "$ref" => "#/components/schemas/cabinAttachmentIn" }
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

  path '/v1/cabin_attachments/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show cabin_attachment') do
      tags 'Cabin Attachments'
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

    delete('delete cabin_attachment') do
      tags 'Cabin Attachments'
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
