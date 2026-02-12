# Rails API Testing Suite

This directory contains comprehensive tests for the Rails API application. The test suite is built using RSpec and follows best practices for testing Rails applications.

## Test Structure

### Model Tests (`spec/models/`)
- **Unit tests** for all ActiveRecord models
- Tests for validations, associations, and custom methods
- Factory definitions for test data

### Controller Tests (`spec/controllers/`)
- **Unit tests** for API controllers
- Tests for all controller actions and edge cases
- Mocked authentication and authorization

### Request Tests (`spec/requests/`)
- **Integration tests** for API endpoints
- Full request/response cycle testing
- Real authentication and authorization testing

### Support Files (`spec/support/`)
- Shared examples and test helpers
- Common testing utilities
- Factory definitions

## Test Coverage

### Models Tested
- ✅ **User** - Complete validation, association, and method testing
- ✅ **Cabin** - Validation and association testing
- ✅ **Article** - Validation, association, and friendly_id testing
- ✅ **Event** - Validation, association, and custom validation testing

### Controllers Tested
- ✅ **UsersController** - CRUD operations, authorization, and edge cases
- ✅ **CabinsController** - CRUD operations, authorization, and parameter handling
- ✅ **AuthenticationsController** - Login, signup, and email confirmation

### Request Tests
- ✅ **Users API** - Full integration testing with authentication
- ✅ **Cabins API** - Full integration testing with authorization
- ✅ **Authentications API** - Login, signup, and email confirmation flows

## Running Tests

### Run All Tests
```bash
bundle exec rspec
```

### Run Specific Test Types
```bash
# Run only model tests
bundle exec rspec spec/models/

# Run only controller tests
bundle exec rspec spec/controllers/

# Run only request tests
bundle exec rspec spec/requests/
```

### Run Specific Test Files
```bash
# Run User model tests
bundle exec rspec spec/models/user_spec.rb

# Run Users controller tests
bundle exec rspec spec/controllers/api/v1/users_controller_spec.rb

# Run Users API request tests
bundle exec rspec spec/requests/api/v1/users_request_spec.rb
```

### Run Tests with Coverage
```bash
# If you have SimpleCov configured
COVERAGE=true bundle exec rspec
```

## Test Configuration

### Dependencies
The test suite uses the following gems:
- **RSpec** - Testing framework
- **FactoryBot** - Test data factories
- **Shoulda Matchers** - Validation and association testing
- **JWT** - Token generation for authentication tests

### Database
- Tests use a separate test database
- Database is cleaned between test runs
- Factories create test data as needed

### Authentication
- JWT tokens are generated for authenticated requests
- Authentication is mocked in controller tests
- Real authentication is tested in request specs

## Test Patterns

### Model Testing
```ruby
RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
  end

  describe 'associations' do
    it { should have_many(:articles).dependent(:destroy) }
  end

  describe 'instance methods' do
    it 'activates email confirmation' do
      user.email_activate
      expect(user.email_confirmed).to be_truthy
    end
  end
end
```

### Controller Testing
```ruby
RSpec.describe Api::V1::UsersController, type: :controller do
  before do
    allow(controller).to receive(:authorize_request).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    it 'returns all users' do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end
end
```

### Request Testing
```ruby
RSpec.describe 'Api::V1::Users', type: :request do
  let(:valid_headers) { { 'Authorization' => "Bearer #{generate_token(user)}" } }

  describe 'GET /api/v1/users' do
    it 'returns all users' do
      get '/api/v1/users', headers: valid_headers
      expect(response).to have_http_status(:ok)
    end
  end
end
```

## Factory Definitions

### User Factory
```ruby
factory :user do
  sequence(:username) { |n| "user#{n}" }
  sequence(:email) { |n| "user#{n}@example.com" }
  password { "StrongPass123" }
  firstname { "John" }
  lastname { "Doe" }
end
```

### Cabin Factory
```ruby
factory :cabin do
  sequence(:name) { |n| "Cabin #{n}" }
  bedrooms { "3" }
  association :user
end
```

## Shared Examples

The test suite includes shared examples for common patterns:

- `requires_authentication` - Tests for endpoints requiring authentication
- `returns_not_found_for_invalid_id` - Tests for invalid resource IDs
- `returns_json_response` - Tests for JSON response format
- `handles_malformed_json` - Tests for malformed JSON handling
- `authorizes_resource_ownership` - Tests for resource ownership authorization

## Best Practices

1. **Use Factories** - Create test data using FactoryBot factories
2. **Test Edge Cases** - Include tests for invalid inputs and error conditions
3. **Mock External Services** - Mock email sending and external API calls
4. **Test Authorization** - Verify that users can only access their own resources
5. **Use Descriptive Test Names** - Make test names clear and descriptive
6. **Group Related Tests** - Use `describe` and `context` blocks to organize tests
7. **Test Response Format** - Verify JSON structure and content types
8. **Test Error Handling** - Ensure proper error responses for invalid requests

## Adding New Tests

### For a New Model
1. Create `spec/models/model_name_spec.rb`
2. Create `spec/factories/model_name.rb`
3. Test validations, associations, and custom methods

### For a New Controller
1. Create `spec/controllers/api/v1/controller_name_spec.rb`
2. Test all actions with mocked authentication
3. Test authorization and edge cases

### For API Endpoints
1. Create `spec/requests/api/v1/controller_name_request_spec.rb`
2. Test full request/response cycle
3. Test with real authentication and authorization

## Continuous Integration

The test suite is designed to run in CI environments:
- Tests are isolated and don't depend on external services
- Database is properly configured for test environment
- All dependencies are properly mocked

## Troubleshooting

### Common Issues
1. **Database Issues** - Run `rails db:test:prepare`
2. **Factory Issues** - Ensure all required associations are defined
3. **Authentication Issues** - Check JWT token generation in test helpers
4. **Missing Dependencies** - Run `bundle install`

### Debugging Tests
```bash
# Run tests with verbose output
bundle exec rspec --format documentation

# Run a single test with debugging
bundle exec rspec spec/models/user_spec.rb:25 --format documentation
```

## Test Data

Test data is created using factories and is isolated between test runs. The test database is cleaned after each test to ensure test isolation.