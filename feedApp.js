(function (app) {

  function Service ($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  Service.$inject = ["$http", "$q"];

  Service.prototype.loadFeed = function (url) {
    var deferral = this.$q.defer();

    this.$http.jsonp("https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" + url + "&callback=JSON_CALLBACK")
    .then(function (response) {
      deferral.resolve(response.data.responseData.feed);
    }, function (error) {
      deferral.reject(error);
    });
    return deferral.promise;
  };

  app.service("rssFeed", Service);

  function Controller (rssFeed) {
    this.rssFeed = rssFeed;
    this.feedUrl = "http://feeds.feedburner.com/CSharperImage";
  };

  Controller.$inject = ["rssFeed"];

  Controller.prototype.loadFeed = function () {
    var _this = this;
    this.cssFeed.loadFeed(this.feedUrl)
    .then(function (feed) {
      _this.feed = feed;
    });
  };

  app.controller("FeedController", Controller);

})(angular.module("feedApp", []));
