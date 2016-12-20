(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"navbar-fixed\">\n<nav class=\"mdl-layout mdl-js-layout\">\n  <div class=\"nav-wrapper\">\n  <header class=\"mdl-layout__header \">\n    <div class=\"mdl-layout mdl-js-layout\">\n      <div class=\"mdl-layout__header-row\">\n        <span class=\"mdl-layout-title\">Werewolf</span>\n        <div class=\"mdl-layout-spacer\"></div>\n        <nav class=\"mdl-navigation\">\n          <a class=\"mdl-navigation__link\" href=\"#\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n          <a class=\"mdl-navigation__link\" href=\"#\" onclick=\"\">\n            Sign Out\n          </a>\n        </nav>\n      </div>\n    </div>\n  </header>\n</div>\n</nav>\n</div>";
},"useData":true});
templates['player_card'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class='player-card' data-id='"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "'>\n    <div class='portrait' style='background: url(\""
    + alias4(((helper = (helper = helpers.profile_pic || (depth0 != null ? depth0.profile_pic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_pic","hash":{},"data":data}) : helper)))
    + "\") center center no-repeat; background-size: cover;'></div>\n    <div class='info'>\n        <span class='name'>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n        <span class='item'></span>\n    </div>\n</div>";
},"useData":true});
templates['player_game_info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\n    <label>Additional Information</label>\n    <p>"
    + container.escapeExpression(((helper = (helper = helpers.supplementary || (depth0 != null ? depth0.supplementary : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"supplementary","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p class='role'>"
    + alias4(((helper = (helper = helpers.displayRole || (depth0 != null ? depth0.displayRole : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayRole","hash":{},"data":data}) : helper)))
    + "</p>\n<p class='description'>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.supplementary : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div>\n    <label>How to Win</label>\n    <p>"
    + alias4(((helper = (helper = helpers.win || (depth0 != null ? depth0.win : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"win","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n\n";
},"useData":true});
templates['results_display'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <tr>\n          <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n          <td>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</td>\n          <td>"
    + alias4(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"role","hash":{},"data":data}) : helper)))
    + "</td>\n          <td>"
    + alias4(((helper = (helper = helpers.votes_against || (depth0 != null ? depth0.votes_against : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"votes_against","hash":{},"data":data}) : helper)))
    + "</td>\n          <td>"
    + alias4(((helper = (helper = helpers.outcome || (depth0 != null ? depth0.outcome : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"outcome","hash":{},"data":data}) : helper)))
    + "</td>\n      </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"dialog-results-display\">\n  <h3>Results</h3>\n  <table class=\"results-table mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp\">\n    <thead>\n      <tr>\n        <th>Player</th>\n        <th>Status</th>\n        <th>Final Role</th>\n        <th>Votes</th>\n        <th>Win/Lose</th>\n      </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.players : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n  <div class='linkback'><button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--cyan-800 mdl-color-text--grey-50\" onclick=\"window.location.href='/'\">Leave the Village</button></div>\n</div>\n";
},"useData":true});
})();