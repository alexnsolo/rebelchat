module Rebelchat
  class App < Padrino::Application
    register Padrino::Mailer
    register Padrino::Helpers

    enable :sessions
    enable :reload

    get '/' do
      File.read(File.join('public', 'index.html'))
    end

    error 404 do
      File.read(File.join('public', '404.html'))
    end

  end
end
