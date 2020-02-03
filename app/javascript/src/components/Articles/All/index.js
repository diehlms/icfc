import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Button from 'react-bootstrap/Button'
import CreateArticleModal from '../Create/index';

export class Index extends Component {
    state = {
        CreateArticleModalOpen: false,
        DeleteArticleModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchArticles()
    }

    toggleCreateArticleModal = () => {
        if (this.state.CreateArticleModalOpen === false) {
            this.setState({CreateArticleModalOpen: true})
        } else {
            this.setState({CreateArticleModalOpen: false})
        }
    }

    render() {
        let articles = 'not loaded yet, ya binch'

        if (!this.props.loading && this.props.articles[1] && this.props.articles[1].articles) {
            articles = this.props.articles[1].articles.map(article => {
                return (
                    <div>
                        <Link 
                            to={`/articles/${article.id}`} 
                        >
                                {article.title}
                        </Link>
                    </div>
                )
            })
        }
        
        return (
            <div>
                <h1>Posts</h1>
                <Button 
                    onClick={() => this.toggleCreateArticleModal()}>
                    Add an Article
                </Button>
                <div>{articles}</div>
                <Modal 
                    isOpen={this.state.CreateArticleModalOpen}
                    onRequestClose={() => this.toggleCreateArticleModal()}
                >
                    <CreateArticleModal />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
