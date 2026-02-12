# frozen_string_literal: true

RSpec.shared_examples 'requires authentication' do |method, path, params = {}|
  context 'without authentication' do
    it 'returns unauthorized' do
      send(method, path, params: params)
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'with invalid authentication' do
    it 'returns unauthorized' do
      send(method, path, params: params, headers: { 'Authorization' => 'Bearer invalid_token' })
      expect(response).to have_http_status(:unauthorized)
    end
  end
end

RSpec.shared_examples 'returns not found for invalid id' do |method, path_template|
  it 'returns not found for non-existent resource' do
    send(method, path_template.gsub(':id', '999999'))
    expect(response).to have_http_status(:not_found)
  end
end

RSpec.shared_examples 'returns JSON response' do
  it 'returns JSON content type' do
    expect(response.content_type).to include('application/json')
  end

  it 'returns valid JSON' do
    expect { JSON.parse(response.body) }.not_to raise_error
  end
end

RSpec.shared_examples 'handles malformed JSON' do |method, path, valid_headers|
  it 'handles malformed JSON gracefully' do
    send(method, path, 
         params: 'invalid json', 
         headers: valid_headers.merge({ 'CONTENT_TYPE' => 'application/json' }))
    expect(response).to have_http_status(:bad_request)
  end
end

RSpec.shared_examples 'validates required parameters' do |method, path, valid_headers, required_params|
  required_params.each do |param|
    it "requires #{param} parameter" do
      params = required_params.except(param)
      send(method, path, params: params, headers: valid_headers)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end

RSpec.shared_examples 'authorizes resource ownership' do |method, path_template, valid_params, valid_headers|
  context 'when accessing another user\'s resource' do
    let(:other_user) { create(:user) }
    let(:other_resource) { create(described_class.name.downcase.gsub('controller', '').singularize.to_sym, user: other_user) }

    it 'returns unauthorized' do
      path = path_template.gsub(':id', other_resource.id.to_s)
      send(method, path, params: valid_params, headers: valid_headers)
      expect(response).to have_http_status(:unauthorized)
    end
  end
end