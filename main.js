// add any scripting here

var posts = [];
var total, curr = 0;

$(document).ready(function() {

  var gg = d3.select("main").selectAll("g")
      .data(posts);
  gg.enter().append("g")
    .attr("class", function(d) {return d.post.slug});

  loadPosts();
});


function loadPosts() {
  $.ajax({
			url: "http://localhost/redesign/wordpress/api/poops/count_posts",
			type: "GET"
	}).done(function (data) {
    total = data.ids.length;
    $("#tot").text(total);
			console.log("XXXXXXXXXXX POST COUNT XXXXXXXXXXX");
			console.log(data);
      console.log("------");
      console.log("number: " + data.ids.length);
      console.log("------");

      _.times(data.ids.length, function(i) {
        getone(data.ids[i]);
      });

      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
		})
		;

  function getone(id) {

      $.ajax({
			  url: "http://localhost/redesign/wordpress/api/get_post/?post_type=project&post_id=" + id,
        type: "GET"
      }).success(function(data) {
        curr++;
        $("#curr").text(curr);
        console.log(data);
      });
    }
}
