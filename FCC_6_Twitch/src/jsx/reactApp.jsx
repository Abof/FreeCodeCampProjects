/*
   EXAMPLE COMPONENT
*/
class TodoElement extends React.Component {
  render() {
    return (
      <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12 ">{this.props.value}</div>
    );
  }
}
