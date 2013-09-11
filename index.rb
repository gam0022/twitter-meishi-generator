#! /usr/bin/ruby2.0
# coding: utf-8

require 'cgi'
require 'erb'
require 'yaml'

class View

  def initialize(designs)
    @designs = designs
  end

  extend ERB::DefMethod
  def_erb_method('to_html', 'views/index.erb')

end

begin

  config = {}

  open("config.yaml") do |f|
    config = YAML.load(f)
  end

  designs = config['designs'].each_slice(4)

  cgi = CGI.new

  print cgi.header("charset"=>"UTF-8")
  print View.new(designs).to_html

rescue => e
  exception_handling(e, 'logs/index.rb.log')
end
