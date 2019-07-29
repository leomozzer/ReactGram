import { makeStyles } from '@material-ui/core/styles';
export const FeedStyles = makeStyles(theme => ({
    card: {
      maxWidth: 500,
      maxHeight: 'auto',
      margin: '0 auto',
      marginTop: 10,
    },
    media: {
      height: 0,
      paddingTop: '100%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    send:{
        transform: 'rotate(-45deg)'
    },
    hashtags:{
        color: '#7159c1',
        display: 'block',
    },
    comment: {
      width : 380
    },
    btnComment:{
      top : 15,
    }
  }));