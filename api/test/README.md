# Rails API Testing Suite

This directory contains comprehensive tests for the Rails API application using Rails' built-in testing framework (Minitest).

## Test Structure

### Model Tests (`test/models/`)
- **Unit tests** for all ActiveRecord models
- Tests for validations, associations, and custom methods
- Uses fixtures for test data

### Controller Tests (`test/controllers/`)
- **Integration tests** for API controllers
- Tests for all controller actions and edge cases
- Tests authentication and authorization
- Tests JSON response formats

### Fixtures (`test/fixtures/`)
- Test data definitions in YAML format
- Reusable across all tests
- Automatically loaded for each test

## Test Coverage

### Models Tested
- ✅ **Article** - Complete validation, association, and method testing

### Controllers Tested
- ✅ **ArticlesController** - CRUD operations, authorization, and edge cases

## Running Tests

### Run All Tests
```bash
rails test
```

### Run Specific Test Types
```bash
# Run only model tests
rails test test/models/

# Run only controller tests
rails test test/controllers/

# Run only integration tests
rails test test/integration/
```

### Run Specific Test Files
```bash
# Run Article model tests
rails test test/models/article_test.rb

# Run Articles controller tests
rails test test/controllers/articles_controller_test.rb
```

### Run Specific Test Methods
```bash
# Run a specific test method
rails test test/models/article_test.rb:25
```

### Run Tests with Verbose Output
```bash
rails test --verbose
```

## Test Configuration

### Dependencies
The test suite uses Rails' built-in testing framework:
- **Minitest** - Testing framework (built into Rails)
- **Fixtures** - Test data management
- **JWT** - Token generation for authentication tests

### Database
- Tests use a separate test database
- Database is cleaned between test runs
- Fixtures provide consistent test data

### Authentication
- JWT tokens are generated for authenticated requests
- Authentication is tested in controller tests
- Authorization is tested for resource ownership

## Test Patterns

### Model Testing
```ruby
class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    @article = Article.new(
      title: "Test Article",
      content: "Test content",
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
end
```

### Controller Testing
```ruby
class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @article = articles(:one)
    @token = generate_token(@user)
  end

  test "should get index" do
    get api_v1_articles_url, headers: auth_headers(@user)
    assert_response :success
    assert_json_response
  end
end
```

## Fixture Definitions

### User Fixtures
```yaml
one:
  id: 1
  firstname: "Regular"
  lastname: "User"
  email: "user@example.com"
  password_digest: "<hashed_password>"
  admin: false
```

### Article Fixtures
```yaml
one:
  title: "First Article"
  content: "This is the content of the first article."
  user: one
  created_at: <%= 2.days.ago.to_s(:db) %>
```

## Helper Methods

The test suite includes helper methods in `test_helper.rb`:

- `generate_token(user)` - Generate JWT token for user
- `auth_headers(user)` - Create authorization headers
- `json_response` - Parse JSON response body
- `assert_json_response` - Assert JSON response format
- `assert_unauthorized` - Assert unauthorized response
- `assert_not_found` - Assert not found response
- `assert_unprocessable_entity` - Assert validation error response

## Best Practices

1. **Use Fixtures** - Create test data using fixtures
2. **Test Edge Cases** - Include tests for invalid inputs and error conditions
3. **Test Authorization** - Verify that users can only access their own resources
4. **Use Descriptive Test Names** - Make test names clear and descriptive
5. **Test Response Format** - Verify JSON structure and content types
6. **Test Error Handling** - Ensure proper error responses for invalid requests
7. **Use Setup Methods** - Initialize common test data in setup methods
8. **Test Database Changes** - Use `assert_difference` to test record creation/deletion

## Adding New Tests

### For a New Model
1. Create `test/models/model_name_test.rb`
2. Add fixtures in `test/fixtures/model_name.yml`
3. Test validations, associations, and custom methods

### For a New Controller
1. Create `test/controllers/controller_name_test.rb`
2. Test all actions with authentication
3. Test authorization and edge cases
4. Test JSON response formats

## Continuous Integration

The test suite is designed to run in CI environments:
- Tests are isolated and don't depend on external services
- Database is properly configured for test environment
- All dependencies are properly mocked

## Troubleshooting

### Common Issues
1. **Database Issues** - Run `rails db:test:prepare`
2. **Fixture Issues** - Ensure all required associations are defined
3. **Authentication Issues** - Check JWT token generation in test helpers
4. **Missing Dependencies** - Run `bundle install`

### Debugging Tests
```bash
# Run tests with verbose output
rails test --verbose

# Run a single test with debugging
rails test test/models/article_test.rb:25 --verbose
```

## Test Data

Test data is created using fixtures and is isolated between test runs. The test database is cleaned after each test to ensure test isolation. 