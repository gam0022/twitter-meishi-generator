#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'
require 'base64'
require 'time'

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

  screen_name = cgi.params["screen_name_hidden"][0].delete("\n\r")

  if !(screen_name =~ /^[a-zA-Z0-9_]+$/)
    raise StandardError
  end

  id = "#{screen_name}_#{Time.now.to_i}".delete("\n\r")

  image_url = "saved_images/#{id}.png"

  image_data = Base64.decode64(
    cgi.params["image_data"][0].gsub('data:image/png;base64,','')
  )

  File.binwrite(image_url, image_data)

  # ビュー
  print cgi.header("charset"=>"UTF-8")
  print View.new(image_url, id, config['base_url']).to_html

rescue => e
  # エラー処理
  exception_handling(e, 'logs/save.rb.log') 
end
