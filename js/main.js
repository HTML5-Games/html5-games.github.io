/*!
 * Main JS code goes here
 */
////
// Globals
var postId; // TODO: Remove

// Init Parse
Parse.initialize("cF1KaOFNgSERAxKgv4ZUDE3XBnMEpGxF2ACWmMZE", "tnNd8KSP42GsJ9ZyBVaaN9REYRW76gUj9sxm8e3i");

// Init Parse objects
var Post = Parse.Object.extend("Post");
var Comment = Parse.Object.extend("Comment");
var Message = Parse.Object.extend("Message");
var InsMessage = Parse.Object.extend("Message");
var Game = Parse.Object.extend("Game");
var Profile = Parse.Object.extend("User")

function buildProfile() {
	level1 = '<b>Newb</b>Basic access';
	level2 = '<b>Newb++</b>Can submit games';
	level3 = '<b>Minion</b>Can rate blog posts';
	level4 = '<b>Strategist</b>Can comment on blog posts';
	level5 = '<b>Commander</b>Can add game ideas';
	level6 = '<b>Elite</b>?';
	level7 = '<b>Elite++</b>Can write blog posts';
	level8 = '<b>Mod. Jr.</b>Can delete comments';
	level9 = '<b>Moderator</b>Can edit blog posts<br>Can delete blog posts<br>Can rankup "Mod. Jr."s';
	level10 = '<b>Admin</b>Delete posts/threads<br>Can feature games<br>Can rankup "Moderator"s';
	level11 = '<b>Leader</b>Can demote users<br>Can rankup "Admin"s';
	$("#level1").popover({html: true, placement: "bottom", content: level1});
	$("#level2").popover({html: true, placement: "bottom", content: level2});
	$("#level3").popover({html: true, placement: "bottom", content: level3});
	$("#level4").popover({html: true, placement: "bottom", content: level4});
	$("#level5").popover({html: true, placement: "bottom", content: level5});
	$("#level6").popover({html: true, placement: "bottom", content: level6});
	$("#level7").popover({html: true, placement: "bottom", content: level7});
	$("#level8").popover({html: true, placement: "bottom", content: level8});
	$("#level9").popover({html: true, placement: "bottom", content: level9});
	$("#level10").popover({html: true, placement: "bottom", content: level10});
	$("#level11").popover({html: true, placement: "bottom", content: level11});

	currentUser = Parse.User.current();
	currentProfile = window.location.href.replace("http://html5-games.github.io/profile?","");
	if (currentUser != null) {
		$("#username-profile").text(currentUser.get("username"));
		var joined = currentUser.createdAt;
		$("#joined-profile").text(joined.getMonth() + "/" + joined.getDate() + "/" + joined.getFullYear().toString().substring(2, 4));
		$("#level-profile").text(currentUser.get("level"));
		$(".persona-icon").each(function() {
			$(this).css("background-image", "url('http://www.gravatar.com/avatar/" + md5(currentUser.get("email")) + ".jpg?s=190&d=wavatar')");
		});
		for (var i = 1; i <= currentUser.get("level"); i++) {
			$level = $("#level" + i);
			$level.removeClass("locked");
			$level.text(i);
		}
	}
	else if (currentProfile != currentUser.get("username")) {
		var FindUser = new Parse.Query(Profile);
		FindUser.equalTo("username", currentProfile.toLowerCase());
		FindUser.limit(1);
		FindUser.find({
			success: function(results){
				for (var i = 0; i >= results.length; i++){
					var UserProfile = results[i];
					
					$("#username-profile").text(UserProfile.get("username"));
					var joined = UserProfile.createdAt;
					$("#joined-profile").text(joined.getMonth() + "/" + joined.getDate() + "/" + joined.getFullYear().toString().substring(2, 4));
					$("#level-profile").text(UserProfile.get("level"));
						$(".persona-icon").each(function() {
						$(this).css("background-image", "url('http://www.gravatar.com/avatar/" + md5(UserProfile.get("email")) + ".jpg?s=190&d=wavatar')");
					});
					for (var i = 1; i <= UserProfile.get("level"); i++) {
						$level = $("#level" + i);
						$level.removeClass("locked");
						$level.text(i);
					}
				}
			},
			error: function(error){
				alert("There was an error retrieve the profile. Error " + error.code + " " + error.description + " " + error.message);
			}
		})
			
	}
	else {
		window.location = "http://www.html5-games.github.io/404.html";
	}
}

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
	else if (email.length == 0) {
			$email.parent().parent().addClass("error");
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
	user.set("email", email);
	user.set("level", 1);

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
	window.location.href = 'index.html';
	buildMenu();
}

