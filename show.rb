#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'

require_relative 'functions'

class View

  def initialize(image_url, id, base_url)
    @image_url = image_url
    @id = id
    @base_url = base_url
  end

  extend ERB::DefMethod
  def_erb_method('to_html', 'views/show.erb')

end

begin

  config = {}

  open("config.yaml") do |f|
    config = YAML.load(f)
  end

  cgi = CGI.new

  print cgi.header("charset"=>"UTF-8")

  id = cgi.params["id"][0].delete("\n\r")

  if !(id =~ /^[a-zA-Z0-9_]+_\d+$/)
    raise StandardError
  end

  image_url = "saved_images/#{id}.png"

  print View.new(image_url, id, config['base_url']).to_html

rescue => e
  # エラー処理
  exception_handling(e, 'logs/show.rb.log') 
end
