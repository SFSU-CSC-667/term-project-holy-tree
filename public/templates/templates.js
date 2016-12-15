(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<nav class=\"mdl-layout--fixed-header\">\n  <header class=\"mdl-layout__header \">\n    <div class=\"mdl-layout mdl-js-layout\">\n      <div class=\"mdl-layout__header-row\">\n        <span class=\"mdl-layout-title\">Werewolf</span>\n        <div class=\"mdl-layout-spacer\"></div>\n        <nav class=\"mdl-navigation\">\n          <a class=\"mdl-navigation__link\" href=\"#\">Home</a>\n          <a class=\"mdl-navigation__link\" href=\"#\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n        </nav>\n      </div>\n    </div>\n  </header>\n</nav>";
},"useData":true});
templates['player_card'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"player-card mdl-card mdl-shadow--2dp\" data-id=\""
    + alias4(((helper = (helper = helpers.user_id || (depth0 != null ? depth0.user_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_id","hash":{},"data":data}) : helper)))
    + "\" style='background: url(\""
    + alias4(((helper = (helper = helpers.profile_pic || (depth0 != null ? depth0.profile_pic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_pic","hash":{},"data":data}) : helper)))
    + "\") center center no-repeat;'>\n  <div class=\"mdl-card__title mdl-card--expand\"></div>\n  <div class=\"mdl-card__actions\">\n    <span class=\"player-card-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span>ITEM</span>\n  </div>\n</div>\n";
},"useData":true});
templates['player_game_info'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"player-game-info\">\n  <h3>The game has started!</h3>\n  <h4>"
    + alias4(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"role","hash":{},"data":data}) : helper)))
    + "</h4>\n  <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n  <p>"
    + alias4(((helper = (helper = helpers.supplementary || (depth0 != null ? depth0.supplementary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"supplementary","hash":{},"data":data}) : helper)))
    + "</p>\n  <p>"
    + alias4(((helper = (helper = helpers.win || (depth0 != null ? depth0.win : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"win","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});
})();