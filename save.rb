#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'
require 'base64'
require 'time'

require_relative 'functions'

class View

  def initialize(image_url, id, base_url, save)
    @image_url = image_url
    @id = id
    @base_url = base_url
    @save = save
  end

  extend ERB::DefMethod
  def_erb_method('to_html', 'views/show.erb')

end

begin

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

  print cgi.header("charset"=>"UTF-8")
  print View.new(image_url, id, config['base_url'], save).to_html

rescue => e
  exception_handling(e, 'logs/save.rb.log') 
end
