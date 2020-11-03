import React from 'react';
import {Line} from 'react-chartjs-2';
import {gql} from "apollo-boost";
import {Query, useQuery} from 'react-apollo';


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


export function UserInfo_test() {
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
    data.gathering.map(({id, address, viewCount, reportCount, created}) => {
        const data_a = {
            labels: [],
            datasets: [
                {
                    label: '# of Votes',
                    data: {viewCount},
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y-axis-1',
                },
                {
                    label: '# of No Votes',
                    data: [1, 2, 1, 1, 2, 2],
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
        return (
            <Line data={data_a} options={options}/>
        )
    });
}


// const MultiAxisLine_test = () => (
//         <>
//             <div className='header'>
//                 <h1 className='title'>Multi Axis Line Chart</h1>
//                 <div className='links'>
//                     <a
//                         className='btn btn-gh'
//                         href='https://github.com/jerairrest/react-chartjs-2/blob/react16/example/src/charts/MultiAxisLine.js'
//                     >
//                         Github Source
//                     </a>
//                 </div>
//             </div>
//             <Line data={data} options={options}/>
//         </>
//
// );
//
// export default MultiAxisLine_test
