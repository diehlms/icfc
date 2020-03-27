import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import CreateArticle from './Create'
import ArticleCard from './ArticleCard';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import './Style.css'

function TabPanel(props) {
    const { children, value, index } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && children}
      </Typography>
    );
}

class Index extends React.Component {
    state = {
        createArticleModalOpen: false,
        value: 0
    }

    componentDidMount() {
        this.props.onFetchArticles()
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
        let articles = 'articles not loaded yet';
        if (!this.props.loading && this.props.articles && this.props.articles[1] && this.props.articles[1].articles) {
            this.state.value === 0 ? 
                articles = this.props.articles[1].articles.map((article, index) => {
                    return (
                        <ArticleCard key={index}
                            article_id={article.id}
                            title={article.title}
                            content={article.content}
                            user_id={article.user_id}
                            removeArticle={this.removeArticle.bind(this, article.id)}
                        />
                    )
                }) : 
                articles = this.props.articles[1].articles.map((article, index) => {
                    if (this.props.user_id === article.user_id) {
                        return (
                            <ArticleCard key={index}
                                article_id={article.id}
                                title={article.title}
                                content={article.content}
                                user_id={article.user_id}
                                removeArticle={this.removeArticle.bind(this, article.id)}
                            />
                        )
                    }
                })
        }

        const handleTabChange = (event, newValue) => {
            this.setState({ value: newValue })
        };

        return (
            <div className='articleList'>
                <Typography 
                    align='center'
                    variant='h2'>
                    Articles
                </Typography>
                <Button onClick={this.openModal}>
                    Add Article
                </Button>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={handleTabChange} aria-label="simple tabs example">
                        <Tab 
                            label="All Articles"
                            id="allArticles"
                            aria-controls="allArticlesTabControl" 
                        />
                        <Tab 
                            label="My Articles" 
                            id="myArticles"
                            aria-controls="myArticlesTabControl"
                        />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    {articles}
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    {articles}
                </TabPanel>
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
        articles: state.articles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles()),
        onRemoveArticle: (id) => dispatch(actions.deleteArticle(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);