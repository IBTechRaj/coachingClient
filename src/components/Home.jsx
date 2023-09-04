import React from "react";
import './home.css';

function Home(signedIn, setSignedIn) {
  // console.log('hom', signedIn)
  return (
    <div className="home" id="header">
      <div className="container">
        <div className="row justify-content-center my-5">
          {/* <div className="col-lg-7"> */}
          <h1 style={{ color: 'blue', fontSize: 64, }}> The C Learning Hub</h1>
          {/* <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="robert-bye-OlZ1nWLEEgM-unsplash.jpg"
              src="http://placehold.it/900x400"
              alt=""
            /> */}
          {/* </div> */}
          {/* <div className="col-lg-5"> */}
          {/* <h1 className="font-weight-light">Home</h1> */}
          {/* <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;