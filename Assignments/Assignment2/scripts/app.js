(function(){
'use strict'
var toBuyItemsList = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "20"
  },
  {
    name: "Cookies",
    quantity: "30"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Juice",
    quantity: "10"
  }
];
var boughtItemList=[];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService){
var toBuyItems=this;
  toBuyItems.Items=ShoppingListCheckOffService.showToBuyItems();
  toBuyItems.MovetoBoughtList=function(index){
    ShoppingListCheckOffService.MovetoBoughtList(index);
  };
  toBuyItems.ShowMessage=function isEmpty(){
  return  toBuyItems.Items.length==0?true:false;
  }

};

function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtItems=this;
  boughtItems.Items=ShoppingListCheckOffService.showBoughtItems();
  boughtItems.ShowMessage=function isEmpty(){
  return  boughtItems.Items.length==0?true:false;
  }
  // boughtItems.ShowMessage=boughtItems.Items.length==0?true:false;
  // console.log("boughtItems "+boughtItems.Items.length);
};

function ShoppingListCheckOffService() {
  var service=this;

  service.showToBuyItems=function(){
    return toBuyItemsList;
  };

  service.MovetoBoughtList=function(index){
    boughtItemList.push(toBuyItemsList[index]);
    toBuyItemsList.splice(index,1);
    return toBuyItemsList;
  }

  service.showBoughtItems=function(){
    return boughtItemList;
  };

}


})();
