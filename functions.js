// 名刺:    91 x 55 mm
// canvas:  455 x 275 px

var canvas, context;

var MW = 455;
var MH = 275;


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

function draw_design_a(json) {

  var background_image_url = "background_images/design_a.png"
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;

  var img = new Image();
  img.src = background_image_url;// + "?" + new Date().getTime();
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;// + "?" + new Date().getTime();
    profile_image.onload = function() {
      context.drawImage(profile_image, 168, 77, 120, 120);

      context.font = "22px 'MS Gothic'";
      context.textAlign = "right";
      context.fillStyle = "rgb(100,100,100)";
      context.fillText("@" + screen_name, 435, 60);

      context.textAlign = "left";
      context.font = "12px 'MS Gothic'";

      var ary = multilineText(context, name, 150);
      for (var i = 0; i < ary.length; ++i) {
        context.fillText(ary[i], (MW-150), 90 + 15*i);
      }

      var ary = multilineText(context, description, 300);
      for (var i = 0; i < ary.length; ++i) {
        context.fillText(ary[i], 10, 220 + 15*i);
      }
    };
  };
}

function draw_simple_a(json) {

  var background_image_url = "background_images/simple_a.png"
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;

  var img = new Image();
  img.src = background_image_url;// + "?" + new Date().getTime();
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;// + "?" + new Date().getTime();
    profile_image.onload = function() {
      context.drawImage(profile_image, 15, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 145, 60);

      context.font = "12px 'MS Gothic'";

      var ary = multilineText(context, name, 150);
      for (var i = 0; i < ary.length; ++i) {
        context.fillText(ary[i], 145, 90 + 15*i);
      }

      var ary = multilineText(context, description, 300);
      for (var i = 0; i < ary.length; ++i) {
        context.fillText(ary[i], 145, 220 + 15*i);
      }
    };
  };
}

function draw_simple_b(json) {

  var background_image_url = "background_images/simple_b.png"
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;

  var img = new Image();
  img.src = background_image_url;// + "?" + new Date().getTime();
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;// + "?" + new Date().getTime();
    profile_image.onload = function() {
      context.drawImage(profile_image, 75, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 200, 60);

      context.font = "12px 'MS Gothic'";

      var ary = multilineText(context, name, 150);
      for (var i = 0; i < ary.length; ++i) {
        context.fillText(ary[i], 200, 90 + 15*i);
      }

      var ary = multilineText(context, description, MW - 60 - 30);
      for (var i = 0; i < ary.length; ++i) {
        context.fillText(ary[i], 75, 220 + 15*i);
      }
    };
  };
}

function generate() {
  var screen_name = $("#screen_name").val();
  $.post(
      "twitter.rb",
      {"screen_name": screen_name},

      function(data) {
        var json = $.parseJSON(data);
        //draw_design_a(json);
        draw_simple_a(json);
        //draw_simple_b(json);
      });
}

function save() {
  var type = 'image/png';
  location.href = canvas.toDataURL(type);
}

$(function() {
  canvas  = document.getElementById("canvas");
  context = canvas.getContext("2d");
  generate();
});
