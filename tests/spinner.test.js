import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from '../src/helpers/Spinner';

describe('Navbar', () => {
  it('should render the spinner on click', () => {
    const component = renderer.create(<Spinner />);
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
