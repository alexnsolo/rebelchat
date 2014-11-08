Padrino.configure_apps do
  # enable :sessions
  set :session_secret, 'da85e0ff8460a5241f05ec988c2454d65ea96169ee70cbe63bdb03b7104450a3'
  set :protection, :except => :path_traversal
  set :protect_from_csrf, false
end

# Mounts the core application for this project
Padrino.mount('Rebelchat::App', :app_file => Padrino.root('app/app.rb')).to('/')
