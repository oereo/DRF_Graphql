import React from 'react';
import {useQuery} from 'react-apollo';
import {gql} from 'apollo-boost';

const QUERY_USERS = gql`
  query {
    actors {
      id
      name
      age
    }
}
`;

const data1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export function UserInfo() {
    // Polling: provides near-real-time synchronization with
    // your server by causing a query to execute periodically
    // at a specified interval
    const {data, loading} = useQuery(
        QUERY_USERS, {
            pollInterval: 500 // refetch the result every 0.5 second
        }
    );

    if (loading) return <p>Loading...</p>;
    // <QUERY_USERS query={GET_CONTINENTS}>
        return data.actors.map(({id, name}) => (
        <div key={id}>
            <p>
                User - {id}: {name}
            </p>
        </div>
        ));
    // </QUERY_USERS>
}
