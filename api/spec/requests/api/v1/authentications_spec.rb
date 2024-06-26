require 'swagger_helper'

RSpec.describe 'api/v1/authentications', type: :request do
  path '/v1/auth/login' do
    post('login authentication') do
      tags 'Auth'
      consumes 'application/json'
      produces 'application/json'
      description 'login, get new session'
      parameter name: :loginPayload, in: :body, schema: { "$ref" => "#/components/schemas/loginPayload" }
      response(200, 'successful') do
        schema "$ref" => "#/components/schemas/loginPayload"
        let!(:loginPayload) {
          {
            email: "test@gmail.com"
          }
        }
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

  path '/v1/auth/signup' do
    post('signup authentication') do
      tags 'Auth'
      consumes 'application/json'
      produces 'application/json'
      description 'sign up'
      parameter name: :signupPayload, in: :body, schema: { "$ref" => "#/components/schemas/signupPayload" }
      response(200, 'successful') do
        schema "$ref" => "#/components/schemas/signupPayload"
        let!(:signupPayload) {
          {
            username: "test",
            email: "test@gmail.com",
            phoneNumber: "1234567890",
            firstName: "test",
            lastName: "test",
            password: "test",
            passwordConfirmation: "test"
          }
        }
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
