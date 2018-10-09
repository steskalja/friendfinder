

var friendData = require("../data/friendData");


// ===============================================================================
// ROUTING
// ===============================================================================


function cScore(data)
{
	return new Promise((resolve,reject) => {
	var score = 0;
	for(var i = 0; i< data.lenght; i++)
	{
		score = parseInt(data[i]) + parseInt(score);
	}
	resolve(score);
})
}

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
		
		
	console.log(req.body);
	if(friendData.length === 1)
	{
		friendData.push(req.body);
		res.json(friendData[0]);
		
	}
	else if(friendData.length >1)
	{
		friendData.push(req.body);
		cScore(req.body.scores).then((result) => {
			yScore = result;
		});
		console.log(yScore);
		for(var i = 0; i < friendData.length; i++)
		{
			var fScore;
			cScore(friendData[i].scores).then((result) => {
				fScore = result;
			});
			console.log(fScore);
			var compare = parseInt(yScore) - parseInt(fScore);
			console.log(compare);
			if(compare <= 5){
				res.json(friendData[i]);
			}
		}
	}
	else
	{
		friendDat.push(req.body);
		res.json(friendData[0]);
	}
	
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];

    console.log(friendData);
  });
};
