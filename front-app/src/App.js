import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {UserInfo} from './User'
import {graphql} from './graph'


const client = new ApolloClient({
    uri: 'http://0.0.0.0:8100/graphql_1/', // your GraphQL Server
});

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

            <UserInfo/>

        </div>

    </ApolloProvider>
)
;

export default App;
