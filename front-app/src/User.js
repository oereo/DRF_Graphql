import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_USERS = gql`
  query {
    actors {
      id
      name
    }
}
`;
export function UserInfo() {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { data, loading } = useQuery(
    QUERY_USERS, {
      pollInterval: 500 // refetch the result every 0.5 second
    }
  );
  
  // should handle loading status
  if (loading) return <p>Loading...</p>;
   
  return data.actors.map(({ id, name }) => (
    <div key={id}>
      <p>
        User - {id}: {name}
      </p>
    </div>
  ));
}
