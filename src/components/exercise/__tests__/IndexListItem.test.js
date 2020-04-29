import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { mount } from 'enzyme';

import IndexListItem from '../IndexListItem'

describe('IndexListItem', () => {
  describe("render", function() {
    let container
    let exerciseData = [{id: 1, name: 'Squat'}, {id: 2, name: 'Bench Press'}, {id: 3, name: 'Dead Lift'}]

    it("should render the exercise in an li element", () => {
      exerciseData.forEach(exercise => {
        container = mount(<IndexListItem exercise={exercise}/>)

        let listItem = container.find('li.exercise-list-item')
        expect(listItem.text().includes(exercise.name)).toEqual(true)

        container.unmount()
      })
    })
  })
})