define(function () {
  var checkUser = function(login, password, successCB, errorCB) {
    var dummyUser = {login: "test", password: "test"};
	var users = [dummyUser, kony.store.getItem("users")];
    var matchedUsers = null;
    var callback = null;
    
    for (var i = 0; i < users.length; i++) {
      if (users[i].login === login.toLocaleLowerCase() && users[i].password === password) {
        matchedUsers = true; 
        break;
      }
    }
    
    if (matchedUsers) {
      callback = successCB;
    } else {
      callback = errorCB;
    }
    
    return callback();
     
  };
  
  var registerUser = function(login, password, successCB, errorCB) {
    var users = [kony.store.getItem("users")];
    var matchedUser = null;
    var callback = null;
    for (var i = 0; i < users.length; i++) {
      if (users[i].login === login.toLocaleLowerCase()) {
        matchedUser = true; 
        break;
      }
    }
  
    if (matchedUser) {
      callback = errorCB;
    } else {
      var user = {login: login.toLocaleLowerCase(), password: password};
      users.push(user);
      kony.store.setItem("users", users);
      
      callback = successCB;
    }
    return callback();
    
  };
  return {
    checkUser: checkUser,
    registerUser: registerUser
  };
});