'use strict';

angular.module('finalProjectApp')
  .controller('FeedCtrl', function ($scope) {
    $scope.message = 'Hello';

//     function fixDiv() {
//     var $div = $("#navwrap");
//     if ($(window).scrollTop() > $div.data("top")) {
//         $('#navwrap').css({'position': 'fixed', 'top': '0', 'z-index': '9999'});
//     }
//     else {
//         $('#navwrap').css({'position': 'static', 'top': 'auto', 'z-index': '9999'});
//     }
// }
//
// $("#navwrap").data("top", $("#navwrap").offset().top); // set original position on load
// $(window).scroll(fixDiv);

  });
