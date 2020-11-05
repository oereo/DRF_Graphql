import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
// import {UserInfo} from './User';
// import {UserInfo_test} from './graph_test';
import {MultiAxisLine} from './graph';
import {Line} from "react-chartjs-2";
import {useQuery} from "react-apollo";


const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql', // your GraphQL Server
});

var num = [];

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
    posta{
        id
        created
        showBlock
        topic
    }
    
}
`;

function GatheringInfo() {
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

    // function filtering() {
    //     for (let i = 0; i < data.gathering.length; i++) {
    //         if (data.gathering.purpose === 'ONLINE') len_online++;
    //
    //         if (data.gathering.purpose === 'OFFLINE') len_offline++;
    //     }
    // }

    // filtering();

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
    const rebels = data.posta.filter(data => data.topic === "gath");

    return data.posta.map(({id, created, topic, showBlock}) => (
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

    // function filtering() {
    //     for (let i = 0; i < data.gathering.length; i++) {
    //         if (data.gathering.purpose === 'ONLINE') len_online++;
    //         if (data.gathering.purpose === 'OFFLINE') len_offline++;
    //     }
    // }
    // filtering()

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
    const post_len = data.post.length
    const post_month_len = data.posta.length

    const len = ['gathering 수 : ', gathering_len, ' / 오늘의 post 수 : ',post_len, ' / 한달전 post 수 : ',post_month_len]
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

const options = {
    scales: {
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
            },
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    drawOnArea: false,
                },
            },
        ],
    },
};


const App = () => (
        <ApolloProvider client={client}>

            <h2>My first Apollo app 🚀</h2>
            <h3>Graphql</h3>

            {/*<button onclick={UserInfo.bind(this)}>dfa</button>*/}
            온라인 게더링 수 :
            <GatheringInfo/>
            {/*<TodayPostInfo/>*/}

            {/*<AmonthAllPost/>*/}
            <AllCount/>
            {/*<Line data={data} options={options}/>*/}
            {/*<UserInfo_test/>*/}

        </ApolloProvider>
    )
;

export default App;
