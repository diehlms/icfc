import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index'
import CreateComment from '../comments/Create'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

class Show extends React.Component {

    componentDidMount = () => {
        this.props.onFetchArticles()
        this.props.onFetchComments()
    }

    render() {
        let text = 'hello'

        if (!this.props.loading && this.props.articles[1] && this.props.articles[1].articles) {
            const {id, title, content, user_id, image} = this.props.articles[1].articles.find(article => 
                article.id.toString() === this.props.match.params.id.toString()
            )
            let imageTag = ''

            if ({image}) {
                imageTag = (
                    <img src={image.url} width='100'/>
                )
            }

            text = (
                <div>
                    <h1>{title}</h1>
                    <p>{content}</p>
                    <p>{user_id}</p>
                    <div>
                        {imageTag}
                    </div>
                    <CreateComment 
                        user_id={this.props.user_id}
                        article_id={id}
                    />
                </div>
            )
        }

        let comments = 'no comments added yet'
        let commentList = []

        if (!this.props.loading && this.props.comments[1] && this.props.comments[1].comments) {
            this.props.comments[1].comments.map(indComment => {
                if (indComment.recipeId === this.props.recipeId) {
                    commentList.push({
                        content: indComment.content,
                        user_id: indComment.user_id
                    })
                }
            })
        }

        if (commentList.length > 0) {
            comments = commentList.map(indComment => {
                return (
                    <li key={indComment}>{indComment.content}, posted by {indComment.user_id}</li>
                )
            })
        }

        return (
            <div>
                {text}
                <div>
                    <h4>Comments:</h4>
                    {comments}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        loading: state.loading,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles()),
        onFetchComments: () => dispatch(actions.fetchComments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
