import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import CreateComment from '../comments/Create'
import Title from '../../shared/Title'
import SubTitle from '../../shared/SubTitle'
import HorizontalLine from '../../shared/HorizontalLine'
import CommentCard from '../comments/CommentCard'

function createMarkup(text) {
    return {__html: text};
}

const Image = (props) => {
    return (
        <div style={{
            margin: '0 auto',
            maxWidth: '80%',
            maxHeight: '40%'
        }}>
            <img
                src={props.url}
                alt="Blog post image"
            />
        </div>
    )
}

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
        let text = '';
        if (this.props.articles[1] && this.props.articles[1].articles) {
            const {title, content, image} = this.props.articles[1].articles.find(article => 
                article.id.toString() === this.props.match.params.id.toString()
            )
            
            function ArticleContent(props) {
                return (
                    <div className="articleContent">
                        <div dangerouslySetInnerHTML={createMarkup(props.content)} />
                    </div>
                )
            }
            
            text = (
                <div>
                    <Title text={title} />
                    <HorizontalLine />
                    {image.url ? 
                        <Image 
                            src={image.url}
                            alt={title}
                        /> : null
                    }
                    <ArticleContent 
                        content={content}
                    />
                </div>
            );
        }

        let comments = 'no comments added yet'
        let commentList = [];

        if (this.props.comments[1] && this.props.comments[1].comments) {
            this.props.comments[1].comments.map(indComment => {
                if (indComment.article_id.toString() === this.props.match.params.id.toString()) {
                    commentList.push({
                        id: indComment.id,
                        content: indComment.content,
                        user_id: indComment.user_id
                    })
                }
            })
        }

        if (commentList.length > 0) {
            comments = commentList.map(indComment => {
                return (
                    <CommentCard
                        current_user_id={this.props.user_id}
                        id={indComment.id}
                        key={indComment}
                        user_id={indComment.user_id}
                        content={indComment.content}
                    />
                )
            })
        }

        return (
            <div className="containerMain">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "46% 43%",
                    gridColumnGap: 50
                }}>
                    <div>
                        {text}
                    </div>
                    <div>
                        <CreateComment 
                            user_id={this.props.user_id}
                            article_id={this.props.match.params.id}
                        />
                        <SubTitle text="comments" />
                        <HorizontalLine />
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
