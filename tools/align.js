import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';

class BooPhoneEditorAlign extends PolymerElement {

  static get template() {
    return html`
      <style>
        paper-menu-button {
          padding: 0px;
        }
      </style>
      <iron-iconset-svg size="24" name="align">
        <svg><defs>
          <g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>
          <g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>
          <g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>
          <g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-menu-button vertical-align="bottom" horizontal-align="right">

        <paper-icon-button 
          slot="dropdown-trigger" 
          icon="[[selected.icon]]"></paper-icon-button>

        <paper-listbox slot="dropdown-content">
          <template id="aligns" is="dom-repeat" items="[[aligns]]">
            <paper-item on-click="_select">
              <iron-icon icon="[[item.icon]]"></iron-icon>
              <span>[[item.label]]</span>
            </paper-item>
          </template>
        </paper-listbox>

      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      aligns: {
        type: Array,
        value: [{
          align: "left",
          icon: "align:format-align-left",
          label: "左对齐"
        }, {
          align: "center",
          icon: "align:format-align-center",
          label: "居中对齐"
        }, {
          align: "right",
          icon: "align:format-align-right",
          label: "右对齐"
        }, {
          align: "justify",
          icon: "align:format-align-justify",
          label: "两端对齐"
        }]
      },
      selected: {
        type: Object,
        value: {
          align: "left",
          label: "左对齐",
          icon: "align:format-align-left"
        },
        notify: true
      },
      selectedAlign: {
        type: String,
        observer: '_selectedAlignChanged'
      }
    };
  }

  _select(e) {
    this.selected = this.$.aligns.itemForElement(e.target);
    this.selectedAlign = this.selected.align;
  }

  _selectedAlignChanged(selectedAlign) {
    for(let i in this.aligns) {
      if (this.aligns[i].align == selectedAlign) {
        this.selected = this.aligns[i];
        break;
      }
    }
  }
}

window.customElements.define("boo-phone-editor-align", BooPhoneEditorAlign);
