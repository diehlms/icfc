require 'test_helper'

class CabinsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @admin = users(:admin)
    @cabin = cabins(:one)
    @token = generate_token(@user)
    @admin_token = generate_token(@admin)
  end

  test "should get index" do
    get api_v1_cabins_url, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
    assert_includes @response.content_type, 'application/json'
  end

  test "should get index with pagination" do
    get api_v1_cabins_url, params: { page: 1 }, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
    Cabins = JSON.parse(@response.body)
    assert Cabins.is_a?(Array)
  end

  test "should create cabin" do
    assert_difference('cabin.count') do
      post api_v1_cabins_url, params: { 
        cabin: { 
          title: "New cabin", 
          content: "New cabin content",
          user_id: @user.id 
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :success
    cabin = JSON.parse(@response.body)
    assert_equal "New cabin", cabin['title']
    assert_equal "New cabin content", cabin['content']
  end

  test "should not create cabin with invalid params" do
    assert_no_difference('cabin.count') do
      post api_v1_cabins_url, params: { 
        cabin: { 
          title: "", 
          content: "",
          user_id: @user.id 
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :unprocessable_entity
    errors = JSON.parse(@response.body)
    assert errors['errors'].any?
  end

  test "should not create cabin with title too long" do
    assert_no_difference('cabin.count') do
      post api_v1_cabins_url, params: { 
        cabin: { 
          title: "a" * 51, 
          content: "Valid content",
          user_id: @user.id 
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :unprocessable_entity
  end

  test "should not create cabin with content too long" do
    assert_no_difference('cabin.count') do
      post api_v1_cabins_url, params: { 
        cabin: { 
          bedrooms: 20
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :unprocessable_entity
  end

  test "should show cabin" do
    get api_v1_cabin_url(@cabin), headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
    cabin = JSON.parse(@response.body)
    assert_equal @cabin.title, cabin['title']
  end

  test "should not show non-existent cabin" do
    assert_raises(ActiveRecord::RecordNotFound) do
      get api_v1_cabin_url(999999), headers: { 'Authorization' => "Bearer #{@token}" }
    end
  end

  test "should update cabin" do
    patch api_v1_cabin_url(@cabin), params: { 
      cabin: { 
        title: "Updated Title", 
        content: "Updated content" 
      },
    }, headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :success
    response_data = JSON.parse(@response.body)
    assert_equal "cabin updated!", response_data['message']
    
    @cabin.reload
    assert_equal "Updated Title", @cabin.title
    assert_equal "Updated content", @cabin.content
  end

  test "should not update cabin with invalid params" do
    patch api_v1_cabin_url(@cabin), params: { 
      cabin: { 
        title: "", 
        content: "" 
      },
    },
    headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :unprocessable_entity
    errors = JSON.parse(@response.body)
    assert errors['errors'].any?
  end

  test "should not update another user's cabin" do
    other_cabin = Cabins(:two)
    patch api_v1_cabin_url(other_cabin), params: { 
      cabin: { 
        title: "Unauthorized Update" 
      } 
    }, headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :forbidden
  end

  test "should destroy cabin" do
    assert_difference('cabin.count', -1) do
      delete api_v1_cabin_url(@cabin), headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :success
    response_data = JSON.parse(@response.body)
    assert_equal "Post deleted!", response_data['message']
  end

  test "should not destroy another user's cabin" do
    other_cabin = Cabins(:two)
    assert_no_difference('cabin.count') do
      delete api_v1_cabin_url(other_cabin), headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :forbidden
  end

  test "should require authentication for index" do
    get api_v1_cabins_url
    assert_response :unauthorized
  end

  test "should require authentication for create" do
    post api_v1_cabins_url, params: { 
      cabin: { 
        title: "Unauthorized cabin", 
        content: "Content"
      } 
    }
    assert_response :unauthorized
  end

  test "should require authentication for show" do
    get api_v1_cabin_url(@cabin)
    assert_response :unauthorized
  end

  test "should require authentication for update" do
    patch api_v1_cabin_url(@cabin), params: { 
      cabin: { title: "Unauthorized Update" } 
    }
    assert_response :unauthorized
  end

  test "should require authentication for destroy" do
    delete api_v1_cabin_url(@cabin)
    assert_response :unauthorized
  end

  test "should return JSON content type" do
    get api_v1_cabins_url, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_includes @response.content_type, 'application/json'
  end

  private

  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end
end
