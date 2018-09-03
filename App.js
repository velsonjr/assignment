var app = angular.module('quizApp', []);
app.controller('quizController', function($scope,$rootScope) {

    $scope.selectedArray = [];

    $scope.submitted = false;

    $scope.wrongCount = 0 ;

    $scope.rightCount = 0 ;

    $scope.arr = [{id:1,q1:'When was the last time Inida won the world cup?',ops: ['2000','2001','2011'],ans : '2011',submitted:false,correct:''},
    {id:2,q1:'What was the highest individual score?',ops:[178,183,194],ans:'183',submitted:false,correct:''},
    {id:3,q1:'What was the highest total?',ops:[278,289,341],ans:'341',submitted:false,correct:''},
    {id:4,q1:'What was the highest number of wickets taken by an individual?',ops:[27,21,20],ans:'27',submitted:false,correct:''},
    {id:5,q1:'Where was the finals held?',ops:['Mumbai','Chennai'],ans:'Mumbai',submitted:false,correct:''}
  ];

 $scope.submitQuiz = function()
 {

     if($scope.arr.length == $scope.selectedArray.length)
     {
         $scope.submitted = true;
         for(var i=0;i<$scope.selectedArray.length;i++)
          {
              if($scope.selectedArray[i].valueSelect == $scope.arr[i].ans)
               {
                   $scope.arr[i].correct = true;
                   $scope.rightCount++;
               }
              else {
                    $scope.arr[i].correct = false;
                    $scope.wrongCount++;
               }
           }

            var ctxB = document.getElementById("barChart").getContext('2d');
            if(window.bar != undefined)
               window.bar.destroy();
            window.bar = new Chart(ctxB, {
                         type: 'bar',
                         data : {
                                labels: ["Correct","Incorrect"],
                                datasets: [{
                                    label : 'Count',
                                    data: [$scope.rightCount,$scope.wrongCount],
                                    backgroundColor: [
                                                     'rgba(0, 0 , 0, 1.2)',
                                                      'rgba(0, 0 , 0, 1.2)'
                                                    ],
                                    borderWidth: 2
                                }]
                             },
                        options: {
                              scales: {
                                   yAxes: [{
                                       ticks: {
                                               beginAtZero:true
                                              }
                                          }]
                                       }
                                   }
                   });
         $scope.submitted = true;
      }
  }


  $scope.clear =  function()
  {
    $scope.selectedArray = [];
    $scope.submitted= false;;
    $scope.wrongCount = 0;
    $scope.rightCount = 0;
    for(var i=0; i<$scope.arr.length;i++)
    {
      $scope.arr[i].correct = '';
    }
  }
});

//directive
app.directive('check', function () {
       return {
           require: 'ngModel',
           link: function (scope, element, attributes, control) {
               control.$validators.check = function (modelValue, viewValue) {

                   if (modelValue != undefined) // if empty, correct value
                   {
                     //console.log("here");
                       return true;
                   }
                   return false; // wrong value
               };
           }
       };
   });
