/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { validCard } from './validCard';
import data from '../components/numberCardList/namberCardList.json';
import { cardDefinition } from './CardDefinition';

export class InnFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
    this.onDefinition = this.onDefinition.bind(this);
  }

  static get markup() {
    return `
            <form class="container-card">
                <div class="cards">
                    <div class="card Diners"></div>
                    <div class="card Discover"></div>
                    <div class="card Jcb"></div>
                    <div class="card Mastercard"></div>
                    <div class="card Mir"></div>
                    <div class="card Visa"></div>
                </div>
                <input type="text" class="input">
                <button class="submit">Click to Validate</button>
            </form>
        `;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get selector() {
    return '.container-card';
  }

  static get cardtSelector() {
    return '.card';
  }

  bindToDOM() {
    this.parentEl.innerHTML = InnFormWidget.markup;

    this.element = this.parentEl.querySelector(InnFormWidget.selector);
    this.submit = this.element.querySelector(InnFormWidget.submitSelector);
    this.input = this.element.querySelector(InnFormWidget.inputSelector);
    this.cards = [...this.parentEl.querySelectorAll(InnFormWidget.cardtSelector)];

    this.element.addEventListener('submit', this.onSubmit);
    this.element.addEventListener('input', this.onDefinition);
  }

  onDefinition(e) {
    e.preventDefault();

    const { value } = this.input;
    this.cards.forEach((item) => item.classList.remove('active'));
    const nameCard = cardDefinition(Number(value), data);
    console.log(nameCard);
    const targetElement = this.element.querySelector(`.${nameCard}`);
    if (targetElement === null) {
      this.cards.forEach((item) => item.classList.remove('active'));
      return;
    }
    targetElement.classList.add('active');
  }

  onSubmit(e) {
    e.preventDefault();
    const { value } = this.input;
    const result = validCard(value);
    if (result) {
      this.input.classList.remove('invalid');
      this.input.classList.add('valid');
    } else {
      this.input.classList.remove('valid');
      this.input.classList.add('invalid');
    }
    if (value === '') {
      this.input.classList.add('invalid');
    }
  }
}
