require './server.rb'
run Sinatra::Application
set :views, File.dirname(__FILE__) + "/views"