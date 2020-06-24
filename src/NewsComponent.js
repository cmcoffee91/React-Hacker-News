import React from "react";
import './NewsComponent.css';
import {duration, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const NewsComponent = (props) => {

    const classes = useStyles();

    const Title = (news) => {
        let title = news.news.title;
        if(!title){
            title = "No title";
        }
        return <div>{title}</div>
    }


    const Author = (news) => {
        let author = news.news.author;
        if(!author){
            author = "No author";
        }
        return <div>Author: {author}</div>
    }


    const StoryText = (news) => {
        let text = news.news.story_text;
        if(!text){
            text = "No story text";
        }
        return <div>Story Text: {text}</div>
    }


    const StoryDate = (news) => {
        let date = news.news.created_at;
        if(!date){
            date = "No story date";
        }
        return <div>Story Date: {Moment(date).format('MMM Do YYYY')} </div>
    }

    const StoryLink = (news) => {
        let url = news.news.url;
        let hasUrl = true;
        if(!url){
            url = "No link";
            hasUrl = false;
        }
        if(hasUrl){
            return <a href={url}>Read More</a>
        }
        else{
            return <div>No Link</div>
        }
    }


        return (


        <div id="container">
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <Title news={props.post}></Title>
                            <Author news={props.post}></Author>
                            <StoryText news={props.post}></StoryText>
                            <StoryDate news={props.post}></StoryDate>
                            <StoryLink news={props.post}></StoryLink>
                    </Typography>
                    <Typography variant="h5" component="h2">
                    </Typography>

                </CardContent>
            </Card>
        </div>
    );
};

export default NewsComponent;