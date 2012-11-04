'use strict';
var jade = require("jade");

var TestView = Backbone.View.extend({

  initialize: function() {
    this.template = jade.compile($("#test").text());
  },

  render: function() {
    var html = this.template({ item: 'hello, world'});
    $('body').append(html);
  }
});

var test = new TestView();
test.render();