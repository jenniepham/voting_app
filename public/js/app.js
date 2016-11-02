var app = angular.module('vote', []);

app.directive("headerNav", function(){
return {
  restrict: "E",
  templateUrl: "header.html"
};
});
