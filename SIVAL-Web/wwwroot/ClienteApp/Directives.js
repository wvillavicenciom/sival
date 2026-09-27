'use strict';

AppSIVAL.directive('loadTables', function () {
  return function(scope, element, attrs) {
    if (scope.$last){
        scope.$eval(attrs.loadTables);
    }
  };
});

AppSIVAL.directive("inputDisabled", function () {
    return function (scope, element, attrs) {
        scope.$watch(attrs.inputDisabled, function (val) {
            if (val)
                element.removeAttr("disabled");
            else
                element.attr("disabled", "disabled");
        });
    }
});

AppSIVAL.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});

AppSIVAL.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});