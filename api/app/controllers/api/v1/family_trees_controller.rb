# frozen_string_literal: true

module Api
  module V1
    class FamilyTreesController < ApplicationController
      before_action :authorize_request

      def index
        @family_trees = FamilyTree.all
        render json: @family_trees
      end

      def show
        @family_tree = FamilyTree.find(params[:id])
        render json: @family_tree, include: :family_members
      end

      def create
        @family_tree = FamilyTree.new(family_tree_params)
        if @family_tree.save
          render json: @family_tree, status: :created
        else
          render json: @family_tree.errors, status: :unprocessable_entity
        end
      end

      private

      def family_tree_params
        params.require(:family_tree).permit(:name)
      end
    end
  end
end
