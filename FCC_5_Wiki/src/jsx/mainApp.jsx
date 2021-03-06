/* CODEPEN SETUP */
$.ajaxSetup({
  cache: false
});

/* MAIN APP FLOW / CONTROL*/
$(document).ready(function() {
  showHelpText(); // show help at start

  $("#queryInput").keypress(function(event) {
    var queryInputValue = $("#queryInput").text();
    console.log(event.which);
    if(queryInputValue.length > 20){
      event.preventDefault();
    }

    if(event.which == 13){ // for 'return' key -> search wiki and propagate data
      event.preventDefault();
      $("#queryInput").blur();

      if(queryInputValue.length > 0){
        getRawWikiApiSearchResponse(queryInputValue).then(propagateSearchresponse).catch(console.log);
      }else{
        openRandomWikiPage();
      }
    }
  });
});

function openRandomWikiPage(){
  var win = window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  if (win) {
      win.focus();
  } else {
      alert('Please allow popups for this website!');
  }
}

var pageUrl = 'https://en.wikipedia.org/?curid=';
var apiSearchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&titles=&srprop=snippet&srsearch=';
var jsonpCallback = '&callback=JSON_CALLBACK';

// Getting raw JSON reponse from Wikipedia
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

/*
  Transforming raw JSON result from Wikipedia to acceptable by react component array of data objects.
  Render react components.
*/
function propagateSearchresponse(rawJson) {
  var resultsArray = [];

  rawJson.query.search.map(function(singleResult) {
    var result = {
      "title" : singleResult.title,
      "snippet" : prepareSnippet(singleResult.snippet),
      "url" : prepareWikiUrl(singleResult.title)
    };
    resultsArray.push(result);
  });

  if(resultsArray.length > 0){
    ReactDOM.render(
      <div>
          <CodeArrayOfObjects value = {resultsArray} />
      </div>,
      document.getElementById('results')
    );
  }else {
      showHelpText()
  }
}

// Preparing snippet for display
function prepareSnippet(rawSnippet){
  var clearedSnippet = rawSnippet
    .replace(new RegExp("<span class=\"searchmatch\">", 'g'), "")
    .replace(new RegExp("</span>", 'g'), "")
    .replace(new RegExp("&[a-zA-Z0-9]*;", 'g'), "");
  return clearedSnippet.indexOf('.') > 10? clearedSnippet.substring(0, clearedSnippet.indexOf('.') + 1)+ " (...)" : clearedSnippet +" (...)";
}

// Preparing wiki URL
function prepareWikiUrl(title){
  return "https://en.wikipedia.org/wiki/" + title.trim().replace(new RegExp(" ", "g"), "%20")
}

// Displaying help
function showHelpText() {
  ReactDOM.render(
    <div>
      <FullRowCodeKeyword value = "/*" />
        <span className="row code-comment">
          <span className="code-string strong">+</span>  Enter what you are searching for as an <span className="strong">argument in 'search_wiki' function</span> (above; orange); <span className="strong">Press 'return'.</span>
        </span>
        <span className="row code-comment">
          <span className="code-string strong">+</span> For <span className="strong">random</span> article from Wikipedia provide <span className="strong">empty string as an argument</span>.
        </span>
        <span className="row code-comment">
          <span className="code-string strong">+</span>  PS: If you see this message your query could return no results :(
        </span>
      <FullRowCodeKeyword value = "*/" />
    </div>,
    document.getElementById('results')
  );
}
