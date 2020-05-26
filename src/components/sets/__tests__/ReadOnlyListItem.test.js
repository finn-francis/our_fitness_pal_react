import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {MemoryRouter} from "react-router-dom";
import IndexListItem from '../IndexListItem'

configure({ adapter: new Adapter() })

describe('ReadOnlyListItem', () => {
  describe("render", function() {
    let container
    let set = {id: 1, name: 'Chest super-set', set_exercises: [
      {
      "exercise_name": "Bench Press",
      "unit": "Reps"
      },
      {
        "exercise_name": "Incline Press",
        "unit": "Reps"
      }
    ]}

    beforeEach(() => { container = mount(<MemoryRouter><IndexListItem set={set} /></MemoryRouter>) })
    afterEach(() => { container.unmount() })

    it("displays the given set in an li tag", () => {
      let listItem = container.find('.set-list-item')
      expect(listItem.hasClass('set-list-item')).toEqual(true)
      expect(listItem.text().includes(set.name)).toEqual(true)
    })
  })
})