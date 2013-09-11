#! /usr/bin/ruby2.0
# coding: utf-8

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
      new_text = new_text + _a[num]['end']
      break if _a[num]['end'] == "EOS"
      t1 = _a[num]['end']
    end

    # EOSを削除して、結果出力
    new_text.gsub!(/EOS$/,'').toutf8
  end

end
