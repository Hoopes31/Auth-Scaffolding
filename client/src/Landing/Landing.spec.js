import React from 'react'
import ReactDOM from 'react-dom'
import Landing from "./Landing"
import { shallow } from 'enzyme'
it('renders without crashing', () => {
  shallow(<Landing />)
})