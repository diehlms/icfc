# frozen_string_literal: true

require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event = events(:one)
  end

  # test "should get index" do
  #   log_in_as(user, password: 'password', remember_me: '1')
  #   get events_url
  #   assert_response :success
  # end

  # test "should get new" do
  #   log_in_as(user, password: 'password', remember_me: '1')
  #   get new_event_url
  #   assert_response :success
  # end

  # test "should show event" do
  #   log_in_as(user, password: 'password', remember_me: '1')
  #   get event_url(@event)
  #   assert_response :success
  # end

  # test "should get edit" do
  #   log_in_as(user, password: 'password', remember_me: '1')
  #   get edit_event_url(@event)
  #   assert_response :success
  # end

  # test "should destroy event" do
  #   log_in_as(user, password: 'password', remember_me: '1')
  #   assert_difference('Event.count', -1) do
  #     delete event_url(@event)
  #   end

  #   assert_redirected_to events_url
  # end
end
