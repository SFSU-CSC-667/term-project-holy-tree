(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['player_card'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"player-card mdl-card mdl-shadow--2dp\" data-id='"
    + alias4(((helper = (helper = helpers.user_id || (depth0 != null ? depth0.user_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_id","hash":{},"data":data}) : helper)))
    + "' style='background: url(\""
    + alias4(((helper = (helper = helpers.profile_pic || (depth0 != null ? depth0.profile_pic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_pic","hash":{},"data":data}) : helper)))
    + "\") center center no-repeat;'>\n  <div class=\"mdl-card__title mdl-card--expand\"></div>\n  <div class=\"mdl-card__actions\">\n    <span class=\"player-card-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span>ITEM</span>\n  </div>\n</div>\n";
},"useData":true});
})();
