import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {MemoryRouter} from "react-router-dom";
import IndexListItem from '../IndexListItem'

configure({ adapter: new Adapter() })

describe('IndexListItem', () => {
  describe("render", function() {
    let container
    let session = {id: 1, name: 'Leg day', description: 'Train your legs'}

    beforeEach(() => { container = mount(<MemoryRouter><IndexListItem session={session} /></MemoryRouter>) })
    afterEach(() => { container.unmount() })

    it("displays the given session in an li tag", () => {
      let listItem = container.find('.session-list-item')
      expect(listItem.hasClass('session-list-item')).toEqual(true)
      expect(listItem.text().includes(session.name)).toEqual(true)
    })
  })
})