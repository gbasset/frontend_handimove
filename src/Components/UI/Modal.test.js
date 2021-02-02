import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from './Modal';
configure({ adapter: new Adapter() })
describe('<Modal />', () => {
    it('should render a string isOpen is false', () => {
        const wrapper = shallow(<Modal />)
        // expect(wrapper.find())
    });
});