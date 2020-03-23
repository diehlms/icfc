import React from "react"
import PropTypes from "prop-types"

class App extends React.Component {
  render () {
    return (
      <h1>hello</h1>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

export default App
