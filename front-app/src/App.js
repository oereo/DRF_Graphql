import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {UserInfo} from './User';
import {UserInfo_test} from './graph_test';
import {MultiAxisLine} from './graph';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql', // your GraphQL Server
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

            {/*<button onclick={UserInfo.bind(this)}>dfa</button>*/}
            <UserInfo/>
            <UserInfo_test/>
        </div>

    </ApolloProvider>
)
;

export default App;
