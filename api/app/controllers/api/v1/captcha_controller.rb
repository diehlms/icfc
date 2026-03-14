# typed: true
# frozen_string_literal: true

module Api
  module V1
    class CaptchaController < ApplicationController
      extend T::Sig

      sig { void }
      def verify
        if CaptchaService.verify(params[:token].to_s)
          render json: { success: true }
        else
          render json: { success: false, error: 'Captcha verification failed' }, status: :unprocessable_entity
        end
      end
    end
  end
end
