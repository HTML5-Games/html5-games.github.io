/*!
 * Main JS code goes here
 */

// Init DOM elements
var $linkTiles = $(".link-tile");
$linkTiles.eq(0).height($linkTiles.eq(1).height() + 32 /* Padding and Border */);

// Init Parse
Parse.initialize("cF1KaOFNgSERAxKgv4ZUDE3XBnMEpGxF2ACWmMZE", "tnNd8KSP42GsJ9ZyBVaaN9REYRW76gUj9sxm8e3i");

// Init Parse objects
var Post = Parse.Object.extend("Post");
var Comment = Parse.Object.extend("Comment");

// Log In & Sign Up
function signUp() {
	// Get values
	var $username = $("#name-signup"),
	    $password = $("#psword-signup"),
	    $password2 = $("#psword2-signup"),
	    $email = $("#email-signup");
	    
	var username = $username.val(),
	    password = $password.val(),
	    password2 = $password2.val(),
	    email = $email.val();
	
	// Remove styling
	$username.parent().parent().removeClass("error");
	$password.parent().parent().removeClass("error");
	$password2.parent().parent().removeClass("error");
	$email.parent().parent().removeClass("error");
	$username.parent().children().eq(1).text("");
	$password.parent().children().eq(1).text("");
	$password2.parent().children().eq(1).text("");
	$email.parent().children().eq(1).text("");
	
	// Validate
	if (username.length == 0) {
		$username.parent().parent().addClass("error");
		return false;
	}
	else if (password.length < 7) {
			$password.parent().parent().addClass("error");
			$password.parent().children().eq(1).text("Password must be at least 7 characters!");
			return false;
	}
	else if (password != password2) {
		$password.parent().parent().addClass("error");
		$password2.parent().parent().addClass("error");
		$password.parent().children().eq(1).text("Passwords don't match!");
		return false;
	}
	
	// Sign up user
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	if (email != "") {
		user.set("email", email);
	}

	user.signUp(null, {
		success: function(user) {
			// Login user
			Parse.User.logIn(username, password, {
				success: function(user) {
					buildMenu();
				},
				error: function(user, error) {
					alert("Error: " + error.code + " " + error.message);
					return false;
				}
			});
			
			// Hide modal
			$("#signup").modal("hide");
			
			// Show menu
			$("#login-menu-link").dropdown('toggle');
		},
		error: function(user, error) {
			if (error.code == 202) {
				$username.parent().parent().addClass("error");
				$username.parent().children().eq(1).text("Username taken!");
				return false;
			}
			else {
				alert("Error: " + error.code + " " + error.message);
				return false;
			}
		}
	});
}

function logIn() {
	// Get values
	var $username = $("#name-login"),
	    $password = $("#psword-login");
	    
	var username = $username.val(),
	    password = $password.val();
	
	// Remove styling
	$username.parent().parent().removeClass("error");
	$password.parent().parent().removeClass("error");
	$username.parent().children().eq(1).text("");
	$password.parent().children().eq(1).text("");
	
	// Validate
	if (username.length == 0) {
		$username.parent().parent().addClass("error");
		return false;
	}
	else if (password.length == 0) {
			$password.parent().parent().addClass("error");
			return false;
	}
	
	Parse.User.logIn(username, password, {
		success: function(user) {
			buildMenu();
			
			// Hide modal
			$("#login").modal("hide");

			// Show menu
			$("#login-menu-link").dropdown('toggle');
		},
		error: function(user, error) {
			if (error.code == 101) {
				$username.parent().parent().addClass("error");
				$password.parent().parent().addClass("error");
				return false;
			}
			else {
				alert("Error: " + error.code + " " + error.message);
				return false;
			}
		}
	});
}

function logOut() {
	Parse.User.logOut();
	buildMenu();
}

function buildMenu() {
	// Get login menu
	$loginMenu = $("#login-menu");
	
	// Clear login menu
	$loginMenu.html("");
	
	// If user not logged in
	if (Parse.User.current() == null) {
		$login = $('<li><a tabindex="-1" href="#login" role="button" data-toggle="modal">Login</a></li>');
		$signup = $('<li><a tabindex="-1" href="#signup" role="button" data-toggle="modal">Sign Up</a></li>');
		$("#login-menu").append($login);
		$("#login-menu").append($signup);
	}
	// If user logged in
	else {
		$profile = $('<li><a tabindex="-1" href="profile.html">Hi, ' + Parse.User.current().get("username") + '</a></li>');
		$logout = $('<li><a tabindex="-1" href="#" onclick="logOut();">Logout</a></li>');
		$("#login-menu").append($profile);
		$("#login-menu").append($logout);
	}
}

buildMenu();
