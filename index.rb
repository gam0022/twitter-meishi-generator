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
  puts "internal error ><;"

  time = Time.now.strftime("[%y.%m.%d-%H:%M:%S]")
  open('logs/index.rb.log', "a") do |f|
    f.puts time
    f.puts e.to_s
    f.puts e.backtrace.join("\n")
    f.puts 
  end
end
