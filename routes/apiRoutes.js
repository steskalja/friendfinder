

var friendData = require("../data/friendData");


// ===============================================================================
// ROUTING
// ===============================================================================


function cScore(data)
{
	return new Promise((resolve,reject) => {
	var score = 0;
	for(var i = 0; i< data.length; i++)
	{
		console.log(data[i]);
		score = parseInt(data[i]) + parseInt(score);
	}
	console.log(score);
	resolve(score);
})
}

async function gScore(score)
{
	const rslt =  await cScore(score);
	return rslt;
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
		var cData = req.body;
		
		console.log("Input Scores");
		console.log(req.body.scores);
		var rslt = false
		friendData.forEach((itm) => {
			const testItem = async item => {
				var yScore = await gScore(cData.scores);
				var fScore = await gScore(itm.scores);
				var compare = Math.abs(yScore - fScore);
				if(compare <= 5)
				{
					console.log(itm);
					if(rslt === false)
					{
						res.json(itm);
						rslt = true;
					}
				}
			};
			testItem(itm);
			
		});
		friendData.push(cData);
		
	}
	else
	{
		friendData.push(req.body);
		res.json(friendData[0]);
	}
	
  });
};
