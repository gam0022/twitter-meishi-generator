#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'sqlite3'

#
# Active Record を CGI で使おうと思ったら、
# 起動が遅すぎて使い物にならなかったので、
# メソッド名が同じで同じような動作をするクラスを作った。
#

class Hash
  def method_missing(n)
    self[n.to_s]
  end
end

class Posts

  @filename = "db/db.sqlite3"

  def Posts.open
    @db = SQLite3::Database.new(@filename)
    @db.results_as_hash = true
    @db.busy_timeout(100)
    yield @db
    @db.close
  end

  def Posts.find_by_pid(pid)
    result = []
    Posts.open do |db|
      result = db.execute("select * from posts where pid = ?", pid)
    end
    return result[0]
  end

  def Posts.last()
    result = {}
    Posts.open do |db|
      result = db.get_first_row("select * from posts order by id desc limit 1")
    end
    return result
  end

  def Posts.all()
    result = []
    Posts.open do |db|
      result = db.execute("select * from posts")
    end
    return result
  end

  def Posts.create(h)
    Posts.open do |db|
      db.execute("insert into posts(pid, time, screen_name, created_at, updated_at) values (:pid, :time, :screen_name, :time, :time)", h)
    end
  end

  def Posts.delete_all(h)
    Posts.open do |db|
      # TODO: pid で決め打ちだけど、まあしょうがないよね！
      db.execute("delete from posts where pid = ?", h[:pid])
    end
  end

end
