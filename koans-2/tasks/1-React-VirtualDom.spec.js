import TodoList,{ListItem} from '../../koans-1/tasks/2-React-TodoList-one-way-data-binding.js';
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import { expect } from "chai";

describe("Virtual DOM test. React Compoment, React Instance and React Element:", () => {

  it("JsX creates React Elements.", () => {
    let am_I_a_component = <TodoList/>;

    // change this var
    let change_me = 'react.element';

    // hint, uncomment next line to see the object in the console:
    // console.log({am_I_a_component});
    // console.log({change_me});

    expect(`Symbol(${change_me})`).to.be.equal(am_I_a_component['$$typeof'].toString());
  });

  it("JsX creates new objects every time.", () => {
    let component_1 = <TodoList/>;
    let component_2 = <TodoList/>;

    // change this assertion, are the two React Elements deeply equal?
    expect(component_1).to.be.deep.equal(component_2);
  });

  it("React Elements do not implement component's functionality.", () => {
    // KJ: i.e. this isn't being rendered yet, it is just the definition of the element
    // React element = =description - type, props, telling react render how to render.
    // The react element gets passed to the react render.
    // When you place the element somewhere, jsx transforms it into react.createEleement and returns
    // object with type, props etc, describing the stuff.
    // On rendering, it looks at the type to find out what logic to execute - then it will
    // find the addTask function. the element doesn't implemenet it because it isn't in the dom, it
    // just has the 'type' property that points to where the logic will be.
    let reactElement = <TodoList/>;

    // hint, uncomment next line to see the object in the console:
    console.log('--------->',reactElement);

    //An assertion library would give you many clues and it would be too easy, that's why we are throwing an Error with a custome message instead
    if ('undefined' !== typeof reactElement.addTask) {
      throw new Error("The typeof(reactElement.addTask) is not correct");
    }
  });

  it("Rendering into the document should return a React Instance.", () => {
    let component = TestUtils.renderIntoDocument(<TodoList/>);

    // hint, uncomment next line to see the object in the console:
    console.log('--------->',component);

    // An assertion library would give you many clues and it would be too easy, that's why we are throwing an Error with a custome message instead
    // Change the following condition
    if ('function' !== typeof component.addTask) {
      throw new Error("The typeof(reactElement.addTask) is not correct");
    }
  });

  it("TestUtils.renderIntoDocument should return a detached React Instance.", () => {
    let detachedComp_1 = TestUtils.renderIntoDocument(<TodoList/>);
    let detachedComp_2 = TestUtils.renderIntoDocument(<TodoList/>);

    if (detachedComp_1 === detachedComp_2) {
      throw new Error("Are you sure detachedComp_1 and detachedComp_2 are the same instance?");
    }
  });

  it("ReactDOM.render should return the same React Instance for the same component (they are not detached).", () => {
    let component_1 = ReactDOM.render(<TodoList/>, document.getElementById('app'));
    let component_2 = ReactDOM.render(<TodoList/>, document.getElementById('app'));

    if (component_1 !== component_2) {
      throw new Error("Are you sure component_1 and component_2 are the same instance?");
    }
  });
});
