import React from 'react'

function PrivacyPolicy() {


    return (
        <>

            <div className="row col-10 offset-1 py-5 d-flex justify-content-around">
                <h1 className='text-center py-5'>Terms and Conditions</h1>
            </div>
            <div className="row col-10 offset-1 py-5 d-flex justify-content-around">
                <h3>
                    <ul style={{ listStyleType: 'decimal' }}>
                        <li>You may pay the fee anytime before the batch starts.</li>
                        <li>You may opt to cancel before the batch starts and your fee will be refunded fully</li>
                        <li>In case you want to cancel after joining and attending classes, you will not get any refund unless you have a genuine reason</li>
                    </ul>
                </h3>
            </div>

            <p className='text-center py-5'>* * *</p>

        </>
    )
}

export default PrivacyPolicy