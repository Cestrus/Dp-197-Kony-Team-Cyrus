define(function () {
  var getUsersStore = function () {
    var usersData = kony.store.getItem("users");
    
    var users = null;
    if (!usersData) {
      users = [];
      setUsersStore(users);
    } else {
      users = JSON.parse(usersData);
    }
    
    return users;
  };
  
  var setUsersStore = function (users) {
    if (!Array.isArray(users)) {
      throw new Error("Users has to be of Array type");
    }
    kony.store.setItem("users", JSON.stringify(users));
  };
  
  var checkUser = function(login, password, successCB, errorCB) {
    var dummyUser = {login: "test", password: "test"};

    var users = getUsersStore();
    users.push(dummyUser);
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
    var users = getUsersStore();
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
      setUsersStore(users);

      callback = successCB;
    }
    return callback();

  };
  return {
    checkUser: checkUser,
    registerUser: registerUser
  };
});