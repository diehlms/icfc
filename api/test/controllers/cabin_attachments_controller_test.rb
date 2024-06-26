# frozen_string_literal: true

require 'test_helper'

class CabinAttachmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cabin_attachment = cabin_attachments(:one)
  end

  test 'should get index' do
    get cabin_attachments_url
    assert_response :success
  end

  test 'should get new' do
    get new_cabin_attachment_url
    assert_response :success
  end

  test 'should show cabin_attachment' do
    get cabin_attachment_url(@cabin_attachment)
    assert_response :success
  end

  test 'should get edit' do
    get edit_cabin_attachment_url(@cabin_attachment)
    assert_response :success
  end

  test 'should update cabin_attachment' do
    patch cabin_attachment_url(@cabin_attachment),
          params: { cabin_attachment: { cabin_id: @cabin_attachment.cabin_id, image: @cabin_attachment.image } }
    assert_redirected_to cabin_attachment_url(@cabin_attachment)
  end

  test 'should destroy cabin_attachment' do
    assert_difference('CabinAttachment.count', -1) do
      delete cabin_attachment_url(@cabin_attachment)
    end

    assert_redirected_to cabin_attachments_url
  end
end
