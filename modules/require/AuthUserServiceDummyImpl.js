define(function () {
  var checkUser = function(login, password, successCB, errorCB) {
    var testUser = {login: 'test', password: 'test'};
    //kony.store.setItem("users", testUser);
    
	var users = [testUser];//kony.store.getItem("users");
    var matchedUsers = users.filter(function(u) { 
      return u.login === login.toLocaleLowerCase() && u.password === password.toLocaleLowerCase(); 
    });
    var callback = null;
    
    if (matchedUsers.length > 0) {
      callback = successCB;
    } else {
      callback = errorCB;
    }
    
    return callback();
     
  };
  
  var registerUser = function(fullName, login, password, successCB, errorCB) {
    var users = kony.store.getItem("users");
    var matchedUsers = users.filter(function(u) { 
      return u.userId === userId; 
    });
  
    var callback = null;
    if (matchedUsers.length > 0) {
      callback = errorCB;
    } else {
      var user = {login: login, password: password};
      users.push(user);
      kony.store.setItem("users", users);
      
      callback = successCB;
    }
    
  }
  return {
    checkUser: checkUser,
    registerUser: registerUser
  };
});