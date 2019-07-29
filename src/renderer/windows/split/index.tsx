import React, { Component } from 'react'
import { withRouter } from 'react-router'

class SplitBase extends Component {
  render() {
    return (
      <div>
        <h1>Split</h1>
      </div>
    )
  }
}
const Split = withRouter(SplitBase as any);
export default Split
