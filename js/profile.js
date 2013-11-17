//Profile Javascript


//Not sure if I need to initialize again, but better safe than sorry.
Parse.initialize("cF1KaOFNgSERAxKgv4ZUDE3XBnMEpGxF2ACWmMZE", "tnNd8KSP42GsJ9ZyBVaaN9REYRW76gUj9sxm8e3i");

var Profile = Parse.Object.extend("Profile");

function loadProfile(){
        var query = new Parse.Query(Profile);
        var currentUser = Parse.User.current();
        query.equalTo("user", currentUser);
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
