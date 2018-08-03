import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import 'boo-window/boo-window.js';

class BooPhoneEditorLink extends PolymerElement {

  static get template() {
    return html`
      <style>
        boo-window {
          --boo-window-container: {
            padding: 10px;
            box-sizing: border-box;
          }
        }
        paper-input {
          --paper-input-container-input: {
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
          --paper-input-container-label: {
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
          --paper-input-container-label-focus: {
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-link">
        <svg><defs>
          <g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <paper-icon-button 
        icon="bwe-link:link" 
        on-click="_open"
        title="链接"></paper-icon-button>

      <boo-window opened="{{opened}}" pos-policy="center">
        <div slot="content">
          <h2>添加/修改链接</h2>
          <paper-input value="{{href}}" label="输入链接"></paper-input>
          <paper-input value="{{name}}" label="输入名字"></paper-input>
          <paper-button on-click="_add">添加</paper-button>
          <paper-button on-click="_close">取消</paper-button>
        </div>
      </boo-window>
    `;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true
      },
      href: String,
      name: String,
    };
  }

  _open() {
    this.opened = true;
  }

  _close() {
    this.opened = false;
  }

  _add() {
    this.editor.exec('inserthtml', '<a href="'+this.href+'">'+this.name+'</a>');
  }
}

window.customElements.define("boo-phone-editor-link", BooPhoneEditorLink);
