'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
   JS-CODE_LIKE representation of array of objects.
*/
var CodeArrayOfObjects = function (_React$Component) {
  _inherits(CodeArrayOfObjects, _React$Component);

  function CodeArrayOfObjects() {
    _classCallCheck(this, CodeArrayOfObjects);

    return _possibleConstructorReturn(this, (CodeArrayOfObjects.__proto__ || Object.getPrototypeOf(CodeArrayOfObjects)).apply(this, arguments));
  }

  _createClass(CodeArrayOfObjects, [{
    key: 'determineBrackets',
    value: function determineBrackets(resultIndex, resultsLength) {
      var openingBrackets = resultIndex == 0 ? '[{' : '{';
      var closingBrackets = resultIndex == resultsLength - 1 ? '}]' : '},';
      return [openingBrackets, closingBrackets];
    }
  }, {
    key: 'render',
    value: function render() {
      var resultsArray = this.props.value;

      var result = [];
      for (var i = 0; i < resultsArray.length; i++) {
        var brackets = this.determineBrackets(i, resultsArray.length);
        result.push(React.createElement(CodeObject, { key: i, value: resultsArray[i], brackets: brackets }));
      }
      return React.createElement(
        'div',
        null,
        result
      );
    }
  }]);

  return CodeArrayOfObjects;
}(React.Component);

/*
   JS-CODE_LIKE representation of object; opening bracket, key-value pairs and closing bracket.
*/


var CodeObject = function (_React$Component2) {
  _inherits(CodeObject, _React$Component2);

  function CodeObject() {
    _classCallCheck(this, CodeObject);

    return _possibleConstructorReturn(this, (CodeObject.__proto__ || Object.getPrototypeOf(CodeObject)).apply(this, arguments));
  }

  _createClass(CodeObject, [{
    key: 'render',
    value: function render() {
      var objectToDisplay = this.props.value;
      var openingBracket = React.createElement(FullRowCodeKeyword, { value: this.props.brackets[0] });
      var closingBracket = React.createElement(FullRowCodeKeyword, { value: this.props.brackets[1] });

      var returningObj = [openingBracket];
      for (var key in objectToDisplay) {
        if (objectToDisplay.hasOwnProperty(key)) {
          returningObj.push(React.createElement(
            'div',
            { className: 'row' },
            React.createElement(CodeObjectKey, { value: key }),
            React.createElement(CodeObjectValue, { value: objectToDisplay[key] }),
            ' '
          ));
        }
      }
      returningObj.push(closingBracket);
      return React.createElement(
        'div',
        null,
        returningObj
      );
    }
  }]);

  return CodeObject;
}(React.Component);

var CodeObjectKey = function (_React$Component3) {
  _inherits(CodeObjectKey, _React$Component3);

  function CodeObjectKey() {
    _classCallCheck(this, CodeObjectKey);

    return _possibleConstructorReturn(this, (CodeObjectKey.__proto__ || Object.getPrototypeOf(CodeObjectKey)).apply(this, arguments));
  }

  _createClass(CodeObjectKey, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        { className: 'col col-lg-2 col-md-2 col-sm-3 col-xs-12 code-string code-object-key' },
        '"',
        this.props.value,
        '":'
      );
    }
  }]);

  return CodeObjectKey;
}(React.Component);

var CodeObjectValue = function (_React$Component4) {
  _inherits(CodeObjectValue, _React$Component4);

  function CodeObjectValue() {
    _classCallCheck(this, CodeObjectValue);

    return _possibleConstructorReturn(this, (CodeObjectValue.__proto__ || Object.getPrototypeOf(CodeObjectValue)).apply(this, arguments));
  }

  _createClass(CodeObjectValue, [{
    key: 'render',
    value: function render() {
      var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

      var innerHtml = urlRegex.test(this.props.value) ? React.createElement(
        'a',
        { className: 'dont-break-out', href: this.props.value },
        '"',
        this.props.value,
        '"'
      ) : this.props.value;

      return React.createElement(
        'span',
        { className: 'col col-lg-10 col-md-10 col-sm-9 col-xs-12 result-value' },
        innerHtml
      );
    }
  }]);

  return CodeObjectValue;
}(React.Component);

var FullRowCodeKeyword = function (_React$Component5) {
  _inherits(FullRowCodeKeyword, _React$Component5);

  function FullRowCodeKeyword() {
    _classCallCheck(this, FullRowCodeKeyword);

    return _possibleConstructorReturn(this, (FullRowCodeKeyword.__proto__ || Object.getPrototypeOf(FullRowCodeKeyword)).apply(this, arguments));
  }

  _createClass(FullRowCodeKeyword, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col col-lg-12 code-keyword' },
          this.props.value
        )
      );
    }
  }]);

  return FullRowCodeKeyword;
}(React.Component);