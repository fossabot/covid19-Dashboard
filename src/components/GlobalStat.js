import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge'

function GlobalStat(props) {
    return (
        <Alert variant={props.variant} className='h-cover'>
            <h6><Badge variant="secondary">Global</Badge></h6>
            <Alert.Heading>{props.heading}:</Alert.Heading>
            <hr />
            <p className="mb-0">
                {props.stat}
            </p>
        </Alert>
    );
}

export default GlobalStat;