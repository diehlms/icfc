import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import './Style.css'

function ArticleHeader(props) {
    return (
        <div className="articleHeader">
            <Typography variant="h6">
                <Link to={`articles/${props.article_id}`}>{props.title}</Link>
            </Typography>
            <div className="subheader">
                <span>
                    <Typography variant="small">
                        by: {props.user_id}, written 3 days ago
                    </Typography>
                </span>
            </div>
        </div>
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

export default function ArticleCard(props) {
    return (
        <div className='articleCard'>
            <ArticleHeader 
                title={props.title}
                article_id={props.article_id}
                user_id={props.user_id}
            />
            <ArticleContent
                content={props.content}
            />
            <Button 
                onClick={props.removeArticle}
            >
                X
            </Button>
        </div>
    )
}
