require 'net/http'
require 'uri'

module Api
    module V1
        class CaptchaController < ApplicationController
            def verify
                
                token = captcha_params[:token]

                secret_key = ENV.fetch("CAPTCHA_SECRET_KEY")

                uri = URI.parse('https://www.google.com/recaptcha/api/siteverify')

                response = Net::HTTP.post_form(
                    uri,
                    'secret' => secret_key,
                    'response' => token
                )

                result = JSON.parse(response.body)

                puts "RESPONSE: #{result}"

                if result['success']
                    render json: {}, status: :ok
                else
                    render json: { error: 'CAPTCHA verification failed' }, status: :unprocessable_entity
                end
            end

            private

            def captcha_params
              params.permit(:token)
            end
        end
    end
end