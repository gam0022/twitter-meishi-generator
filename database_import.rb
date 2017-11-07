#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'yaml'

#require_relative 'database'
require_relative 'posts'

#id = "5723058-gam0022"
#time = Time.now
#screen_name = "gam0022"
#
#Posts.create(:pid => id, :time => time, :screen_name => screen_name)
#
#pp Posts.all
#
#puts "--"
#
#puts Posts.last.pid

save = {}

open("save.yaml") do |f|
  save = YAML.load(f)
end

save['ids'].each do |id|
  screen_name, timei = id.split('-')
  time = Time.at(timei.to_i).to_s
  Posts.create(:pid => id, :time => time, :screen_name => screen_name)
end

puts Posts.last.pid
