window.onload = function() {
  display();
};

;
display = function(){
document.getElementById("view").innerHTML = document.getElementById("welcomeview").innerHTML;
  document.getElementById('profileView').style.display = 'none';
};

//single onsubmit validators
function CheckEmail() {
  var email = document.getElementById("email_address").value;
  if (email != null) {
    if ((/^(\S+@\S+)$/.test(email)) != true) {
      document.getElementById("error_area").innerHTML = "You have entered an invalid email address!";
    } else {
      document.getElementById("error_area").innerHTML = "";
    }
  }
}

function PasswordLengthChecker() {
  var password = document.getElementById("new_password").value;
  if (password.length < 8) {
    document.getElementById("error_area").innerHTML = "Your password must be at least 8 characters long.";
  } else {
    document.getElementById("error_area").innerHTML = "";
  }
}

function PasswordMatcher() {
  var password = document.getElementById("new_password").value;
  var repeat_password = document.getElementById("repeat_password").value;
  if (password != repeat_password) {
    document.getElementById("error_area").innerHTML = "Your passwords do not match.";
  } else {
    document.getElementById("error_area").innerHTML = "";
  }
}

//sign up validator, for when the button is pressed
function ValidateInformation() {
  var email = document.getElementById("email_address").value;
  if (email != null) {
    if ((/^(\S+@\S+)$/.test(email)) != true) { //Simple reg exp comparison
      alert("You have entered an invalid email address!");
      return (false);
    }
  }
  var password = document.getElementById("new_password").value;
  var repeat_password = document.getElementById("repeat_password").value;
  if (password.length < 8) {
    alert("Your password must be at least 8 characters long.");
    return (false);
  }
  if (password != repeat_password) {
    alert("Your passwords do not match.");
    return (false);
  }
  var selectPane = document.getElementById("gender"); //Helper function, grabs the multi option select pane
  var allInformation = {"email":document.getElementById("email_address").value,
      "password":document.getElementById("new_password").value,
      "firstname":document.getElementById("first_name").value,
      "familyname":document.getElementById("family_name").value,
      "gender":selectPane.options[selectPane.selectedIndex].value,
      "city":document.getElementById("city_name").value,
      "country":document.getElementById("country_name").value
      }
  var signUpValue = serverstub.signUp(allInformation); //Supposed to be of compound type, inputObject.email etc. WHAT IS THE FREAKING SYNTAX
  document.getElementById("error_area").innerHTML = signUpValue.message;
  alert(signUpValue.message);
  return(true);
}

//Test commit
/*document.getElementById('login_button').innerHTML =  function() {
  alert("I am an alert box!");
}*/

/*function validateSignIn(data){
		var email= document.getElementById("logincontainer").getElements[0].value;
		var password = document.getElementByid("logincontainer").getElements[1].value;

			result = serverstub.signIn(email, password);
			if (result["success"]){
				token = result ["data"];

					}
			else {
				document.getElementsById("signInMessage").innerHTML= result ["message"];
			}
}*/

//document.getElementById("registrationSubmitButton").onclick = ValidateEmail(document.getElementById(first_name));

/*var token = null;
funtion profileView() {
document.getElementByid('loginView').style.display = "none";
document.getElementByid('profileView').style.display = "block";
}
funtion welcomView() {
document.getElementByid('loginView').style.display = "block";
document.getElementByid('profileView').style.display = "none";
}
displayView = function(){


};
window.onload = function(){

   if (localStorage.getItem("Ioggedinuers") == "{}" || localStorage.getItem("Ioggedinuers") == null){
     welcomView();
     }
   else {
     profileView();

     }
   };


*/
