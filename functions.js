// 名刺:    91 x 55 mm
// canvas:  455 x 275 px

var canvas, context;

var MW = 455;
var MH = 275;

var selected_design_name;

var json_cached;

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

function fillMultilineText(context, text, width, x, y, line_height, max_line) {
  var ary = multilineText(context, text, width);
  var n = ary.length;
  if (n > max_line) {
    n = max_line;
  }
  for (var i = 0; i < n; ++i) {
    context.fillText(ary[i], x, y + line_height * i);
  }
}

function fillMultilineTextBottom(context, text, width, x, y, line_height, max_line) {
  var ary = multilineText(context, text, width);
  var n = ary.length;
  if (n > max_line) {
    n = max_line;
  }
  var pad = max_line - n;
  for (var i = 0; i < n; ++i) {
    context.fillText(ary[i], x, y + line_height * (i + pad) );
  }
}

function generate() {
  var screen_name = $("#screen_name").val();
  if (screen_name == "") {
    return;
  }

  $.post(
      "twitter.rb",
      {"screen_name": screen_name},

      function(data) {
        var json = json_cached = $.parseJSON(data);
        draw_functions[selected_design_name].call(this, json);
      });
}

function save() {
  var type = 'image/png';
  location.href = canvas.toDataURL(type);
}

function save_as_png() {
  var type = 'image/png';
  $('#image_data').val( canvas.toDataURL(type) );
  $('#screen_name_hidden').val( $("#screen_name").val() );
  return true;
}

function init_design_select() {
  $("ol.carousel-indicators li").first().addClass('active');
  $("div.carousel-inner div.item").first().addClass('active');
  select_design(selected_design_name = 'design_a');
}

function select_design(name) {
  $('a#design_a_' + selected_design_name).first().removeClass('active');
  selected_design_name = name;
  $('a#design_a_' + selected_design_name).first().addClass('active');
  if (json_cached != null) {
    draw_functions[selected_design_name].call(this, json_cached);
  } else {
    generate();
  }
}

function submitCheck(e) {
  if (!e) var e = window.event;

  // Enter キー で Twitter ID を確定する。
  if(e.keyCode == 13){
    generate();
    return false;
  }
}

$(function() {
  canvas  = document.getElementById("canvas");
  context = canvas.getContext("2d");
  init_design_select();
  generate();
});
