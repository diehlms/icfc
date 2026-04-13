# typed: true
# frozen_string_literal: true

class FamilyMembersController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!
  before_action :set_family_tree

  def edit
    @member = @family_tree.family_members.find(params[:id])
    @all_members = @family_tree.family_members.where.not(id: @member.id).order(:name)
  end

  def create
    @member = @family_tree.family_members.build(member_params.merge(user_id: current_user.id))
    if @member.save
      redirect_to @family_tree, notice: 'Member added.'
    else
      redirect_to @family_tree, alert: @member.errors.full_messages.join(', ')
    end
  end

  def update
    @member = @family_tree.family_members.find(params[:id])
    if @member.update(member_params)
      redirect_to @family_tree, notice: 'Member updated.'
    else
      redirect_to @family_tree, alert: @member.errors.full_messages.join(', ')
    end
  end

  def destroy
    @member = @family_tree.family_members.find(params[:id])
    @member.destroy
    redirect_to @family_tree, notice: 'Member removed.'
  end

  private

  def set_family_tree
    @family_tree = FamilyTree.find(params[:family_tree_id])
  end

  def member_params
    params.require(:family_member).permit(:name, :date_of_birth, :relationship, parent_ids: [])
  end
end
