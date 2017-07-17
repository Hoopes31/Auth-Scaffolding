import React from 'react'
import ReactDOM from 'react-dom'
import SignUp from "./SignUp"
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<SignUp />)
})