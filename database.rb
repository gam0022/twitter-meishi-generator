#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'sqlite3'
require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database => 'db/db.sqlite3'
)

class Posts < ActiveRecord::Base
end
