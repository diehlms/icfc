# frozen_string_literal: true

module Api
  module V1
    class FamilyTreesController < ApplicationController
      before_action :authorize_request
      before_action :check_authorization, only: %i[destroy]

      def index
        @family_trees = FamilyTree.all
        render json: @family_trees, each_serializer: FamilyTreeSerializer
      end

      def show
        if family_tree
          render json: family_tree, serializer: FamilyTreeSerializer
        else
          render json: { errors: @article.errors.full_messages }, status: :not_found
        end
      end

      def create
        @family_tree = FamilyTree.new(family_tree_params)
        if @family_tree.save
          render json: @family_tree, status: :created
        else
          render json: { errors: @family_tree.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @family_tree = FamilyTree.find(params[:id])
        if @family_tree.destroy
          render json: {}
        else
          render json: @family_tree.errors, status: :unprocessable_entity
        end
      end

      private

      def family_tree
        @family_tree ||= FamilyTree.find(params[:id])
      end

      def family_tree_params
        params.require(:family_tree).permit(:name, :user_id)
      end
    end
  end
end
