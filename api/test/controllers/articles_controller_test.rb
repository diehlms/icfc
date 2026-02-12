require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @admin = users(:admin)
    @article = articles(:one)
    @token = generate_token(@user)
    @admin_token = generate_token(@admin)
  end

  test "should get index" do
    get api_v1_articles_url, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
    assert_includes @response.content_type, 'application/json'
  end

  test "should get index with pagination" do
    get api_v1_articles_url, params: { page: 1 }, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
    articles = JSON.parse(@response.body)
    assert articles.is_a?(Array)
  end

  test "should create article" do
    assert_difference('Article.count') do
      post api_v1_articles_url, params: { 
        article: { 
          title: "New Article", 
          content: "New article content",
          user_id: @user.id 
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :success
    article = JSON.parse(@response.body)
    assert_equal "New Article", article['title']
    assert_equal "New article content", article['content']
  end

  test "should not create article with invalid params" do
    assert_no_difference('Article.count') do
      post api_v1_articles_url, params: { 
        article: { 
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

  test "should not create article with title too long" do
    assert_no_difference('Article.count') do
      post api_v1_articles_url, params: { 
        article: { 
          title: "a" * 51, 
          content: "Valid content",
          user_id: @user.id 
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :unprocessable_entity
  end

  test "should not create article with content too long" do
    assert_no_difference('Article.count') do
      post api_v1_articles_url, params: { 
        article: { 
          title: "Valid Title", 
          content: "a" * 50_001,
          user_id: @user.id 
        } 
      }, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :unprocessable_entity
  end

  test "should show article" do
    get api_v1_article_url(@article), headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
    article = JSON.parse(@response.body)
    assert_equal @article.title, article['title']
  end

  test "should not show non-existent article" do
    assert_raises(ActiveRecord::RecordNotFound) do
      get api_v1_article_url(999999), headers: { 'Authorization' => "Bearer #{@token}" }
    end
  end

  test "should update article" do
    patch api_v1_article_url(@article), params: { 
      article: { 
        title: "Updated Title", 
        content: "Updated content" 
      },
    }, headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :success
    response_data = JSON.parse(@response.body)
    assert_equal "Article updated!", response_data['message']
    
    @article.reload
    assert_equal "Updated Title", @article.title
    assert_equal "Updated content", @article.content
  end

  test "should not update article with invalid params" do
    patch api_v1_article_url(@article), params: { 
      article: { 
        title: "", 
        content: "" 
      },
    },
    headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :unprocessable_entity
    errors = JSON.parse(@response.body)
    assert errors['errors'].any?
  end

  test "should not update another user's article" do
    other_article = articles(:two)
    patch api_v1_article_url(other_article), params: { 
      article: { 
        title: "Unauthorized Update" 
      } 
    }, headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :forbidden
  end

  test "should destroy article" do
    assert_difference('Article.count', -1) do
      delete api_v1_article_url(@article), headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :success
    response_data = JSON.parse(@response.body)
    assert_equal "Post deleted!", response_data['message']
  end

  test "should not destroy another user's article" do
    other_article = articles(:two)
    assert_no_difference('Article.count') do
      delete api_v1_article_url(other_article), headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :forbidden
  end

  test "should upload image" do
    # Create a simple test file
    file = fixture_file_upload('../test_image.jpg', 'image/jpeg')
    
    patch upload_image_api_v1_article_url(@article), params: { 
      article: { 
        image: file
      } 
    }, headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :success
    response_data = JSON.parse(@response.body)
    assert_equal "Image uploaded successfully", response_data['message']
  end

  test "should not upload image to another user's article" do
    other_article = articles(:two)
    file = fixture_file_upload('../test_image.jpg', 'image/jpeg')
    
    patch upload_image_api_v1_article_url(other_article), params: { 
      article: { 
        image: file
      } 
    }, headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :forbidden
  end

  test "should require authentication for index" do
    get api_v1_articles_url
    assert_response :unauthorized
  end

  test "should require authentication for create" do
    post api_v1_articles_url, params: { 
      article: { 
        title: "Unauthorized Article", 
        content: "Content"
      } 
    }
    assert_response :unauthorized
  end

  test "should require authentication for show" do
    get api_v1_article_url(@article)
    assert_response :unauthorized
  end

  test "should require authentication for update" do
    patch api_v1_article_url(@article), params: { 
      article: { title: "Unauthorized Update" } 
    }
    assert_response :unauthorized
  end

  test "should require authentication for destroy" do
    delete api_v1_article_url(@article)
    assert_response :unauthorized
  end

  test "should require authentication for upload_image" do
    file = fixture_file_upload('../test_image.jpg', 'image/jpeg')
    patch upload_image_api_v1_article_url(@article), params: { 
      article: { image: file } 
    }
    assert_response :unauthorized
  end

  test "should return JSON content type" do
    get api_v1_articles_url, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_includes @response.content_type, 'application/json'
  end

  test "should handle missing image params" do
    patch upload_image_api_v1_article_url(@article), 
           params: {}, 
           headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :unprocessable_entity
  end

  private

  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end
end
