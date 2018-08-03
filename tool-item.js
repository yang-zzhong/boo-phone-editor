import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

export class BooPhoneEditorOption extends PolymerElement {
  static get template() {
    return html`
      <paper-icon-button
        icon="[[icon]]" ></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      type: String,
      selected: {
        type: Boolean,
        reflectToAttribute: true,
      },
      id: {
        type: String,
        reflectToAttribute: true,
        computed: "_computeId(type)"
      },
      icon: String
    };
  }
}
