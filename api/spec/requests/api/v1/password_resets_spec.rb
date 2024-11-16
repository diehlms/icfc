require 'swagger_helper'

RSpec.describe 'api/v1/password_resets', type: :request do
  path '/v1/password_resets' do
    post('create password_reset') do
      tags 'Password Resets'
      parameter name: :email, in: :query, type: :string
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

    put('update password') do
      tags 'Password Resets'
      parameter name: :passwordResetPayload, in: :body,
                schema: { '$ref' => '#/components/schemas/passwordResetPayload' }
      consumes 'application/json'
      produces 'application/json'
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

  path '/v1/password_resets/init_reset_password' do
    get('show password_reset') do
      tags 'Password Resets'
      parameter name: :password_reset_token, in: :query, type: :string, description: 'password_reset_token'
      consumes 'application/json'
      produces 'application/json'
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
