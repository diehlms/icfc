import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Style.css'

export default function ArticleCard(props) {
    return (
        <div className='articleCard'>
            <Link to={`articles/${props.article_id}`}>{props.title}</Link>
            <p>{props.content}</p>
            <Button onClick={props.removeArticle}>X</Button>
        </div>
    )
}
