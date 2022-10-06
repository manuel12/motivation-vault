import classes from "../css/NoResourcesText.module.css";

const NoResourcesText = () => {
  return (
    <h3 className={classes["no-resources"]} data-test="no-resources-text">
      No resources to show
    </h3>
  );
};

export default NoResourcesText;
