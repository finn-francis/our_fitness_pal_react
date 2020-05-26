import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {MemoryRouter} from "react-router-dom";
import EditListItem from '../EditListItem'

configure({ adapter: new Adapter() })

describe('EditListItem', () => {
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

    beforeEach(() => { container = mount(<MemoryRouter><EditListItem set={set} /></MemoryRouter>) })
    afterEach(() => { container.unmount() })

    it("displays the given set in an li tag", () => {
      let listItem = container.find('.editable-set-list-item')
      const {name} = set
      expect(listItem.hasClass('editable-set-list-item')).toEqual(true)
      expect(container.find('#setName').instance().value).toEqual(name)
    })
  })
})