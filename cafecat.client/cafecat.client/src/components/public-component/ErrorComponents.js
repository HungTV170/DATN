import React from 'react';
import Error500 from './Error500';
import Error403 from './LockMessage';
import Authorize from './AuthorizeError';

const DefaultError = <Error500 />;
const ErrorType = [
    { mes: '', component: <Error500 /> },
    { mes: `you don't have enough permissions to access this resource ...`, component: <Error403 /> },
    { mes:`You need to log in to access this resource ...`, component: <Authorize />}
];

const Error = ({message}) => {
    console.log("mes"+message)
    const Item = ErrorType.find(({ mes }) => mes === message);
    return Item ? Item.component : DefaultError;
}

export default Error;
