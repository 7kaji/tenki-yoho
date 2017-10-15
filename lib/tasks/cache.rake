#! /usr/bin/env ruby

require 'yaml'
require 'bundler'
Bundler.require

namespace :cache do
  desc "warmup cache"
  task :warmup do
    DOMAIN = 'https://tenki-yoho.herokuapp.com/'
    @japan = YAML.load_file('japan.yml')

    @japan.keys.each do |pref|
      system("curl #{DOMAIN}api/v1/#{pref} >/dev/null")
      puts "warmed: #{pref}"
      sleep 2;
    end
  end
end
