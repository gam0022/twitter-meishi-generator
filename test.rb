#! /usr/bin/ruby2.3.3
# coding: utf-8

require 'MeCab'
require 'kconv'
require 'cgi'

#require_relative 'summary'
#
#text = "Google AJAX Search APIを使用して、画像を検索する方法について解説します。なおSearch APIは、動画を検索する機能なども提供します。
#Google Image Search APIは2011/5/26から非推奨となり、以降はCustom Search APIを使用することとされています。Google Image Search API (Deprecated) - Google Developers"
#
#summary = Summary.new()
#
#summary.learn(text)
#
#puts summary.talk()

cgi = CGI.new

print cgi.header("charset"=>"UTF-8")

puts url = "http://" + ENV['HTTP_HOST'] + ENV['REQUEST_URI']

ENV.each do |k, v|
  puts "#{k}: #{v} <br/>"
end
