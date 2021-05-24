(function(){
'use strict'

angular.module('LunchChecker', [])
.controller('LunchController',LunchController);

LunchController.$inject = ['$scope'];

function LunchController($scope){
  $scope.warning="Empty items are not counted, i.e. , , is not considered as an item";
  $scope.items="";
  $scope.msg="";
  $scope.CheckLunch=function(){
    var lunchItems=$scope.items;
    if(lunchItems=="")
    {
      $scope.msg="Please enter data first";
    }else{
      var foodItems=lunchItems.split(",");
      var noOfItems=foodItems.length;
      var count=0;
      angular.forEach(foodItems,function(item, i){
        if(item!=""){
          count++;
        }
      });
      if(count<=3){
          $scope.msg="Enjoy!";
      }
      else {
        $scope.msg= "Too much!";
      }


  }

};

}



})();
