require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_path
    assert_response :success
  end

  test "should get archives" do
    get archives_path
    assert_response :success
  end

  # test "should get landing" do
  #   get landing_url
  #   assert_response :success
  # end
end
