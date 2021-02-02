import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageContainer from './MessageContainer';
import SwitchComments from '../UI/SwitchComments'
import MessageCreateContainer from './MessageCreateContainer'
import BootstrapTable from 'react-bootstrap-table-next';
import Loader from 'react-loader-spinner'
configure({ adapter: new Adapter() })
describe('<MessageContainer />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MessageContainer />);
    });
    it('should  render a Loader if load is true', () => {
        wrapper = shallow(<MessageContainer load={false} />);
        expect(wrapper.find(Loader)).toHaveLength(1);
    });
    it('should  not render a Loader if load is false', () => {
        wrapper = shallow(<MessageContainer load={false} />);
        expect(wrapper.find(Loader)).toHaveLength(0);
    });
    it('should  render a SwitchComments at any time', () => {
        expect(wrapper.find(SwitchComments)).toHaveLength(1);
    });
    it('should render a MessageCreateContainer if has idOfMessage props', () => {
        wrapper = shallow(<MessageContainer />);
        expect(wrapper.find(MessageCreateContainer)).toHaveLength(1);
    });
    it('should not render a MessageCreateContainer if has not idOfMessage props', () => {
        wrapper = shallow(<MessageContainer />);
        expect(wrapper.find(MessageCreateContainer)).toHaveLength(0);
    });
    it('should not render a BootstrapTable if has idOfMessage props', () => {
        wrapper = shallow(<MessageContainer idMessage={876} />);
        expect(wrapper.find(BootstrapTable)).toHaveLength(0);
    });
    it('should render a BootstrapTable if has not idOfMessage props and dataArray is not empty', () => {
        wrapper = shallow(<MessageContainer dataArray={[{ mess: "test1" }, { mess: 'test2' }]} />);
        expect(wrapper.find(BootstrapTable)).toHaveLength(1);
    });
});