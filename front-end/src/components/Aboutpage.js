import classes from "../css/Aboutpage.module.css";

function AboutPage() {
  return (
    <div className={classes['about-page-container']}>
      <h2>About</h2>
      <hr></hr>
      <p>
        The idea for this project came during the Covid pandemic of 2020-2021
        and onwards. <br />
        <br />
        Seeing how so much negative media was being broadcasted on the press and
        how little of any positive, inspiring and motivating media resources
        were being aired during the same period of time I decided to make a
        compilation of several media resources that I've read, listened to, and
        watched during the same period of time that to me offer a more upbeat,
        positive, inspiring and motivating content.
      </p>
    </div>
  );
}

export default AboutPage;
