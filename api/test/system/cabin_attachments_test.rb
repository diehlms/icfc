# # frozen_string_literal: true

# require 'application_system_test_case'

# class CabinAttachmentsTest < ApplicationSystemTestCase
#   setup do
#     @cabin_attachment = cabin_attachments(:one)
#   end

#   test 'visiting the index' do
#     visit cabin_attachments_url
#     assert_selector 'h1', text: 'Cabin Attachments'
#   end

#   test 'creating a Cabin attachment' do
#     visit cabin_attachments_url
#     click_on 'New Cabin Attachment'

#     fill_in 'Cabin', with: @cabin_attachment.cabin_id
#     fill_in 'Image', with: @cabin_attachment.image
#     click_on 'Create Cabin attachment'

#     assert_text 'Cabin attachment was successfully created'
#     click_on 'Back'
#   end

#   test 'updating a Cabin attachment' do
#     visit cabin_attachments_url
#     click_on 'Edit', match: :first

#     fill_in 'Cabin', with: @cabin_attachment.cabin_id
#     fill_in 'Image', with: @cabin_attachment.image
#     click_on 'Update Cabin attachment'

#     assert_text 'Cabin attachment was successfully updated'
#     click_on 'Back'
#   end

#   test 'destroying a Cabin attachment' do
#     visit cabin_attachments_url
#     page.accept_confirm do
#       click_on 'Destroy', match: :first
#     end

#     assert_text 'Cabin attachment was successfully destroyed'
#   end
# end
