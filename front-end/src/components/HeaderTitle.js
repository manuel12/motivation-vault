import React, { useState, useEffect, useRef } from "react";
import classes from "../css/HeaderTitle.module.css";

const HeaderTitle = () => {
  return (
    <div className={classes["header"]} data-test="header">
      <h1 className={classes["header-title"]}>Motivation Vault</h1>
    </div>
  );
};

export default HeaderTitle;
