import React from "react";
import ReactDOM from "react-dom";
import Profile from "./Profile";
import { shallow } from "enzyme";
it("renders without crashing", () => {
  shallow(<Profile />);
});
