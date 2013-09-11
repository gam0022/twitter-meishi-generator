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

      fillMultilineText(context, name, 150, MW - 150, 90, 15, 5);
      fillMultilineTextBottom(context, description, 300, 10, 220, 15, 4);
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

      fillMultilineText(context, name, MW - 145 - 20, 145 + 5, 90, 15, 5);
      fillMultilineTextBottom(context, description, 300, 145, 170, 15, 7);
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
      context.drawImage(profile_image, 90, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 200, 60);

      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, MW - 200 - 20, 200 + 5, 90, 15, 5);
      fillMultilineTextBottom(context, description, MW - 60 - 30, 75, 200, 15, 5);
    };
  };
};

draw_functions['simple_c'] = function (json) {

  var background_image_url = "background_images/simple_c.png";
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
      context.drawImage(profile_image, 30, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 150, 60);

      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, MW - 150 - 20, 150 + 5, 90, 15, 5);
      fillMultilineTextBottom(context, description, MW - 30 * 2, 30, 200, 15, 5);
    };
  };
};

draw_functions['design_a_summary'] = function (json) {

  var background_image_url = "background_images/design_a.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var summary = json.summary;

  var img = new Image();
  img.src = background_image_url;
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

      fillMultilineText(context, name, 150, MW - 150, 90, 15, 5);
      fillMultilineTextBottom(context, summary, 300, 10, 220, 15, 4);
    };
  };
};

draw_functions['simple_a_summary'] = function (json) {

  var background_image_url = "background_images/simple_a.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;
  var summary = json.summary;

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

      fillMultilineText(context, name, MW - 145 - 20, 145 + 5, 90, 15, 3);

      fillMultilineText(context, summary, 300, 145, 125, 15, 4);

      fillMultilineTextBottom(context, description, 300, 145, 200, 15, 5);
    };
  };
};

draw_functions['simple_b_summary'] = function (json) {

  var background_image_url = "background_images/simple_b.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;
  var summary = json.summary;

  var img = new Image();
  img.src = background_image_url;
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;
    profile_image.onload = function() {
      context.drawImage(profile_image, 90, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 200, 60);

      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, MW - 200 - 20, 200 + 5, 90, 15, 3);

      fillMultilineText(context, summary, MW - 60 - 30, 75, 165, 15, 3);

      fillMultilineTextBottom(context, description, MW - 60 - 30, 75, 230, 15, 3);
    };
  };
};

draw_functions['simple_c_summary'] = function (json) {

  var background_image_url = "background_images/simple_c.png";
  var screen_name = json.screen_name;
  var profile_image_url = json.profile_image_local_url;
  var name = json.name;
  var description = json.description;
  var summary = json.summary;

  var img = new Image();
  img.src = background_image_url;
  img.onload = function() {
    context.drawImage(img, 0, 0, 455, 275);

    var profile_image = new Image();
    profile_image.src = profile_image_url;
    profile_image.onload = function() {
      context.drawImage(profile_image, 30, 30, 100, 100);

      context.textAlign = "left";

      context.font = "22px 'MS Gothic'";
      context.fillStyle = "rgb(10,10,10)";
      context.fillText("@" + screen_name, 150, 60);

      context.font = "12px 'MS Gothic'";

      fillMultilineText(context, name, MW - 150 - 20, 150 + 5, 90, 15, 5);

      fillMultilineText(context, summary, MW - 30 * 2, 30, 165, 15, 3);

      fillMultilineTextBottom(context, description, MW - 30 * 2, 30, 200, 15, 5);
    };
  };
};
