import React from 'react';
// import spinner from './spinner.gif';

function Spinner() {
    return (
        <div className='text-center'>
            <img
                src={"myspinner.gif"}
                style={{ width: '100px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    );
}

export default Spinner;