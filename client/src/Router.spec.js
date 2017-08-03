import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import { shallow } from "enzyme";
it("renders without crashing", () => {
  shallow(<Router />);
});
