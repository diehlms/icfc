import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import './Style.css'


function ArticleHeader(props) {
    return (
        <div className="articleHeader">
            <Typography variant="h6">
                <Link to={`articles/${props.article_id}`}>{props.title}</Link>
            </Typography>
            <div className="subheader">
                <span>
                    <Typography>
                        by: {props.author}
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
                author={props.author}
            />
            <ArticleContent
                content={props.content}
            />
            <IconButton onClick={props.removeArticle}>
                <HighlightOffIcon />
            </IconButton>
        </div>
    )
}
