//when user clicks search
$('#search').on('click', function(){
	//get input from html 
	var searchTerm = $('#searchTerm').val().trim();
	var numResults = $('#numberOfRecords').val().trim(); 
	var startYear = $('#startYear').val().trim();
	var endYear= $('#endYear').val().trim();

	//capture url of API
	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	//serialize API url, API key and search parameters 
	queryURL += '?' + $.param({
	  	'api-key': "5f000ef9596a4705895bb8d499d2a531",
	  	'q': searchTerm,
	  	'begin_date': startYear + '0101',
	  	'end_date': endYear + '1231',
	});
	//ajax GET request to API
	$.ajax({
	  url: queryURL,
	  method: 'GET',
	//once the data comes back 
	}).done(function(results) {
		//console.log to test function 
		console.log(results); 
		//Capture results from the docs array in a variable 
		var docs = results.response.docs;
        // Loop through each of the ten articles and display only the requested number of results
        for (var i = 0; i < docs.length && i < numResults; i++) {
        	// create a p element for the headline of the article with the url link 
            var headline = $('<h3><a href=' + docs[i].web_url + '>' + docs[i].headline.main + '</a></h3>'); 
            // create a p element for the lead paragraph of the article 
            var leadParagraph = $('<p>' + docs[i].lead_paragraph + '</p>'); 
        	// Creating and storing a div tag for the article information
        	var articleDiv = $('<div class="articleDiv col-xs-12">');
        	// Appending the headline to the articleDiv
        	articleDiv.append(headline);
        	// Appending the leading paragraph to the articleDiv
        	articleDiv.append(leadParagraph);
	        //Append articles to the page
	        $('#articles').append(articleDiv); 	
        }
	//if API returns error 
	}).fail(function(err) {
		//log error
	  	console.error(err);
	});
	// This button clears the top articles section
	$('#clearResults').on("click", function() {
  	$('.articleDiv').empty();
  	});
});


