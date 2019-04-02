angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
    /* Get all the listings, then bind it to the scope */
    $scope.addUser = function(newFirst, newMiddle, newLast, newPass, newPassVerify, newEmail, newPhone) {
      if(newPass != newPassVerify)
      {
        alert("passwords don't match, please try again.");
        // window.location.href = "../index.html";
      }
      Users.create(newFirst, newMiddle, newLast, newPass, newPhone, newEmail).then(function(response)
      {
        if(response.status == 200)
          alert("user created successfully, please sign in!");
      }, function(error)
      {
        alert("user not created, please try again")
        // window.location.href = "../index.html";
      });
    };
    
    $scope.authenticateUser = function(email, password){
      Users.authenticate(email, password).then(function(response)
      {
        if(response.status == 200)
        {
          window.location.href = '../home.html';
          $scope.storedUsername = sessionStorage.setItem("username", email);
          $scope.storedPassword = sessionStorage.setItem("password", password);
        }
      },function(error){
          alert("Please try again, incorrect credentials provided");
          window.location.href = "../index.html";
      });
    };


    $scope.deleteUser = function(id) {

      Users.delete(id).then(function(response)
      {
        $scope.users = response.data;
          
          Users.getAll().then(function(response) {
            $scope.users = response.data;
          }, function(error) {
            console.log('Unable to retrieve users:', error);
          });}, function(error) {
        console.log('Unable to retrieve users:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

    $scope.showName = function()
    {
      $scope.sessionUsername = sessionStorage.getItem('username');
    };
  }
]);