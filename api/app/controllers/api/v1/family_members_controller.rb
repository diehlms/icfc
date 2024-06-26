# frozen_string_literal: true

module Api
  module V1
    class FamilyMembersController < ApplicationController
      before_action :authorize_request

      def create
        @family_member = FamilyMember.new(family_member_params)
        if @family_member.save
          render json: @family_member, status: :created
        else
          render json: @family_member.errors, status: :unprocessable_entity
        end
      end

      private

      def family_member_params
        params.require(:family_member).permit(:name, :relationship, :family_tree_id, :parent_id)
      end
    end
  end
end
