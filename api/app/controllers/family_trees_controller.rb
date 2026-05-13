# typed: true
# frozen_string_literal: true

class FamilyTreesController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!, only: %i[new create destroy]
  before_action :set_family_tree, only: %i[show destroy]
  before_action :require_owner!, only: %i[destroy]

  def index
    @family_trees = FamilyTree.includes(:user).all
    @family_tree = FamilyTree.new
  end

  def show
    @members = @family_tree.family_members.order(:name)
  end

  def create
    @family_tree = FamilyTree.new(name: params[:family_tree][:name], user_id: current_user.id)
    if @family_tree.save
      redirect_to @family_tree, notice: 'Family tree created.'
    else
      @family_trees = FamilyTree.includes(:user).all
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    @family_tree.destroy
    redirect_to family_trees_path, notice: 'Family tree deleted.'
  end

  private

  def set_family_tree
    @family_tree = FamilyTree.find(params[:id])
  end

  def require_owner!
    unless @family_tree.user_id == current_user.id || current_user.admin?
      redirect_to family_trees_path, alert: 'Not authorized.'
    end
  end
end
