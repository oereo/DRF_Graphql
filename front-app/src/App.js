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
    }
}
`;

function UserInfo() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 2000 // refetch the result every 0.5 second
        }
    );

    // for (let i = 0; i < data.length; i++) {
    // console.log(data);
    // num = data[3];
    // }

    // should handle loading status
    if (loading) return <p>Loading...</p>;
    return data.gathering.map(({id, address, viewCount, reportCount, created}) => (
        num.concat(viewCount),
        <li key={id}>
            {/*<li>*/}
                Gathering - {id}: {viewCount}- {reportCount} - {address} - {created}
            {/*    {viewCount}*/}
            {/*</li>*/}
            {/*<Bar data={g2c.data} />*/}
        </li>
    ));
}


const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
        {
            label: '# of Votes',
            data: num,
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
            <div style={{
                backgroundColor: '#00000008',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <h2>My first Apollo app 🚀</h2>
                <h3>Graphql</h3>

                {/*<button onclick={UserInfo.bind(this)}>dfa</button>*/}
                <UserInfo/>
                <Line data={data} options={options}/>
                {/*<UserInfo_test/>*/}
            </div>

        </ApolloProvider>
    )
;

export default App;
