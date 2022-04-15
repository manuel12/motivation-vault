import classes from "../css/NotFound.module.css";

const NotFound = () => {
  return (
    <div>
      <h1 className={classes["not-found"]} data-test="not-found">
        404 - Not found :(
      </h1>
    </div>
  );
}

export default NotFound;
