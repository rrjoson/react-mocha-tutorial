import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import App from './App';

describe('<App/>', () => {
  it('should render without blowing up', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.length).to.eql(1);
  });
});
