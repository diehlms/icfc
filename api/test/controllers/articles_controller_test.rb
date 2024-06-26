# frozen_string_literal: true

require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  test 'should get articles' do
    @user = users(:diehl)
    log_in_as(@user)
    get articles_url
    assert_response :success
  end
end
