(function(){
'use strict'


angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant("APIUrl","https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems);

function FoundItems(){
  var ddo={
    restrict: 'E',
    templateUrl:"foundItems.html",
    scope:{
      // list:'=foundItems'
      foundItems:'<',
       onRemove: '&',
       onEmpty:'<'
    },
    controller:NarrowItDownController,
    controllerAs: 'search',
    bindToController: true
  }

  return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
 var search=this;
 // search.message="Value is there";
 //search.searchTerm="";
 search.found=[];
 search.getMatchedMenuItems=function(searchTerm){
   if(searchTerm!=""){
     var promise= MenuSearchService.getMatchedMenuItems(searchTerm);
     promise.then((items)=>{
         if(items.length>0){
           search.found=items;
           search.message='';
         }else{
           search.message="No records found";
           search.found=[];
         }
       });
    }
   }
search.removeMenuItem=function(index){
  search.found.splice(index,1);
 }

};
MenuSearchService.$inject=['$http','APIUrl']
function MenuSearchService($http,APIUrl){
  var service=this;
  var searchedItems=[];
  service.getMatchedMenuItems=function(searchTerm){
    // console.log("searchTerm "+searchTerm)
    // var response=$http({
    return $http({
      method:"GET",
      url:(APIUrl+"/menu_items.json")
    }).then((response)=>{
      return response.data['menu_items'].filter(item=>item.description.toLowerCase().includes(searchTerm));
      // function(result){
      //   if (result.data!=null) {
      //     angular.forEach(result.data.menu_items,function(item,key) {
      //      var desc=item.description;
      //       if(!(item.description.toLowerCase().indexOf(searchTerm.toLowerCase())===-1)){
      //         searchedItems.push(item);
      //       }
      //     });
      //   }

    });
    // return searchedItems
  };

  // service.removeMenuItem=function(index){
  //   searchedItems.splice(index,1);
  //   return searchedItems;
  // };
};

})();
