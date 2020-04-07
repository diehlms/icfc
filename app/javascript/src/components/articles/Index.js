import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import CreateArticle from './Create'
import ArticleCard from './ArticleCard';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Style.css'

function CircularDeterminate() {
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      function tick() {
        // reset when reaching 100%
        setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
      }
  
      const timer = setInterval(tick, 20);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
        <CircularProgress variant="determinate" value={progress} />
    );
  }

class Index extends React.Component {
    state = {
        createArticleModalOpen: false
    }

    componentDidMount() {
        this.props.onFetchArticles()
    }

    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.props.onFetchArticles(); 
        }
    }

    openModal = () => {
        this.setState({createArticleModalOpen: true});
    }
    
    closeModal = () => {
        this.setState({createArticleModalOpen: false});
    }
    
    removeArticle = id => {
        this.props.onRemoveArticle(id)
    }

    render() {
        let articles = <CircularDeterminate />;

        if (!this.props.articles.loading && this.props.articles && this.props.articles[1] && this.props.articles[1].articles) {
            articles = this.props.articles[1].articles.map((article, index) => {
                return (
                    <ArticleCard key={index}
                        article_id={article.id}
                        title={article.title}
                        content={article.content.substring(0, 250)}
                        user_id={article.user_id}
                        removeArticle={this.removeArticle.bind(this, article.id)}
                    />
                )
            })
        }

        return (
            <div className='containerMain'>
                <Typography 
                    align='center'
                    variant='h2'>
                    Articles
                </Typography>
                <Button onClick={this.openModal}>
                    Add Article
                </Button>
                { this.props.loading ? (
                    <div>
                        {articles}
                    </div>
                ) : (
                    <CircularDeterminate />
                )}
                <Modal
                    isOpen={this.state.createArticleModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <CreateArticle 
                        user_id={this.props.user_id}
                    />
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
        onRemoveArticle: (id) => dispatch(actions.deleteArticle(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);