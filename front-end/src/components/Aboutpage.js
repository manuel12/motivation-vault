import classes from "../css/Aboutpage.module.css";

const AboutPage = () => {
  return (
    <div
      className={classes["about-page-container"]}
      data-test="about-page-container"
    >
      <h2 className={classes["page-heading"]}>About</h2>
      <p>
        This website is compilation of different resources that offer upbeat,
        educational, inspirational and motivational content.
      </p>
      <p>
        It was created after observing how much negative media was being
        broadcast the last couple of years and how little of any positive,
        educational and motivational content was being aired during the same
        time.
      </p>
      <h3 className={classes["section-heading"]}>
        Adding & Accessing Resources
      </h3>
      <p>
        The resources here presented can be either books, podcasts, podcast
        episodes and motivational speeches. You can add and access all of these
        kinds of resources, even the ones you didn't create, just as you would
        in a blog.
      </p>
      <p>
        In order to add a resource just click "Add+" on the navbar, select the
        resource type you wanna add and the form for such type will be
        displayed. Each form varies slightly requiring different information
        depending on the resource type. Books will require you to add a subtitle
        and ISBN number, for example, whereas motivational speeches will require
        you to add a youtube url.
      </p>
      <p>
        <b>Note:</b> before you can select podcast-episodes as an option on the
        select element there has to be at least 1 podcast already created.
      </p>
      <p>
        When filling the form you can also add up to 3 "values". This means you
        can add what you learned, whether an idea or a knowledge gem you got
        from such resource. The values section is the same for all resource
        types.
      </p>
      <h3 className={classes["section-heading"]}>
        Leaving a Rating or Comment on Resources
      </h3>
      <p>
        Also each resource has their own rating section where you can rate it
        with 1 to 5 stars. The rating can be updated at any moment. Each
        resource has also it's own comment section where you can leave a
        comment. You can leave as many comments you like.
      </p>
      <h3 className={classes["section-heading"]}>
        Editing & Deleting Resources
      </h3>
      <p>
        Lastly, a staff user can also edit or delete resources by pressing on
        the edit/delete buttons located at the top of any resource's detail
        page. Keep in mind that the edit/delete buttons panel will only appear
        for users that are staff, as defined on the django backend.
      </p>
    </div>
  );
};

export default AboutPage;
