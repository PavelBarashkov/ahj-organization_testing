/* eslint-disable no-undef */
import { InnFormWidget } from '../widget';

const { JSDOM } = require('jsdom');

test('widget should render', () => {
  const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;

  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new InnFormWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(InnFormWidget.markup);
});

test('widget should add valid class', () => {
  const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;

  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new InnFormWidget(container);

  widget.bindToDOM();

  widget.input.value = '2720994540520557';
  widget.submit.click();

  expect(widget.input.classList.contains('valid')).toEqual(true);
});

test('widget should add invalid class', () => {
  const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;

  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new InnFormWidget(container);

  widget.bindToDOM();

  widget.input.value = '272099454052055';
  widget.submit.click();

  expect(widget.input.classList.contains('invalid')).toEqual(true);
});
