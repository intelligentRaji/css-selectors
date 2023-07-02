import { fireEvent } from '@testing-library/dom';
import { BaseComponent } from './BaseComponent';

describe('BaseComponent', () => {
  let element: BaseComponent;

  afterEach(() => {
    element.destroy();
  });

  it('creates a new element on a page', () => {
    element = new BaseComponent({ parent: document.body });

    expect(element.getNode()).toBeInTheDocument();
  });

  it('should create an element with id', () => {
    element = new BaseComponent({ parent: document.body, id: 'test' });

    expect(element.getNode()).toHaveAttribute('id', 'test');
  });
});

// eslint-disable-next-line max-lines-per-function
describe('baseComponent methods', () => {
  let component: BaseComponent;

  beforeEach(() => {
    component = new BaseComponent({});
  });

  afterEach(() => {
    component.destroy();
  });

  it('should take an argument and add class to Node', () => {
    const className = 'test';

    component.addClass(className);

    expect(component.getNode()).toHaveClass('test');
  });

  it('should take multiple arguments and add class for each argument', () => {
    const className1 = 'test';
    const className2 = 'test2';

    component.addClass(className1, className2);

    expect(component.getNode()).toHaveClass('test', 'test2');
  });

  it('should take an argument and remove class what matches with the arguemet', () => {
    const className = 'test';
    component.addClass(className);
    expect(component.getNode()).toHaveClass(className);

    component.removeClass(className);

    expect(component.getNode()).not.toHaveClass('test');
  });

  it('should return className', () => {
    const className = 'test';
    component.addClass(className);
    expect(component.getNode()).toHaveClass(className);

    const result = component.getClassName();

    expect(result).toBe(className);
  });

  it('should add data attribute', () => {
    const dataName = 'test';
    const dataValue = 'value';

    component.addData(dataName, dataValue);

    expect(component.getNode()).toHaveAttribute(`data-${dataName}`, dataValue);
  });

  it('should set text content', () => {
    const text = 'test';
    expect(component.getNode()).toBeEmptyDOMElement();

    component.setTextContent(text);

    expect(component.getNode()).toHaveTextContent(text);
  });

  it('should create an html code in Node', () => {
    const html = '<span id="test">test</span>';
    expect(component.getNode()).toBeEmptyDOMElement();
    document.body.append(component.getNode());

    component.setInnerHTML(html);
    const innerElement = document.getElementById('test');

    expect(component.getNode()).toContainElement(innerElement);
  });

  it('should add id', () => {
    const id = 'test';
    expect(component.getNode()).not.toHaveAttribute('id');

    component.setId(id);

    expect(component.getNode()).toHaveAttribute('id', id);
  });

  it('should add style to node', () => {
    const param = 'display';
    const value = 'none';
    expect(component.getNode()).not.toHaveStyle(`${param}: ${value}`);

    component.stylize(param, value);

    expect(component.getNode()).toHaveStyle(`${param}: ${value}`);
  });

  it('should add attribute', () => {
    const attribute = 'value';
    const value = 'test';
    expect(component.getNode()).not.toHaveAttribute(attribute);

    component.setAttribute(attribute, value);

    expect(component.getNode()).toHaveAttribute(attribute, value);
  });

  it('should take nodes and append into the element', () => {
    const element1 = new BaseComponent({}).getNode();
    const element2 = new BaseComponent({}).getNode();
    expect(component.getNode()).toBeEmptyDOMElement();

    component.insertChild(element1, element2);

    expect(component.getNode()).toContainElement(element1);
    expect(component.getNode()).toContainElement(element2);
  });

  it('should remove all nodes from index from the element', () => {
    const element1 = new BaseComponent({}).getNode();
    const element2 = new BaseComponent({}).getNode();
    component.insertChild(element1, element2);
    expect(component.getNode()).not.toBeEmptyDOMElement();

    component.removeChildren();

    expect(component.getNode()).toBeEmptyDOMElement();
  });
});

describe('BaseComponent event methods', () => {
  it('should add an event', () => {
    const component = new BaseComponent({});
    const eventName = 'click';
    const handleClick = jest.fn();

    component.addEvent(eventName, handleClick);
    document.body.append(component.getNode());

    fireEvent.click(component.getNode());

    expect(handleClick).toHaveBeenCalled();
  });

  it('should remove an event', () => {
    const component = new BaseComponent({});
    const eventName = 'click';
    const handleClick = jest.fn();

    component.addEvent(eventName, handleClick);
    document.body.append(component.getNode());
    fireEvent.click(component.getNode());
    expect(handleClick).toHaveBeenCalled();

    component.removeEvent(eventName, handleClick);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
