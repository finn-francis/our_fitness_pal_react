import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Index from '../Index'

configure({ adapter: new Adapter() })

describe('Index', () => {
  describe("render", function() {
    let container

    beforeEach(() => { container = mount(<Index/>) })
    afterEach(() => { container.unmount() })

    it("shows there are no sessions if there is no data", () => {
      expect(container.find('.session-list-item').length).toEqual(0)
      expect(container.find('.no-sessions').length).toEqual(1)
    })

    it("shows a list of sessions when given a list of session JSON", () => {
      let sessionData = [{id: 1, name: 'Leg day', description: 'Train your legs'}, {id: 2, name: 'Chest day', description: 'Train your chest'}]
      container.setState({sessions: sessionData})
      expect(container.find('.session-list-item').length).toEqual(sessionData.length)
      expect(container.find('.no-sessions').length).toEqual(0)
      expect(container.text().includes(sessionData[0].name))
    })
  })
})