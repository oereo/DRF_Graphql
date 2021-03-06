import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
// import {UserInfo} from './User';
// import {UserInfo_test} from './graph_test';
import {MultiAxisLine} from './graph';
import {Line} from "react-chartjs-2";
import {useQuery} from "react-apollo";
import BasicTable from './table';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';


const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql', // your GraphQL Server
});

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.background,
        border: 0,
        fontSize: 16,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
}));

const useStyles_paper = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));


function DeepChild() {
    const classes = useStyles();

    return (
        <button type="button" className={classes.root}>

        </button>
    );
}

const themeInstance = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

const QUERY_USERS = gql`
  query {
    gathering {
        id
        address
        viewCount
        reportCount
        created
        purpose
        showBlock
    },
    post{
        id
        created
        showBlock
        topic
    },
    PostRelative{
        id
        created
        showBlock
        topic
    },
    gatheringRelative{
        id
        address
        viewCount
        reportCount
        created
        purpose
        showBlock
    },
    gatheringWeek{
        id
        address
        viewCount
        reportCount
        created
        purpose
        showBlock
    },
    postWeek{
        id
        created
        showBlock
        topic
    },
    
}
`;

function GatheringInfo() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 10000 // refetch the result every 0.5 second
        }
    );

    var len_online = 0;
    var len_offline = 0;

    // should handle loading status
    if (loading) return <p>Loading...</p>;

    return data.gathering.map(({id, address, viewCount, reportCount, created, purpose, showBlock}) => (

        <li key={id}>
            Gathering - {id}: {viewCount}- {reportCount} - {address} - {created} - {purpose}- {showBlock}
        </li>
    ));
}

function TodayPostInfo() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 2000 // refetch the result every 0.5 second
        }
    );

    // const movies = data.posta.filter(item => item.topic === 'gath')
    // const moviesCount = movies.length;

    // should handle loading status
    if (loading) return <p>Loading...</p>;
    const rebels = data.PostRelative.filter(data => data.topic === "gath");

    return data.PostRelative.map(({id, created, topic, showBlock}) => (
        {rebels},
            <li key={id}>
                post - {id}: {created} - {topic} - {showBlock}
            </li>

    ));
}

function AmonthAllPost() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 2000 // refetch the result every 0.5 second
        }
    );

    var len_online = 0;
    var len_offline = 0;

    // should handle loading status
    if (loading) return <p>Loading...</p>;

    return data.post.map(({id, created, topic, showBlock}) => (

        <li key={id}>

            post - {id}: {created} - {topic} - {showBlock}

        </li>

    ));
}

function AllCount() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 2000 // refetch the result every 0.5 second
        }
    );
    if (loading) return <p>Loading...</p>;
    const gathering_len = data.gathering.length
    const gathering_month_len = data.gatheringRelative.length
    const post_len = data.post.length
    const post_month_len = data.PostRelative.length
    const gathering_week_len = data.gatheringWeek.length
    const post_week_len = data.postWeek.length

    const len = ['4주전 gathering 수 : ', gathering_len,
        ' / 4주전 post 수 : ', post_len,
        ' / 한달전(보정) post 수 : ', post_month_len,
        ' / 한달전(보정) gathering 수 : ', gathering_month_len,
        ' / 1주일 전 post 수 : ', post_week_len,
        ' / 1주일 전 gathering 수 : ', gathering_week_len
    ]

    return len

}

const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
        {
            label: '# of Votes',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y-axis-2',
        },
        {
            label: '# of No Votes',
            data: [1, 2, 1, 1, 2, 2, 7],
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y-axis-2',
        },
    ],
};


const App = () => (
        <ApolloProvider client={client}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <BasicTable/>

            <ThemeProvider theme={themeInstance}>
                <DeepChild>
                </DeepChild>
            </ThemeProvider>

            <div className={useStyles_paper.root}>
                <Paper variant="outlined"/>
                asdfdsf<br/>
                asdfdf
                <Paper variant="outlined" square/>
            </div>

            <h2>My first Apollo app 🚀</h2>
            <h3>Graphql</h3>


            {/*모든 query 출력*/}
            {/*온라인 게더링 수 :*/}
            {/*<GatheringInfo/>*/}
            {/*필터링 된 post*/}
            {/*<TodayPostInfo/>*/}

            <AllCount/>
            {/*<Line data={data} options={options}/>*/}
            {/*<UserInfo_test/>*/}

        </ApolloProvider>
    )
;

export default App;
