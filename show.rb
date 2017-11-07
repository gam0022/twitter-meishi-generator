#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'
require 'time'

require_relative 'functions'
#require_relative 'database'
require_relative 'posts'

class View

  def initialize(base_url, post, posts)
    @base_url = base_url
    @post = post
    @posts = posts
  end

  extend ERB::DefMethod
  def_erb_method('to_html', 'views/show.erb')

end

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

  print cgi.header("charset"=>"UTF-8")

  id = cgi.params["id"][0]
  if id && !(id =~ /^[a-zA-Z0-9_]+-\d+$/)
    raise StandardError
  end

  # id が省略されたら、最後の名刺を表示する。
  post = id ? Posts.find_by_pid(id) : Posts.last

  print View.new(config['base_url'], post, Posts.all).to_html

rescue => e
  exception_handling(e, 'logs/show.rb.log') 
end
