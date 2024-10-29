# frozen_string_literal: true

module Api
  module V1
    class FamilyMembersController < ApplicationController
      before_action :authorize_request
      before_action :family_member, only: %i[destroy]
      before_action :check_authorization, only: %i[destroy]

      def create
        family_members_data = params.permit!.to_h

        family_members_data['_json'].each do |family_member_data|
          # Find by unique identifier (assuming `name` is unique)
          family_member = FamilyMember.find_or_initialize_by(name: family_member_data[:name])

          family_member.assign_attributes(
            relationship: family_member_data[:relationship],
            family_tree_id: family_member_data[:family_tree_id]
          )

          # Save the record only if it is new or has changes
          next unless family_member.changed? && !family_member.save

          render json: { error: "Failed to save family member #{family_member.name}" },
                 status: :unprocessable_entity
          return
        end

        render json: { message: 'Family members synced successfully' }, status: :ok
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      def update
        relationships = params.permit!.to_h

        # Loop through each relationship (each hash in the array)
        relationships['_json'].each do |relationship|
          child_id = relationship['child']
          parent_id = relationship['parent']

          child = FamilyMember.find_by_id(child_id)
          parent = FamilyMember.find_by_id(parent_id)

          render json: { error: 'Child or Parent not found' }, status: :not_found && return if child.nil? || parent.nil?

          child.parent_ids = [] unless child.parent_ids

          # Ensure that the child has at most two parents
          if child.parent_ids.count >= 2 && !child.parent_ids.include?(parent.id)
            render json: { error: "#{child.name} already has two parents" }, status: :unprocessable_entity && return
          end

          # Append the new parent to the parent_ids array without affecting existing relationships
          new_parent_ids = (child.parent_ids << parent.id).uniq
          child.update!(parent_ids: new_parent_ids)
        end

        render json: { message: 'Family tree relationships updated successfully' }, status: :ok
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def destroy
        @family_member = FamilyMember.find(params[:id])

        if @family_member.destroy
          render json: { message: 'Family member deleted succesfully' }, status: :ok
        else
          render json: @family_member.errors
        end
      end

      private

      def family_member_params
        params.permit(:family_members, :name, :relationship, :family_tree_id, :parent_ids, :relationships)
      end
    end
  end
end
