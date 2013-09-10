// 名刺:    91 x 55 mm
// canvas:  455 x 275 px

var canvas, context;

var MW = 455;
var MH = 275;

var selected_design_name;

// http://ninoha.com/?p=60
/*
      文字列を指定幅ごとに区切る
 
      context : 描画コンテキスト
      text    : 変換元の文字列
      width   : １行の最大幅
 
      戻り値  : １行毎に分割した文字列の配列
*/
function multilineText(context, text, width) {
    var len = text.length; 
    var strArray = [];
    var tmp = "";
    var i = 0;
 
    if( len < 1 ){
        //textの文字数が0だったら終わり
        return strArray;
    }
 
    for( i = 0; i < len; i++ ){
        var c = text.charAt(i);  //textから１文字抽出
        if( c == "\n" ){
            /* 改行コードの場合はそれまでの文字列を配列にセット */
            strArray.push( tmp );
            tmp = "";
 
            continue;
        }
 
        /* contextの現在のフォントスタイルで描画したときの長さを取得 */
        if (context.measureText( tmp + c ).width <= width){
            /* 指定幅を超えるまでは文字列を繋げていく */
            tmp += c;
        }else{
            /* 超えたら、それまでの文字列を配列にセット */
            strArray.push( tmp );
            tmp = c;
        }
    }
 
    /* 繋げたままの分があれば回収 */
    if( tmp.length > 0 )
        strArray.push( tmp );
 
    return strArray;
}

function generate() {
  var screen_name = $("#screen_name").val();
  $.post(
      "twitter.rb",
      {"screen_name": screen_name},

      function(data) {
        var json = $.parseJSON(data);
        draw_functions[selected_design_name].call(this, json);
      });
}

function save() {
  var type = 'image/png';
  location.href = canvas.toDataURL(type);
}

function init_design_select() {
  $("ol.carousel-indicators li").first().addClass('active');
  $("div.carousel-inner div.item").first().addClass('active');
  //$("div.carousel-inner div.item img").first().addClass('active');
  select_design(selected_design_name = 'design_a');
}

function select_design(name) {
  $('a#design_a_' + selected_design_name).first().removeClass('active');
  selected_design_name = name;
  $('a#design_a_' + selected_design_name).first().addClass('active');
  generate();
}

$(function() {
  canvas  = document.getElementById("canvas");
  context = canvas.getContext("2d");
  init_design_select();
  generate();
});
