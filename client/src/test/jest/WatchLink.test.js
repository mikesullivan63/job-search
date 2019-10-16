https://semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest

import React from 'react';
import renderer from 'react-test-renderer';
import WatchLink from '../../screens/search/WatchLink';


describe("TodoList", function() {
    //don't use an arrow function...preserve the value of "this"
    beforeEach(function() {
      this.store = {
        filteredTodos: [
          {value: "todo1", id: 111, complete: false},
          {value: "todo2", id: 222, complete: false},
          {value: "todo3", id: 333, complete: false},
        ],
        filter: "test",
        createTodo: (val) => {
          this.createTodoCalled = true
          this.todoValue = val
        },
      }
    })
  
    //tests will go here and receive this.store
  
  })

test('WatchLink changes the class when hovered', () => {
  const component = renderer.create(
    <WatchLink
    store={}
    job={props.job}
    company={props.company.company}
  />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});