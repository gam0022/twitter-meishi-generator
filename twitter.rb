#! /usr/bin/ruby2.0
# coding: utf-8

require 'twitter'
require 'cgi'
require 'json'
require 'yaml'
require 'open-uri'

require 'MeCab'
require 'kconv'


require_relative 'summary'

def wget(url, filename)
  open(url) do |source|
    open(filename, "w+b") do |f|
      f.print source.read
    end
  end
end

def download_progile_image(user)
  #url = user.profile_image_url.sub('normal', 'bigger')
  url = user.profile_image_url.sub('_normal', '')
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

  client = Twitter::Client.new(
    :consumer_key       => config['oauth']['ConsumerKey'],
    :consumer_secret    => config['oauth']['ConsumerSecret'],
    :oauth_token        => config['oauth']['OauthToken'],
    :oauth_token_secret => config['oauth']['OauthTokenSecret']
  )

  cgi = CGI.new
  print cgi.header("charset"=>"UTF-8")

  screen_name = cgi.params["screen_name"][0]

  if screen_name =~ /[\n\r]/ || !(screen_name =~ /^[a-zA-Z0-9_]+$/)
    raise StandardError
  end

  #user = client.user(screen_name)
  timeline = client.user_timeline(screen_name, {:count => 100})

  summary = Summary.new()

  timeline.each do |status|
    if status.user_mentions.empty?
      summary.learn(status.text)   
    end
  end

  user     = timeline[0]

  hash = user.to_hash
  hash[:profile_image_local_url] = download_progile_image(user)
  hash[:summary] = summary.talk()
  
  puts hash.to_json

rescue => e
  puts "internal error ><;"

  time = Time.now.strftime("[%y.%m.%d-%H:%M:%S]")
  open('logs/twitter.rb.log', "a") do |f|
    f.puts time
    f.puts e.to_s
    f.puts e.backtrace.join("\n")
    f.puts 
  end
end
