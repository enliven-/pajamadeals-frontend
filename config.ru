require 'rubygems'
require 'bundler'

Bundler.require

ENV['RACK_ENV'] ||= 'development'

require './app'

run Sinatra::Application
