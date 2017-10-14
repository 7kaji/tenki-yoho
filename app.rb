#! /usr/bin/env ruby

require 'json'
require 'yaml'
require 'bundler'
require 'sinatra/reloader' if :development
Bundler.require

class App < Sinatra::Base
  set :server, :puma
  set :default_charset, 'utf-8'
  WEATHER_API_HOST = 'http://weather.livedoor.com'
  WEATHER_API_PATH = '/forecast/webservice/json/v1'

  configure :development do
    register Sinatra::Reloader
  end

  before do
    @japan = YAML.load_file('japan.yml')
    content_type :json
  end

  get '/api/v1/japan' do
    @japan.keys.to_json
  end

  get '/api/v1/:pref' do
    cache_control :public, max_age: 3600  # 1 hour.

    pref = params[:pref].to_sym
    return status 404 unless @japan.include?(pref)

    @japan[pref].inject([]) do |data, city|
       city_number = city.last
       data << JSON.parse(Faraday.new(url: WEATHER_API_HOST).get("#{WEATHER_API_PATH}?city=#{city_number}").body).to_h
    end.to_json
  end

  get '/' do
    redirect 'index.html'
  end
end
