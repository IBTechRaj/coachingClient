import React from "react";
import "./Video.css";
import Video from "./Video";

export default function Lecture({ lessonId }) {
    console.log(' L0 src', { lessonId })
    return (

        <div className="App">
            {/* <h5> </h5> */}
            <Video embedId={lessonId} />
            {console.log(' Lsrc', { lessonId })}
        </div>
    );
}
