// 名刺:    91 x 55 mm
// canvas:  455 x 275 px

var canvas, context;

function draw(background_image_url, json) {

  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url

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
    };
  };
};

function generate() {
  var screen_name = $("#screen_name").val();
  $.post(
      "twitter.rb",
      {"screen_name": screen_name},

      function(data) {
        var json = $.parseJSON(data);
        draw("background.png", json);
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
