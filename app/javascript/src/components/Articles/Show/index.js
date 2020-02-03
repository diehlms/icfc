import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

class index extends React.Component {
    componentDidMount() {
        this.props.onFetchArticles()
    }

    render() {
        let articleCard = 'not loaded yet'

        if (!this.props.articles.loading && this.props.articles[1] && this.props.articles[1].articles) {
            const {title, content} = this.props.articles[1].articles.find(article => 
                article.id.toString() === this.props.match.params.id.toString()
            )
            return articleCard = (
                <div>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
            )
        }

        return (
            <div>
                <p>{articleCard}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        loading: state.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
