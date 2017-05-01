// MAIN APAP FLOW
$(document).ready(function() {

  showHelpText();

  $("#queryInput").keypress(function(event) {
    var queryInputValue = $("#queryInput").text();

    if(queryInputValue.length > 20){
      event.preventDefault();
    }

    if(event.which == 13){
        event.preventDefault();
      getRawWikiApiSearchResponse(queryInputValue).then(propagateSearchresponse).catch(log);
    }
  });
});

//HELPERS
$.ajaxSetup({
  cache: false
});

var pageUrl = 'https://en.wikipedia.org/?curid=';
var apiSearchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&titles=&srprop=snippet&srsearch=';
var jsonpCallback = '&callback=JSON_CALLBACK';

function getRawWikiApiSearchResponse(searchPhrase) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: apiSearchUrl + searchPhrase,
      dataType: "jsonp",
      success: resolve,
      error: reject
    });
  });
};

function propagateSearchresponse(rawJson) {
  var resultsArray = [];

  rawJson.query.search.map(function(singleResult) {
    log(singleResult);

    var clearedSnipped = singleResult.snippet.replace(new RegExp("<span class=\"searchmatch\">", 'g'), "");
    clearedSnipped = clearedSnipped.replace(new RegExp("</span>", 'g'), "");
    clearedSnipped = clearedSnipped.replace(new RegExp("&[a-zA-Z0-9]*;", 'g'), "");
    log(clearedSnipped);
    var snippet = clearedSnipped.indexOf('.') > 10? clearedSnipped.substring(0, clearedSnipped.indexOf('.') + 1)+ " (...)" : clearedSnipped+" (...)";
    var result = {
      "title" : singleResult.title,
      "snippet" : snippet,
      "url" : "https://costam"
    };
    log(result);
    resultsArray.push(result);
  });

  if(resultsArray.length > 0){
    ReactDOM.render(
      <div>
          <ResultsArray value = {resultsArray} />
      </div>,
      document.getElementById('results')
    );
  }else {
      showHelpText()
  }
}

var helpText = "Enter what you are searching for as an argument in 'search_wiki' function (above; orange); hit 'return'. PS: If you see this message your query might return no results :(";
function showHelpText() {
  ReactDOM.render(
    <div>
        <HelpText value = {helpText} />
    </div>,
    document.getElementById('results')
  );
}


function log(msg) {
  console.log(msg);
}
