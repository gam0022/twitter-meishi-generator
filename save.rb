#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'
require 'base64'
require 'time'

require_relative 'functions'
#require_relative 'database'
require_relative 'posts'

begin

  #
  # load configs
  #

  config = {}

  open("config.yaml") do |f|
    config = YAML.load(f)
  end


  #
  # main
  #

  cgi = CGI.new

  screen_name = cgi.params["screen_name_hidden"][0].delete("\n\r")

  if !(screen_name =~ /^[a-zA-Z0-9_]+$/)
    raise StandardError
  end

  time = Time.now
  id = "#{screen_name}-#{time.to_i}".delete("\n\r")
  Posts.create(:pid => id, :time => time.to_s, :screen_name => screen_name)

  image_url = "saved_images/#{id}.png"

  image_data = Base64.decode64(
    cgi.params["image_data"][0].gsub('data:image/png;base64,','')
  )

  File.binwrite(image_url, image_data)

  print cgi.header( { 
    "status"     => "REDIRECT",
    "Location"   => "show.rb?id=#{id}"
  })

rescue => e
  exception_handling(e, 'logs/save.rb.log') 
end
