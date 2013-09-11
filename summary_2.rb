#! /usr/bin/ruby2.0
# coding: utf-8

require 'MeCab'
require 'kconv'

class Summary

  def initialize()
    @data = []
    @mecab = MeCab::Tagger.new("-Owakati")
    @heads = []
  end

  def learn(text)
    # mecabで形態素解析して、 参照テーブルを作る
    ary = @mecab.parse(text + "EOS").split(" ")
    @heads.push ({'head' => ary[0]})
    ary.each_cons(2) do |a| 
      @data.push h = {'head' => a[0], 'end' => a[1]}
    end
  end

  def talk()
    # マルコフ連鎖で要約
    head = @heads.sample
    t1 = head['head']
    new_text = t1
    while true
      _a = Array.new
      @data.each do |hash|
        _a.push hash if hash['head'] == t1
      end 

      break if _a.size == 0
      num = rand(_a.size) # 乱数で次の文節を決定する
      new_text = new_text.eappend _a[num]['end']
      break if _a[num]['end'] == "EOS"
      t1 = _a[num]['end']
    end

    # EOSを削除して、結果出力
    new_text.gsub!(/EOS$/,'').toutf8
  end

end



class String

  #
  # テキストから余分な文字を取り除く
  #
  def filter
    # エンコードをUTF-8 にして、改行とURLや#ハッシュダグや@メンションは消す
    self.gsub(/(\n|https?:\S+|from https?:\S+|#\w+|#|@\S+|^RT)/, "").gsub('&amp;', '&').gsub('&lt;', '<').gsub('&gt;', '>').strip
  end

  #
  # 英単語の場合、スペースをはさんで結合
  #
  def eappend(text)
    (text =~ /^\w+$/ && !self.empty?) ? "#{self} #{text}" : self+text
  end

end
