import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { mount } from 'enzyme';

import Index from '../Index'

describe('Index', () => {
  describe("render", function() {
    let container

    beforeEach(() => { container = mount(<Index/>) })
    afterEach(() => { container.unmount() })

    it("shows there are no exercises if there is no data", () => {
      expect(container.find('.exercise-list-item').length).toEqual(0);
      expect(container.find('.no-exercises').length).toEqual(1);
    })

    it("shows a list of exercises when given a list of exercise JSON", () => {
      let exerciseData = [{id: 1, name: 'Squat'}, {id: 2, name: 'Bench Press'}, {id: 3, name: 'Dead Lift'}]
      container.setState({exercises: exerciseData})
      expect(container.find('.exercise-list-item').length).toEqual(exerciseData.length);
      expect(container.find('.no-exercises').length).toEqual(0);
    })
  })
})