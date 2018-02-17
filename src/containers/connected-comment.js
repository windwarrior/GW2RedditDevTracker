import { connect } from 'react-redux'
import Comment from '../components/comments/comment'

import {loadParentContent, toggleFilterForDev} from '../actions/actions'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onParentOpen: (comment_id, parent_id) => {
      dispatch(loadParentContent(comment_id, parent_id))
    },
    onAuthorFilter: (authorname) => {
      dispatch(toggleFilterForDev(authorname))
    }
  }
}

const ConnectedComment = connect(
  (state, ownProps) => ownProps,
  mapDispatchToProps
)(Comment)

export default ConnectedComment