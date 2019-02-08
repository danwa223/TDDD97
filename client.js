var welcomeView;
var profileView;
var userToken;
var userEmail;

window.onload = function() {
  welcomeView = document.getElementById("welcomeView");
  profileView = document.getElementById("profileView");
  SetBody(welcomeView);
}

function SetBody(view){ //the actual display function
  document.getElementById("body").innerHTML = view.innerHTML;
}

//USER INFO FOR LOGED IN SESSIONS
function UserInfo(token, view, email) {
  var returnCode = serverstub.getUserDataByEmail(token,email);
  var userData = returnCode.data;
  //TODO: do stuff here. Grab and display? user info.
}

function Login(type){ //Type specifies whether we come from signUp redirect or from default log in.
  if (type === "signUp"){
    var email = document.getElementById("signup_email_address").value;
    var password = document.getElementById("signup_new_password").value;
  } else { //we come from login
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;
  }
  var returnCode = serverstub.signIn(email, password);
  //alert(email);
  //alert(password);
  if (returnCode.success == true){
    userEmail = email;
    userToken = returnCode.data;
    SetBody(profileView);
    //userInfo(userToken, "home-", userEmail);
    //userInfo(userToken, "account-", userEmail);
    //wallData(userToken, "home-", userEmail);
  } else {
    document.getElementById("login_error_area").innerHTML = returnCode.message;
  }
}

function Logout(){
  serverstub.signOut(userToken);
  SetBody(welcomeView);
}

//single onsubmit validators
function CheckEmail() {
  var email = document.getElementById("signup_email_address").value;
  if (email != null) {
    if ((/^(\S+@\S+)$/.test(email)) != true) {
      document.getElementById("signup_error_area").innerHTML = "You have entered an invalid email address!";
    } else {
      document.getElementById("signup_error_area").innerHTML = "";
    }
  }
}

function PasswordLengthChecker() {
  var password = document.getElementById("signup_new_password").value;
  if (password.length < 5) { //5 is of course really short but faster debuging.
    document.getElementById("signup_error_area").innerHTML = "Your password must be at least 5 characters long.";
  } else {
    document.getElementById("signup_error_area").innerHTML = "";
  }
}

function PasswordMatcher() {
  var password = document.getElementById("signup_new_password").value;
  var repeat_password = document.getElementById("signup_repeat_password").value;
  if (password != repeat_password) {
    document.getElementById("signup_error_area").innerHTML = "Your passwords do not match.";
  } else {
    document.getElementById("signup_error_area").innerHTML = "";
  }
}

//sign up validator, for when the button is pressed
function ValidateInformation() {
  var selectPane = document.getElementById("signup_gender"); //Helper function, grabs the multi option select pane
  var allInformation = {"email":document.getElementById("signup_email_address").value,
      "password":document.getElementById("signup_new_password").value,
      "firstname":document.getElementById("signup_first_name").value,
      "familyname":document.getElementById("signup_family_name").value,
      "gender":selectPane.options[selectPane.selectedIndex].value,
      "city":document.getElementById("signup_city_name").value,
      "country":document.getElementById("signup_country_name").value
  }
  if (allInformation.email != null) {
    if ((/^(\S+@\S+)$/.test(allInformation.email)) != true) { //Simple reg exp comparison
      alert("You have entered an invalid email address!");
      return (false);
    }
  }
  var repeat_password = document.getElementById("signup_repeat_password").value;
  if (allInformation.password.length < 5) {
    alert("Your password must be at least 5 characters long.");
    return (false);
  }
  if (allInformation.password != repeat_password) {
    alert("Your passwords do not match.");
    return (false);
  }
  var signUpValue = serverstub.signUp(allInformation);
  document.getElementById("signup_error_area").innerHTML = signUpValue.message;
  if (signUpValue.success == true){
    alert("Sign up succesfull. You are now being loged in...");
  } else {
    alert(signUpValue.message); //debuger, error displayer.
  }
  Login("signUp");
}
