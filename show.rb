#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'
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

  print cgi.header("charset"=>"UTF-8")

  id = cgi.params["id"][0]

  # id が省略されたら、最後の名刺を表示する。
  if !id
    id = save['ids'][-1]
  end
  
  id = id.delete("\n\r")

  if !(id =~ /^[a-zA-Z0-9_]+-\d+$/)
    raise StandardError
  end

  image_url = "saved_images/#{id}.png"

  print View.new(image_url, id, config['base_url'], save).to_html

rescue => e
  exception_handling(e, 'logs/show.rb.log') 
end
