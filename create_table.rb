# coding: utf-8

require 'sqlite3'
require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database => 'db/db.sqlite3'
)

class CreatePostsTable < ActiveRecord::Migration
  def up
    create_table :posts do |t|
      t.string :pid
      t.date :time
      t.string :screen_name
      t.timestamps
    end 
  end
end

CreatePostsTable.new.up
