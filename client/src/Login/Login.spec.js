import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Login />);
});
