import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function createMarkup(text) {
    return {__html: text};
}

function CommentContent(props) {
    return (
        <div className="commentContent">
            <Typography>
                posted by: {props.author}
            </Typography>
            <div dangerouslySetInnerHTML={createMarkup(props.content)} />
        </div>
    )
}

class CommentCard extends Component {
    componentDidMount() {
        this.props.onFetchUsers();
    }

    onRemoveComment = id => {
        this.props.onRemoveComment(id);
    }

    render() {
        const { current_user_id, content, user_id, id } = this.props;
        let author;

        if (!this.props.users.loading && this.props.users && this.props.users[1] && this.props.users[1].users) {
            let username = this.props.users[1].users.find(user => {
                return user.id.toString() === user_id.toString()
            });

            author = username.username;
        }

        return (
            <Card>
                <CardContent>
                    <CommentContent 
                        author={author}
                        content={content}
                    />
                </CardContent>
                {this.props.current_user_id === user_id ? (
                    <CardActions>
                        <IconButton onClick={this.onRemoveComment.bind(this, id)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </CardActions>
                ) : (
                    null
                )}
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers()),
        onRemoveComment: id => dispatch(actions.deleteComment(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);
