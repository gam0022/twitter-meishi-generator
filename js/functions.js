// 名刺:    91 x 55 mm
// canvas:  455 x 275 px

var canvas, context;

var MW = 455;
var MH = 275;

var selected_design_name;

var json_cached;

var isDrawing = false;

var isAndroid = false;

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

function excute_draw(json) {
  if (isDrawing) {
    return;
  }

  isDrawing = true;
  draw_functions[selected_design_name].call(this, json);
  isDrawing = false;
}

function apply_screen_name() {
  var screen_name = $("#screen_name").val();
  if (screen_name == "") {
    return;
  }

  // Now Loading
  var loading = {};
  loading.background_image_url = "background_images/design_a.png";
  loading.screen_name = "Now_Loading"
  loading.profile_image_local_url = "images/loading.png";
  loading.name = "Now Loading...";
  loading.description = "Now Loading...";
  excute_draw(loading);

  $.post(
      "twitter.rb",
      {"screen_name": screen_name},

      function(data) {
        if (data == "(´・ω・｀)") {
          $("#alert_screen_name").css('display', 'block');
          return;
        }

        var json = json_cached = $.parseJSON(data);
        $("#alert_screen_name").css('display', 'none');
        excute_draw(json);
      });
}

function init_design_select() {
  $("ol.carousel-indicators li").first().addClass('active');
  $("div.carousel-inner div.item").first().addClass('active');
  select_design(selected_design_name = 'design_a');
}

function post_image() {
  if (isDrawing) {
    return false;
  }

  var type = 'image/png';
  $('#image_data').val( canvas.toDataURL(type) );
  $('#screen_name_hidden').val( $("#screen_name").val() );
  return true;
}

function save_image() {
  if (isDrawing || isAndroid) {
    return false;
  }

  var type = 'image/png';
  window.open( canvas.toDataURL(type) );
}

function delete_image(id) {
  document.location.href = "delete.rb?id=" + id;
}

function select_design(name) {
  $('a#design_a_' + selected_design_name).first().removeClass('active');
  selected_design_name = name;
  $('a#design_a_' + selected_design_name).first().addClass('active');
  if (json_cached != null) {
    excute_draw(json_cached);
  } else {
    apply_screen_name();
  }
}

function submitCheck(e) {
  if (!e) var e = window.event;

  // Enter キー で Twitter ID を確定する。
  if(e.keyCode == 13){
    apply_screen_name();
    return false;
  }
}

$(function() {
  canvas  = document.getElementById("canvas");
  context = canvas.getContext("2d");
  init_design_select();
  apply_screen_name();

  var agent = navigator.userAgent;
  if(agent.search(/Android/) != -1){
    isAndroid = true;
  }
});
