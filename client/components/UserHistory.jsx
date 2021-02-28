import React from 'react'
import { connect } from 'react-redux'

function UserHistory (props) {
  const { history } = props.user
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(UserHistory)
