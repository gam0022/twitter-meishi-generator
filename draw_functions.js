var draw_functions = {};

draw_functions['design_a'] = function (json) {

  var background_image_url = "background_images/design_a.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;

  var img = new Image();
  img.src = background_image_url;// + "?" + new Date().getTime();
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;
    profile_image.onload = function() {
      context.drawImage(profile_image, 168, 77, 120, 120);

      context.font = "22px 'MS Gothic'";
      context.textAlign = "right";
      context.fillStyle = "rgb(100,100,100)";
      context.fillText("@" + screen_name, 435, 60);

      context.textAlign = "left";
      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, 150, MW - 150, 90, 15);
      fillMultilineText(context, description, 300, 10, 220, 15);
    };
  };
};

draw_functions['simple_a'] = function (json) {

  var background_image_url = "background_images/simple_a.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;

  var img = new Image();
  img.src = background_image_url;
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;
    profile_image.onload = function() {
      context.drawImage(profile_image, 15, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 145, 60);

      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, MW - 145 - 20, 145, 90, 15);
      fillMultilineText(context, description, 300, 145, 200, 15);
    };
  };
};

draw_functions['simple_b'] = function (json) {

  var background_image_url = "background_images/simple_b.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;

  var img = new Image();
  img.src = background_image_url;
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;
    profile_image.onload = function() {
      context.drawImage(profile_image, 75, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 200, 60);

      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, MW - 200 - 20, 200, 90, 15);
      fillMultilineText(context, description, MW - 60 - 30, 75, 220, 15);
    };
  };
};
