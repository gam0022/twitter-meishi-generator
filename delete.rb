#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'

require_relative 'functions'

begin

  #
  # load configs
  #

  save = {}

  if File.exist?("save.yaml")
    open("save.yaml") do |f|
      save = YAML.load(f)
    end
  else
    raise StandardError
  end


  #
  # main
  #

  cgi = CGI.new

  id = cgi.params["id"][0].delete("\n\r")

  if !(id =~ /^[a-zA-Z0-9_]+-\d+$/)
    raise StandardError
  end

  save['ids'] -= [id]

  image_url = "saved_images/#{id}.png"

  File.delete(image_url)

  open("save.yaml", "w") do |f|
    f.write save.to_yaml
  end

  print cgi.header( { 
    "status"     => "REDIRECT",
    "Location"   => "show.rb"
  })

rescue => e
  exception_handling(e, 'logs/delete.rb.log') 
end

