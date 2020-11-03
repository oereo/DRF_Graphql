import React from 'react';
import {useQuery} from 'react-apollo';
import {gql} from 'apollo-boost';
import {Bar} from 'react-chartjs-2';

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

export function UserInfo() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 2000 // refetch the result every 0.5 second
        }
    );


    // should handle loading status
    if (loading) return <p>Loading...</p>;


    return data.gathering.map(({id, address, viewCount, reportCount, created}) => (
        <div key={id}>
            <p>
                Gathering - {id}: {viewCount}- {reportCount} - {address} - {created}
            </p>
            {/*<Bar data={g2c.data} />*/}
        </div>
    ));
}
