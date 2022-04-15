import classes from "../css/Aboutpage.module.css";

const AboutPage = () => {
  return (
    <div className={classes["about-page-container"]}>
      <h2>About</h2>
      <hr></hr>
      <p>
        This website is compilation of
        different resources thet I've been either reading, listening or watching for the
        last 2 years that offer an upbeat and positive perspective with inspirational and
        motivational content.
        <br></br>
        <br></br>
        It was born out of seeing how much negative media was being broadcast on the press and
        how little of any positive, inspiring and motivational stories
        were being aired during the same period of time.
      </p>
    </div>
  );
};

export default AboutPage;
