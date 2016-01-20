// add any scripting here

var posts = [];
var total, curr = 0;

var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

loadPosts();

function update(datapoint) {

  console.log(datapoint);

  // var nl = $(".container").append("<p>" + data.post.slug + "</p>");

  var text = svg.selectAll("text")
      .data(posts);

  var newww = text.enter().append("text")
      .text(function(d) {return d.post.slug;})
      .attr("x", function(d) {return 0;})
      .attr("y", function(d) {return d.post.hours;});

}

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

    d3.json("http://localhost/redesign/wordpress/api/get_post/?post_type=project&post_id=" + id, function(err, data) {
      posts.push(data);
      update(data);
    });

    // $.ajax({
		// 	url: "http://localhost/redesign/wordpress/api/get_post/?post_type=project&post_id=" + id,
    //   type: "GET"
    // }).success(function(data) {
    //   curr++;
    //   $("#curr").text(curr);
    //   update(data);
    // });
  }
}
