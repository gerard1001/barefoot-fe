/* eslint-disable no-unused-expressions */
import * as React from 'react';
// import "jest-dom/extend-expect"
import renderer from 'react-test-renderer';
import NavBar from '../src/components/navBar';

describe('Navbar', () => {
  it('should render the menubar on click', () => {
    const component = renderer.create(<NavBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
      tree.props.close;
    });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
