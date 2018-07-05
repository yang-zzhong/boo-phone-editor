import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

class BooPhoneEditorBlock extends PolymerElement {

  static get template() {
    return html`
      <style>
        paper-menu-button {
          padding: 0px;
        }
      </style>
      <iron-iconset-svg size="24" name="block">
        <svg><defs>
          <g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-menu-button vertical-align="bottom" horizontal-align="right">

        <paper-icon-button 
          slot="dropdown-trigger" 
          icon="block:text-format"></paper-icon-button>

        <paper-listbox slot="dropdown-content">
          <template id="blocks" is="dom-repeat" items="[[blocks]]">
            <paper-item on-click="_select">[[item.label]]</paper-item>
          </template>
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      blocks: {
        type: Array,
        value: [
          { block: "H1", label: "h1", },
          { block: "H2", label: "h2", },
          { block: "H3", label: "h3", },
          { block: "H4", label: "h4", },
          { block: "H5", label: "h5", },
          { block: "H6", label: "h6", },
          { block: "DIV", label: "div", }, 
          { block: "P", label: "p", }, 
        ],
      },
      selectedBlock: {
        type: String,
        observer: "_selectedBlockChanged"
      },
      selected: {
        type: Object,
        value: { block: "P", label: "p"},
      }
    };
  }

  _select(e) {
    this.selected = this.$.blocks.itemForElement(e.target);
    this.selectedBlock = this.selected.block;
  }

  _selectedBlockChanged(block) {
    for(let i in this.blocks) {
      if (block == this.blocks[i].block) {
        this.selected = this.blocks[i];
        break;
      }
    }
  }
}

window.customElements.define("boo-phone-editor-block", BooPhoneEditorBlock);
