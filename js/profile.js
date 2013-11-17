//Profile Javascript


//Not sure if I need to initialize again, but better safe than sorry.
Parse.initialize("cF1KaOFNgSERAxKgv4ZUDE3XBnMEpGxF2ACWmMZE", "tnNd8KSP42GsJ9ZyBVaaN9REYRW76gUj9sxm8e3i");

var Profile = Parse.Object.extend("Profile");

function loadProfile(){
        var query = new Parse.Query(Profile);
        var currentUser = Parse.User.current();
        query.equalTo("user", currentUser);
        query.first({
                success: function(object) {
                        // Successfully retrieved the object.
                },
                error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                }
        });
}
