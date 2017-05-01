class ObjKey extends React.Component {
  render() {
    return (
      <span className="col col-lg-2 col-md-2 col-sm-3 code-str result-key">
        "{this.props.value}":
      </span>
    );
  }
}

class ObjValue extends React.Component {
  render() {
    return (
      <span className="col col-lg-10 col-md-10 col-sm-9 result-value">
        "{this.props.value}"
      </span>
    );
  }
}

class ObjFullRowSyntaxMisc extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col col-lg-12 code-kw">{this.props.value}</div>
      </div>
    );
  }
}

class SingleResultObj extends React.Component {
  render() {
    var resultEntries = this.props.value;
    var openingBracket = <ObjFullRowSyntaxMisc value = {this.props.brackets[0]} />;
    var closingBracket = <ObjFullRowSyntaxMisc value = {this.props.brackets[1]} />;

    var returningObj = [openingBracket];
    var i = 0;
    for (var key in resultEntries) {
       if (resultEntries.hasOwnProperty(key)) {
         returningObj.push(<div className="row" ><ObjKey value = {key} /><ObjValue value = {resultEntries[key]} /> </div>);
       }
    }
    returningObj.push(closingBracket);
    return (<div>{returningObj}</div>);
  }
}

class ResultsArray extends React.Component {
  determineBrackets(resultIndex, resultsLength) {
    var openingBrackets = (resultIndex == 0) ? '[{' : '{';
    var closingBrackets = (resultIndex == resultsLength - 1) ? '}]' : '},';
    return [openingBrackets, closingBrackets];
  }

  render() {
    var resultsArray = this.props.value;

    var result = [];
    for (var i = 0; i < resultsArray.length; i++) {
      var brackets = this.determineBrackets(i, resultsArray.length);
      result.push(<SingleResultObj key={i} value={resultsArray[i]} brackets={brackets} />);
    }
    return <div>{result}</div>;
  }
}

class HelpText extends React.Component {
  render() {
    return (
      <div>
      <ObjFullRowSyntaxMisc value = "/*" />
      <span className="row code-comment">{this.props.value}</span>
      <ObjFullRowSyntaxMisc value = "*/" />
      </div>
    );
  }
}
//=====================
//
// ReactDOM.render(
//   <div>
//       <ResultsArray value = {results} />
//   </div>,
//   document.getElementById('results')
// );
