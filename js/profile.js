//Profile Javascript


//Not sure if I need to initialize again, but better safe than sorry.
Parse.initialize("cF1KaOFNgSERAxKgv4ZUDE3XBnMEpGxF2ACWmMZE", "tnNd8KSP42GsJ9ZyBVaaN9REYRW76gUj9sxm8e3i");

var Profile = Parse.Object.extend("Profile");
var User = Parse.Object.extend("User");

function loadProfile(){
        var query = new Parse.Query(Profile);
        var userProfile = window.location.href.replace("http://html5-games.github.io/","");
        query.equalTo("user", userProfile);
        query.limit(1);
        query.find({
                success: function(results) {
                        // Successfully retrieved the object.
                        for (var i = 0; i < results.length; i++) { 
                                var object = results[i];
                                alert(object.id + " " + object.get("user"));
                                document.getElementById("aboutProfile").innerHTML = object.get("aboutMe");
                        }
                        
                },
                error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                }
        });
}

function saveProfile(){
        var profile = new Profile();
        
        profile.save(null, {
                success: function(gameScore) {
                        profile.set("user", Parse.User.current().get("username"));
                        profile.set("aboutMe", document.getElementById("profileDesc").value);
                },
                error: function(gameScore, error) {
                        alert("Error: " + error.code + " " + error.message);
                }
        });
}
