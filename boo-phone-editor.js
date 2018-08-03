import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-button/paper-button.js';
import 'boo-land-row/boo-land-row.js';
import './tools/align.js';
import './tools/block.js';

/**
 * `boo-phone-editor`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BooPhoneEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background-color: white;
          color: grey;
        }
        .block-manager {
          position: fixed;
          background-color: #444;
          color: white;
          white-space: nowrap;
          z-index: 20;
          @apply --layout-horizontal;
          @apply --layout-center;
          display: none;
        }
        .block-manager>span {
          display: inline-block;
          margin: 0px 10px;
        }
        .block-manager>span:hover {
          cursor: pointer;
        }
        iron-autogrow-textarea {
          background-color: inherit;
          color: inherit;
          border: 1px solid rgba(0, 0, 0, .1);
          border-radius: 3px;
          --iron-autogrow-textarea: {
            padding: 5px;
          }
        }
        #textToolbar, #toolbar {
          display: none;
          --boo-land-row-to-left: {
            top: 12px;
          }
          --boo-land-row-to-right: {
            top: 12px;
          }
        }
        #content {
          overflow-y: auto;
          height: calc(100% - 80px);
        }
        #content .focus {
          box-shadow: 0px 0px 4px rgba(0, 0, 0, .4);
          background-color: inherit;
          border-radius: 3px;
          padding: 10px;
          margin: 10px;
        }
        div.toolbar-content {
          display: inline-block;
        }
        :host([input-type="text"]) #textToolbar {
          display: block;
        }
        :host([input-type="other"]) #toolbar {
          display: block;
        }
        #previewArea {
          z-index: var(--boo-phone-editor-preview-index, 5);
          background-color: inherit;
          color: inherit;
          position: fixed;
          top: 0px;
          left: 0px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
        }
        #editArea {
          z-index: var(--boo-phone-editor-edit-index, 10);
          position: fixed;
          width: 100%;
          padding: 5px;
          bottom: 0px;
          box-shadow: 0px 0px 3px rgba(0, 0, 0, .4);
          left: 0px;
          box-sizing: border-box;
          background-color: inherit;
          color: inherit;
        }
        #edit {
          max-height: 50vh;
          @apply --layout-horizontal;
          @apply --layout-justified;
        }
        input {
          width: 100%;
          box-sizing: border-box;
          display: none;
        }
        :host([editing]) input {
          display: block;
        }
      </style>
      <iron-iconset-svg size="24" name="boo-wysiwyg-e">
        <svg><defs>
          <g id="to-left"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></g>
          <g id="to-right"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <app-toolbar id="fix" class="block-manager">
        <span>删除</span>
        <span>修改</span>
      </app-toolbar>

      <div id="previewArea">
        <app-toolbar>
          <slot name="opers"></slot>
        </app-toolbar>
        <div id="content"></div>
      </div>
      <div id="editArea">
        <div id="edit">
          <iron-autogrow-textarea 
            on-input="_input"
            placeholder="[[placeholder]]" 
            value="{{value}}"
            rows="1" id="input"></iron-autogrow-textarea>

          <paper-button on-click="_submit" raised>确定</paper-button>
        </div>
        <boo-land-row id="textToolbar">
          <paper-icon-button slot="to-left" icon="boo-wysiwyg-e:to-left"></paper-icon-button>
          <div class="toolbar-content" slot="content">
            <boo-phone-editor-block id="block"></boo-phone-editor-block>
            <boo-phone-editor-align id="align"></boo-phone-editor-align>
          </div>
          <paper-icon-button slot="to-right" icon="boo-wysiwyg-e:to-right"></paper-icon-button>
        </boo-land-row>
        <boo-land-row id="toolbar">
          <paper-icon-button slot="to-left" icon="boo-wysiwyg-e:to-left"></paper-icon-button>
          <div class="toolbar-content" slot="content">
            <slot name="toolbar"></slot>
          </div>
          <paper-icon-button slot="to-right" icon="boo-wysiwyg-e:to-right"></paper-icon-button>
        </boo-land-row>
      </div>
    `;
  }

  static get properties() {
    return {
      placeholder: {
        type: String,
        value: '输入内容',
      },
      elems: {
        type: Array,
        value: []
      },
      inputType: {
        type: String,
        value: "other",
        observer: '_inputTypeChanged',
        reflectToAttribute: true
      },
      value: String,
    };
  }

  update() {
    this.$.textToolbar.update();
    this.$.toolbar.update();
  }

  _inputTypeChanged(inputType) {
    if (inputType == 'other') {
      setTimeout(function() {
        this.$.toolbar.update();
      }.bind(this), 100);
    } else {
      setTimeout(function() {
        this.$.textToolbar.update();
      }.bind(this), 100);
    }
  }

  _input(e) {
    if (this.value.trim() == "") {
      this.inputType = "other";
    } else {
      this.inputType = "text";
    }
  }

  _submit() {
    if (this.value.trim() == "") {
      return;
    }
    let block = this.$.block.selected;
    let align = this.$.align.selected;
    let elem = document.createElement(block.block);
    elem.style.textAlign = align.align;
    elem.innerHTML = this.value;
    this.$.content.appendChild(elem);
    this._initBlock(elem);
    this.value = "";
  }

  _initBlock(block) {
    let rect = block.getBoundingClientRect();
    let item = {
      top: this._blockTop(block),
      height: rect.height,
      elem: block
    };
    this._insertBlock(item);
    block.addEventListener('touchstart', function(e) {
      this.elems.forEach(function(item) {
        item.elem.classList.remove("focus");
      }.bind(this));
      let touch = e.changedTouches[0];
      this.offsetX = touch.clientX - rect.left;
      this.offsetY = touch.clientY - rect.top;
      block.classList.add("focus");
      block.style.position = 'fixed';
    }.bind(this));
    block.addEventListener('touchcancel', function(e) {
      e.target.classList.remove('focus');
    }.bind(this));
    block.addEventListener('touchmove', function(e) {
      let touch = e.changedTouches[0];
      let left = touch.clientX - this.offsetX;
      let top = touch.clientY - this.offsetY;
      block.style.top = top + 'px';
      block.style.left = left + 'px';
    }.bind(this));
    block.addEventListener('touchend', function(e) {
      e.target.classList.remove('focus');
      this.moveBlock(block);
      block.style.position = 'static';
      block.style.top = 'auto';
      block.style.left = 'auto';
    }.bind(this));
  }

  _blockTop(block) {
    let elem = block;
    let top = 0;
    for(let elem = block; elem != this.$.content; elem = elem.parentNode) {
      if (!elem) {
        throw '获取位置出错';
        break;
      }
      top += elem.offsetTop;
    }

    return top;
  }

  _insertBlock(item) {
    if (!this.elems || this.elems && this.elems.length == 0) {
      this.elems = [item];
      return;
    }
    for(let i = 0; i < this.elems.length; ++i) {
      if (this.elems[i].top < item.top) {
        continue;
      }
      this.elems.splice(i, 0, item);
      return;
    }
    this.elems.push(item);
  }

  moveBlock(block) {
    // 不需要调整位置
    if (!this.elems || this.elems && this.elems.length == 0) {
      return;
    }
    let top = this._blockTop(block);
    let idx = this._blockIdx(block);
    let b = this.elems.splice(idx, 1)[0];
    for (let i = 0; i < this.elems.length; ++i) {
      let et = this.elems[i].top + this.elems[i].height / 2;
      if (i >= idx) {
        et -= b.height;
      }
      if (et > top) {
        continue;
      }
      this.elems.splice(i, 0, b);
      if (i == this.elems.length - 1) {
        this.$.content.appendChild(block);
      } else {
        this.$.content.insertBefore(block, this.elems[i + 1].elem);
      }
      return;
    }
    this.elems.splice(this.elems.length - 1, 0, b);
    this.$.content.appendChild(block);
  }

  _blockIdx(block) {
    for(let i = 0; i < this.elems.length; ++i) {
      if (this.elems[i].elem == block) {
        return i;
      }
    }

    return 0;
  }
}

window.customElements.define('boo-phone-editor', BooPhoneEditor);
