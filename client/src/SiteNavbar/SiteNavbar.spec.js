import React from "react";
import ReactDOM from "react-dom";
import SiteNavbar from "./SiteNavbar";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<SiteNavbar />);
});
