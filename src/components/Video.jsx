import PropTypes from "prop-types";

const Video = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            width="426"
            height="240"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
        {/* {console.log('src', { embedId })} */}
    </div>
);

Video.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default Video;