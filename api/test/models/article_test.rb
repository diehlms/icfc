require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    @article = Article.new(
      title: "Test Article",
      content: "This is a test article content.",
      user: @user
    )
  end

  test "should be valid" do
    assert @article.valid?
  end

  test "title should be present" do
    @article.title = "   "
    assert_not @article.valid?
  end

  test "title should not be too long" do
    @article.title = "a" * 51
    assert_not @article.valid?
  end

  test "title should be at most 50 characters" do
    @article.title = "a" * 50
    assert @article.valid?
  end

  test "content should be present" do
    @article.content = "   "
    assert_not @article.valid?
  end

  test "content should not be too long" do
    @article.content = "a" * 50_001
    assert_not @article.valid?
  end

  test "content should be at most 50000 characters" do
    @article.content = "a" * 50_000
    assert @article.valid?
  end

  test "user_id should be present" do
    @article.user_id = nil
    assert_not @article.valid?
  end

  test "should belong to user" do
    @article.save!
    assert_equal @user, @article.user
  end

  test "should have many comments" do
    @article.save!
    assert_respond_to @article, :comments
  end

  test "should destroy associated comments when deleted" do
    @article.save!
    @article.comments.create!(content: "Test comment", user: @user)
    assert_difference 'Comment.count', -1 do
      @article.destroy
    end
  end

  test "should use friendly_id for slug" do
    @article.title = "My Test Article"
    @article.save!
    assert_equal "my-test-article", @article.slug
  end

  test "should generate unique slugs for articles with same title" do
    @article.title = "Same Title"
    @article.save!
    
    article2 = Article.new(
      title: "Same Title",
      content: "Another article with same title",
      user: @user
    )
    article2.save!
    
    assert_not_equal @article.slug, article2.slug
  end

  test "should set per_page to 3" do
    assert_equal 3, Article.per_page
  end

  test "should mount image uploader" do
    assert_respond_to @article, :image
  end

  test "should include Filterable concern" do
    assert Article.included_modules.include?(Filterable)
  end

  test "should accept nested attributes for comments" do
    assert Article._reflect_on_association(:comments).options[:autosave]
  end

  test "should be searchable by title" do
    @article.save!
    found_article = Article.where("title LIKE ?", "%Test%").first
    assert_equal @article, found_article
  end

  test "should be searchable by content" do
    @article.save!
    found_article = Article.where("content LIKE ?", "%test%").first
    assert_equal @article, found_article
  end

  test "should order by created_at desc by default" do
    @article.save!
    sleep(1.second) # Ensure different timestamps
    article2 = Article.create!(
      title: "Second Article",
      content: "Second article content",
      user: @user
    )
    
    articles = Article.order(created_at: :desc)
    assert_equal article2, articles.first
    assert_equal @article, articles.second
  end

  test "should validate title length on update" do
    @article.save!
    @article.title = "a" * 51
    assert_not @article.valid?
  end

  test "should validate content length on update" do
    @article.save!
    @article.content = "a" * 50_001
    assert_not @article.valid?
  end
end
