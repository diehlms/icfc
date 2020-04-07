import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import CreateComment from '../comments/Create'

class Show extends React.Component {
    componentDidMount = () => {
        this.props.onFetchArticles()
        this.props.onFetchComments()
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchArticles();
            this.props.onFetchComments();
        }
    }

    render() {
        let text = 'hello'

        if (this.props.articles[1] && this.props.articles[1].articles) {
            const {id, title, content, image} = this.props.articles[1].articles.find(article => 
                article.id.toString() === this.props.match.params.id.toString()
            )

            let imageTag = '';

            if ({image}) {
                imageTag = (
                    <img src={image.url} width='100'/>
                )
            }

            function createMarkup(text) {
                return {__html: text};
            }
            
            function ArticleContent(props) {
                return (
                    <div className="articleContent">
                        <div dangerouslySetInnerHTML={createMarkup(props.content)} />
                    </div>
                )
            }


            text = (
                <div>
                    <h1>{title}</h1>
                    <ArticleContent 
                        content={content}
                    />
                    {imageTag}
                    <CreateComment 
                        user_id={this.props.user_id}
                        article_id={id}
                    />
                </div>
            )
        }

        let comments = 'no comments added yet'
        let commentList = [];

        if (this.props.comments[1] && this.props.comments[1].comments) {
            this.props.comments[1].comments.map(indComment => {
                if (indComment.article_id.toString() === this.props.match.params.id.toString()) {
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
                    <li key={indComment}>{indComment.content}</li>
                )
            })
        }

        return (
            <div className="containerMain">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "66% 33%"
                }}>
                    {text}
                    <div>
                        <h4>Comments:</h4>
                        {comments}
                    </div>
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
