import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Btn from './Btn';

configure({ adapter: new Adapter() })
describe('<MessageContainer />', () => {
    it('should not render a Loader if isLoading is false', () => {
        const wrapper = shallow(<Btn />);
        // expect(wrapper.find(Loader)).toHaveLength(0);
    });
});