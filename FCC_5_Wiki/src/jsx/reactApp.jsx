/*
   JS-CODE_LIKE representation of array of objects.
*/
class CodeArrayOfObjects extends React.Component {
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
      result.push(<CodeObject key={i} value={resultsArray[i]} brackets={brackets} />);
    }
    return <div>{result}</div>;
  }
}

/*
   JS-CODE_LIKE representation of object; opening bracket, key-value pairs and closing bracket.
*/
class CodeObject extends React.Component {
  render() {
    var objectToDisplay = this.props.value;
    var openingBracket = <FullRowCodeKeyword value = {this.props.brackets[0]} />;
    var closingBracket = <FullRowCodeKeyword value = {this.props.brackets[1]} />;

    var returningObj = [openingBracket];
    for (var key in objectToDisplay) {
       if (objectToDisplay.hasOwnProperty(key)) {
         returningObj.push(<div className="row" ><CodeObjectKey value = {key} /><CodeObjectValue value = {objectToDisplay[key]} /> </div>);
       }
    }
    returningObj.push(closingBracket);
    return (<div>{returningObj}</div>);
  }
}

class CodeObjectKey extends React.Component {
  render() {
    return (
      <span className="col col-lg-2 col-md-2 col-sm-3 col-xs-12 code-string code-object-key">
        "{this.props.value}":
      </span>
    );
  }
}

class CodeObjectValue extends React.Component {
  render() {
    var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

    var innerHtml = urlRegex.test(this.props.value) ?
      <a className  = "dont-break-out" href={this.props.value} target = "_blank">"{this.props.value}"</a> : '"' + this.props.value + '"';

    return (
      <span className="col col-lg-10 col-md-10 col-sm-9 col-xs-12 result-value">
        {innerHtml}
      </span>
    );

  }
}

class FullRowCodeKeyword extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col col-lg-12 code-keyword">{this.props.value}</div>
      </div>
    );
  }
}