function buildMenu() {
	// Get login menu
	$loginMenu = $("#login-menu");
	
	// Get user span
	$userSpan = $("#user");
	
	// Clear login menu
	$loginMenu.html("");
	
	// If user not logged in
	if (Parse.User.current() == null) {
		//Added User and Pass Inputs
		var $login = $('<li><a tabindex="-1" href="#login" role="button" data-toggle="modal">Login</a></li>');
		var $signup = $('<li><a tabindex="-1" href="#signup" role="button" data-toggle="modal">Sign Up</a></li>');
		$loginMenu.append($login);
		$loginMenu.append($signup);
		$userSpan.text("User");
	}
	// If user logged in
	else {
		var $profile = $('<li><a tabindex="-1" href="profile?' + Parse.User.current().get("username") + '">Profile</a></li>');
		var $editProfile = $('<li><a tabindex="-1" href="editprofile.html">Settings</a></li>');
		var $logout = $('<li><a tabindex="-1" href="#" onclick="logOut();">Logout</a></li>');
		$loginMenu.append($profile);
		$loginMenu.append($editProfile);
		$loginMenu.append($logout);
		$userSpan.text(Parse.User.current().get("username"));
	}
}

loginModal = '<div id="login" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button><h3 id="loginLabel">Login</h3></div><div class="modal-body"><form style="margin-bottom: 0px;"><fieldset><div class="control-group"><label for="name-login">Username</label><div class="controls"><input type="text" id="name-login" name="name-login"><span class="help-inline"></span></div></div><div class="control-group"><label for="psword-login">Password</label><div class="controls"><input type="password" id="psword-login" name="psword-login"><span class="help-inline"></span></div></div></fieldset></form></div><div class="modal-footer"><button class="btn btn-inverse" onclick="logIn()">Login</button></div></div>';
signupModal = '<div id="signup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="signinLabel" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button><h3 id="signupLabel">Sign Up</h3></div><div class="modal-body"><form style="margin-bottom: 0px;"><fieldset><div class="control-group"><label for="name-signup">Username *</label><div class="controls"><input type="text" id="name-signup" name="name-signup"><span class="help-inline"></span></div></div><div class="control-group"><label for="psword-signup">Password *</label><div class="controls"><input type="password" id="psword-signup" name="psword-signup"><span class="help-inline"></span></div></div><div class="control-group"><label for="psword2-signup">Confirm Password *</label><div class="controls"><input type="password" id="psword2-signup" name="psword2-signup"><span class="help-inline"></span></div></div><div class="control-group"><label for="email-signup">Email *</label><div class="controls"><input type="email" id="email-signup" name="email-signup"><span class="help-inline"></span></div></div></fieldset></form></div><div class="modal-footer"><button class="btn btn-inverse" onclick="signUp()">Sign Up</button></div></div>';
$("body").append($(loginModal)).append($(signupModal));

buildMenu();

// Chat

var isInChat = false;
var colors = ["red","purple","blue","green","yellow","orange"];

