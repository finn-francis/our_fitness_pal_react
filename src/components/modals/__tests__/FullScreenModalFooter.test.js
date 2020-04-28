import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount } from 'enzyme';

import FullScreenModalFooter from '../FullScreenModalFooter'

describe('FullScreenModalFooter', () => {
  describe("render", function() {
    let container
    const element1 = "child-element1"
    const element2 = "child-element2"

    beforeEach(() => { container = shallow(
      <FullScreenModalFooter>
        <div className={element1}></div>
        <div className={element2}></div>
      </FullScreenModalFooter>
      ) })
    afterEach(() => { container.unmount() })

    it("should add a modal footer", () => {
      expect(container.find(`.modal-footer-full-width`).length).toEqual(1)
    })

    it("should render the children within the modal", () => {
      expect(container.find(`.${element1}`).length).toEqual(1)
      expect(container.find(`.${element2}`).length).toEqual(1)
    })
  })
})