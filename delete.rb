#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'

require_relative 'functions'
#require_relative 'database'
require_relative 'posts'

begin

  #
  # main
  #

  cgi = CGI.new

  id = cgi.params["id"][0].delete("\n\r")

  if !(id =~ /^[a-zA-Z0-9_]+-\d+$/)
    raise StandardError
  end

  Posts.delete_all(:pid => id)

  image_url = "saved_images/#{id}.png"

  File.delete(image_url)

  print cgi.header( { 
    "status"     => "REDIRECT",
    "Location"   => "show.rb"
  })

rescue => e
  exception_handling(e, 'logs/delete.rb.log') 
end
