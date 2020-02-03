if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_icfc', domain: 'www.icfc.net'
else
    Rails.application.config.session_store :cookie_store, key: '_icfc' 
end