function sendMessage() {
	// Make sure that user is logged in
	currentUser = Parse.User.current();
	if (currentUser == null) {
		alert("You must login to use chat.");
		return false;
	}
	
	text = $("#message-chat").val();
	
	// Make sure that message isn't empty
	if (text == "") {
		alert("Can't send empty message!");
		return false;
	}
	
	// Make sure that message doesn't contain a "<textarea>,<div>,<canvas>,<script> or an <input>"
	if (text.indexOf("<textarea>") >= 0 || text.indexOf("<div>") >= 0 || text.indexOf("<canvas>") >= 0 || text.indexOf("<script>") >= 0 || text.indexOf("<input") >= 0) {
		alert("HTML is not allowed in chat!");
		return false;
	}
	
	// Fun Codes/ Cammans /*Make chat more interesting*/
	if (text.indexOf("1337: ") >= 0 && text.indexOf("1337: ") <= 6){
		text = text.replace("1337:", "");
		text = text.replace(/e/gi, "3");
		text = text.replace(/l/gi, "1");
		text = text.replace(/a/gi, "4");
		text = text.replace(/g/gi, "6");
		text = text.replace(/t/gi, "7");
		text = text.replace(/z/gi, "2");
		text = text.replace(/s/gi, "5");
	}
	// Make them close color elements
	for (c in colors){
		if (text.indexOf("<" + colors[c] + ">") !== -1 && text.indexOf("</" + colors[c] + ">") == -1){
			alert("You must close the <" + colors[c] + "> with </" + colors[c] + ">");
			return false;
		}	
	}
	

	// Create new message
	var message = new Message();
	message.set("text", text);
	message.set("user", currentUser.get("username"));
	
	// Save message
	message.save(null, {
		success: function(message) {
			// Clear message box
			$("#message-chat").val("");
			
			// Update message display
			displayMessages(true);
		},
		error: function(message, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function displayMessages(scroll) {
	$messages = $("#chat-messages");
	
	// Get messages from Parse
	var query = new Parse.Query(Message);
	
	// Retrieve only the most recent ones
	query.descending("createdAt");
	
	// Retrieve only the last 25
	query.limit(25);
	
	query.find({
		success: function(messages) {
			// The final html for $messages
			var result = "";
	
			while (messages.length > 0) {
				var messageObject = messages.pop();
				var user = messageObject.get("user");
				var m = '<div class="messages">';
				m += "<a href='profile?" + user + "'>" +  user + "</a> ";
				m += "(" + messageObject.createdAt.toLocaleTimeString() + "): ";
				m += messageObject.get("text");
				m += "</div>"
				result += m;
			}
			
			$messages.html(result);
			
			if (scroll) {
				// Scroll div
				var chatDiv = document.getElementById("chat-messages");
				chatDiv.scrollTop = chatDiv.scrollHeight;
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function showMessages(scroll) {
	$messages = $("#chat-messages");
	
	// Get messages from Parse
	var query = new Parse.Query(InsMessage);
	
	// Retrieve only the most recent ones
	query.descending("createdAt");
	
	// Retrieve only the last 25
	query.limit(25);
	
	query.find({
		success: function(messages) {
			// The final html for $messages
			var result = "";
	
			while (messages.length > 0) {
				var messageObject = messages.pop();
				var user = messageObject.get("user");
				var m = '<div class="messages">';
				m += "<a href='profile?" + user + "'>" +  user + "</a> ";
				m += "(" + messageObject.createdAt.toLocaleTimeString() + "): ";
				m += messageObject.get("text");
				m += "</div>"
				result += m;
			}
			
			$messages.html(result);
			
			if (scroll) {
				// Scroll div
				var chatDiv = document.getElementById("chat-messages");
				chatDiv.scrollTop = chatDiv.scrollHeight;
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

//Chat user list

var users = new Array();

function addToUserList(){
	currentUser = Parse.User.current();
	if (currentUser == null){
		
	}
	else {
		users[users.length + 1] = currentUser.get("username");
		users.sort();
	}
}

function displayUsers(){
	currentUser = Parse.User.current();
	if (currentUser == null){
		
	}
	else {
		users.sort();
		$('#chat-members').remove('p');
		for (i=0; i >= users.length; i++ ){
			var pnode = document.createElement("p");
			var userNameTxt = document.createTextNode(currentUser.get("username"));
			pnode.appendChild(userNameTxt);
			document.getElementById("chat-members").appendChild(pnode);
		}
	}
}

function removeFromUserList(){
	currentUser = Parse.User.current();
	if (currentUser == null){
		
	}
	else {
		
	}
}

// Blog
function post() {
	// Make sure that user is logged in
	currentUser = Parse.User.current();
	if (currentUser == null) {
		alert("You must login to write posts.");
		return false;
	}
	
	// Make sure that user at least level 7
	//if (currentUser.get("level") < 7) {
	//	alert("You must be level 7 or higher to write posts.");
	//	return false;
	//}
	
	// Get post data
	var title = $("#title-post").val();
	var text = $("#text-post").val();
	var tags = [];
	if ($("#tag1-post").val() != "") {
		tags.push($("#tag1-post").val());
	}
	if ($("#tag2-post").val() != "") {
		tags.push($("#tag2-post").val());
	}
	if ($("#tag3-post").val() != "") {
		tags.push($("#tag3-post").val());
	}
	if ($("#tag4-post").val() != "") {
		tags.push($("#tag4-post").val());
	}
	
	// Create new post
	var post = new Post();
	post.set("title", title);
	post.set("text", text);
	post.set("tags", tags);
	post.set("user", currentUser.get("username"));
	
	// Save message
	post.save(null, {
		success: function(post) {
			// Hide modal
			$("#post").modal("hide");
			
			// Update posts
			displayPosts();
		},
		error: function(message, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function comment() {
	// Make sure that user is logged in
	currentUser = Parse.User.current();
	if (currentUser == null) {
		alert("You must login to write posts.");
		return false;
	}
	
	// Make sure that user at least level 4
	//if (currentUser.get("level") < 4) {
	//	alert("You must be level 4 or higher to write posts.");
	//	return false;
	//}
	
	// Get comment data
	var text = $("#text-comment").val();
	
	// Create new comment
	var comment = new Comment();
	comment.set("text", text);
	comment.set("post", postId);
	comment.set("user", currentUser.get("username"));
	
	// Save message
	comment.save(null, {
		success: function(comment) {
			// Hide modal
			$("#comment").modal("hide");
			
			// Update posts
			displayPosts();
		},
		error: function(message, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function displayPosts() {
	$article = $("article");

	// Get messages from Parse
	var query = new Parse.Query(Post);

	// Retrieve only the most recent ones
	query.descending("createdAt");

	// Retrieve only the last 5
	query.limit(5);

	query.find({
		success: function(posts) {
			// The final html for $article
			var result = "";
			
			var n = 0;
			var posts2 = [];
			while (posts.length > 0) {
				// Update n
				n++;
				
				// Get post data
				var post = posts.pop();
				var title = post.get("title");
				var text = post.get("text");
				var user = post.get("user");
				var createdAt = post.createdAt;
				
				posts2.unshift(post);
				
				// Post
				var p = '<section class="post block"><div class="container">';
				p += '<h2>' + title + '</h2>';
				p += '<p class="lead-small">Posted '; 
				p += 'on ' + createdAt.toLocaleDateString();
				p += ' by ' + user;
				p += ' - <a href="#comments-link-' + n + '">0 comments</a></p>';
				p += '<div class="panel lead">' + text + '</div>';
				
				// Comments
				p += '<section class="comments" id="comments-link-' + n + '">';
				p += '<h3>Comments</h3>';
				p += '<div id="comments-' + n + '">';
				p += '<p class="lead-small">Loading...</p>';
				p += '</div>';
				p += '<button class="btn" tabindex="-1" onclick="postId=\'' + post.id + '\';$(\'#comment\').modal(\'show\');">Post Comment</button>';
				p += '</div>';
				
				// End post
				p += '</section></div></section>';
				result += p;
			}

			$article.html(result);
			
			for (i = n; i > 0; i--) {
				loadComments(posts2[i - 1], i);
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function loadComments(post, n) {
	// Get div
	$comments = $("#comments-"+n);
	
	// Load comments
	var query = new Parse.Query(Comment);
	query.equalTo("post", post.id);
	query.descending("createdAt");
	query.find({
		success: function(comments) {
			if (comments.length == 0) {
				$comments.html('<p class="lead-small">No comments</p>');
			}
			else {
				var result = "";
				while (comments.length > 0) {
					// Get comment data
					var comment = comments.pop();
					var text = comment.get("text");
					var user = comment.get("user");
					var createdAt = comment.createdAt;

					// By who, when
					var c = '<div class="comment">';
					c += 'By ' + user;
					c += ' at ' + createdAt.toLocaleTimeString();
					c += ' on ' + createdAt.toLocaleDateString();

					// Comment
					c += '<p class="lead-small">';
					c += text;
					c += '</p>';

					// End comment
					c += '</div>';
					result += c;
				}
				
				$comments.html(result);
			}
		}
	});
}

// Games
function submitGame() {
	// Make sure that user is logged in
	currentUser = Parse.User.current();
	if (currentUser == null) {
		alert("You must be logged in to submit games.");
		return false;
	}
	
	// Make sure that user at least level 2
	//if (currentUser.get("level") < 2) {
	//	alert("You must be level 2 or higher to submit games.");
	//	return false;
	//}
	
	// Get post data
	var title = $("#title-game").val();
	var url = $("#url-game").val();
	var desc = $("#desc-game").val();
	var genres = [];
	if ($("#genre1-game").val() != "") {
		genres.push($("#genre1-game").val());
	}
	if ($("#genre2-game").val() != "") {
		genres.push($("#genre2-game").val());
	}
	
	// Create new post
	var game = new Game();
	game.set("title", title);
	game.set("url", url);
	game.set("genres", genres);
	game.set("desc", desc);
	game.set("featured", false);
	game.set("user", currentUser);
	
	// Save message
	game.save(null, {
		success: function(game) {
			// Hide modal
			$("#submit-game").modal("hide");
		},
		error: function(message, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function displayFeaturedGames() {
	$featured = $("#featured");
	
	// Get games from Parse
	var query = new Parse.Query(Game);
	
	// Get only featured games
	query.equalTo("featured", true);
	
	// Retrieve at most 4
	query.limit(4);

	query.find({
		success: function(games) {
			// The final html for $featured
			var result = "";

			while (games.length > 0) {
				// Get game data
				var game = games.pop();
				var title = game.get("title");
				var url = game.get("url");
				var genres = game.get("genres");
				var desc = game.get("desc");
				
				// Post
				var g = '<a href="' + url + '" class="project-box">';
				g += '<h2>' + title + '</h2>';
				g += '<div>';
				for (var i = 0; i < genres.length; i++) {
					g += '<span class="label label-important">' + genres[i] + '</span> ';
				}
				g += '</div>';
				g += desc;
				g += '</a>';
				
				result += g;
			}

			$featured.html(result);
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

//Keyb and mouse Events, Keep at bottom
window.onkeydown = function(e){
	
	e = e || window.event;
	
	code = e.keycode || e.which;
	
	
	if (isInChat){
		if (code == 13){
			sendMessage();
		}
	}
	//Fun/Dev Codes
}
