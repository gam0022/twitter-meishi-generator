#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'
require 'base64'
require 'time'

require_relative 'functions'

begin

  #
  # load configs
  #

  config = {}
  save = {}

  open("config.yaml") do |f|
    config = YAML.load(f)
  end

  if File.exist?("save.yaml")
    open("save.yaml") do |f|
      save = YAML.load(f)
    end
  else
    save = {'ids' => []}
  end


  #
  # main
  #

  cgi = CGI.new

  screen_name = cgi.params["screen_name_hidden"][0].delete("\n\r")

  if !(screen_name =~ /^[a-zA-Z0-9_]+$/)
    raise StandardError
  end

  id = "#{screen_name}-#{Time.now.to_i}".delete("\n\r")
  save['ids'].push id

  image_url = "saved_images/#{id}.png"

  image_data = Base64.decode64(
    cgi.params["image_data"][0].gsub('data:image/png;base64,','')
  )

  File.binwrite(image_url, image_data)

  open("save.yaml", "w") do |f|
    f.write save.to_yaml
  end

  print cgi.header( { 
    "status"     => "REDIRECT",
    "Location"   => "show.rb?id=#{id}"
  })

rescue => e
  exception_handling(e, 'logs/save.rb.log') 
end
