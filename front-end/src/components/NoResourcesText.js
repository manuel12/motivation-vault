import classes from "../css/NoResourcesText.module.css";

const NoResourcesText = () => {
  return (
    <div className={classes["no-resources-container"]}>
      <h2 className={classes["no-resources"]} data-test="no-resources-text">
        No resources to show
      </h2>
    </div>
  );
};

export default NoResourcesText;
