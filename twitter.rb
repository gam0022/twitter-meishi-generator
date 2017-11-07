#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'twitter'
require 'cgi'
require 'json'
require 'yaml'
require 'open-uri'

require_relative 'functions'
require_relative 'summary'

def wget(url, filename)
  open(url) do |source|
    open(filename, "w+b") do |f|
      f.print source.read
    end
  end
end

def download_progile_image(user)
  url = user.profile_image_url.to_s.sub('_normal', '')
  ext = File.extname(url)
  id  = user.id
  dst = "profile_images/#{id}#{ext}"
  wget(url, dst)
  return dst
end

begin

  config = {}

  open("config.yaml") do |f|
    config = YAML.load(f)
  end

  client = Twitter::REST::Client.new do |c|
    c.consumer_key        = config['oauth']['consumer_key']
    c.consumer_secret     = config['oauth']['consumer_secret']
    c.access_token        = config['oauth']['access_token']
    c.access_token_secret = config['oauth']['access_token_secret']
  end

  cgi = CGI.new
  print cgi.header("charset"=>"UTF-8")

  screen_name = cgi.params["screen_name"][0].delete("\n\r")

  if !(screen_name =~ /^[a-zA-Z0-9_]+$/)
    raise StandardError
  end

  timeline = client.user_timeline(screen_name, {:count => 200})

  summary = Summary.new()

  timeline.each do |status|
    summary.learn(status.text.filter)
  end

  user = timeline[0].user

  hash = user.to_hash
  hash[:profile_image_local_url] = download_progile_image(user)
  hash[:summary] = summary.talk()
  
  puts hash.to_json

rescue => e
  exception_handling(e, 'logs/twitter.rb.log')
end
