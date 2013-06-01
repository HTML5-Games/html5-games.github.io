/*!
 * Main JS code goes here
 */

// Init DOM elements
var $linkTiles = $(".link-tile");
$linkTiles.eq(0).height($linkTiles.eq(1).height() + 32 /* Padding and Border */);

// Init Parse
Parse.initialize("cF1KaOFNgSERAxKgv4ZUDE3XBnMEpGxF2ACWmMZE", "tnNd8KSP42GsJ9ZyBVaaN9REYRW76gUj9sxm8e3i");

// Init Parse objects
var User = Parse.User;
var Post = Parse.Object.extend("Post");
var Comment = Parse.Object.extend("Comment");
