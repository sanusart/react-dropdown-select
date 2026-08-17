import { LIB_NAME } from './constants';

const CSS = `
.${LIB_NAME} {
  box-sizing: border-box;
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 2px;
  padding: 2px 5px;
  flex-direction: row;
  direction: var(--select-direction);
  align-items: center;
  cursor: pointer;
  min-height: 36px;
  pointer-events: all;
}
.${LIB_NAME}:hover,
.${LIB_NAME}:focus-within {
  border-color: var(--select-color);
}
.${LIB_NAME}:focus,
.${LIB_NAME}:focus-within {
  outline: 0;
  box-shadow: 0 0 0 3px var(--select-color-shadow);
}
.${LIB_NAME} * {
  box-sizing: border-box;
}
.${LIB_NAME}-disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.3;
}

.${LIB_NAME}-content {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}

.${LIB_NAME}-clear {
  line-height: 25px;
  margin: 0 10px;
  cursor: pointer;
}
.${LIB_NAME}-clear:focus {
  outline: none;
}
.${LIB_NAME}-clear:hover {
  color: tomato;
}

.${LIB_NAME}-separator {
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
}

.${LIB_NAME}-loading {
  padding: 0 5px;
  display: block;
  width: auto;
  height: auto;
}
.${LIB_NAME}-loading:after {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: var(--select-loading-color) transparent;
  animation: ${LIB_NAME}-dual-ring-spin 0.7s ease-in-out infinite;
  margin: 0 0 0 -10px;
}
@keyframes ${LIB_NAME}-dual-ring-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
}

.${LIB_NAME}-input {
  line-height: inherit;
  border: none;
  margin-left: 5px;
  background: transparent;
  padding: 0;
  width: calc(var(--input-size, 0) * 1ch + 5px);
  font-size: smaller;
}
.${LIB_NAME}-input:focus {
  outline: none;
}
.${LIB_NAME}-input-readonly {
  cursor: pointer;
}

.${LIB_NAME}-dropdown {
  position: absolute;
  border: 1px solid #ccc;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  max-height: var(--dropdown-height);
  overflow: auto;
  z-index: 9;
}
.${LIB_NAME}-dropdown:focus {
  outline: none;
}
.${LIB_NAME}-dropdown-top {
  bottom: var(--dropdown-offset);
}
.${LIB_NAME}-dropdown-bottom {
  top: var(--dropdown-offset);
}
.${LIB_NAME}-dropdown-portal {
  position: fixed;
}
.${LIB_NAME}-dropdown-add-new {
  color: var(--select-color);
  padding: 5px 10px;
}
.${LIB_NAME}-dropdown-add-new:hover {
  background: var(--select-color-hover);
  outline: none;
  cursor: pointer;
}
.${LIB_NAME}-dropdown-select-all {
  color: var(--select-color);
  padding: 5px 10px;
  position: sticky;
  bottom: 0;
  margin: 0;
  opacity: 1;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
.${LIB_NAME}-dropdown-select-all:hover {
  outline: none;
  cursor: pointer;
}

.${LIB_NAME}-dropdown-handle {
  text-align: center;
  cursor: pointer;
}
.${LIB_NAME}-dropdown-handle svg {
  width: 16px;
  height: 16px;
}
.${LIB_NAME}-dropdown-handle:hover path {
  stroke: var(--select-handle-color);
}
.${LIB_NAME}-dropdown-handle:focus {
  outline: none;
}
.${LIB_NAME}-dropdown-handle:focus path {
  stroke: var(--select-handle-color);
}
.${LIB_NAME}-dropdown-handle-open {
  pointer-events: all;
}
.${LIB_NAME}-dropdown-handle-closed {
  pointer-events: none;
}
.${LIB_NAME}-dropdown-handle-rotate {
  transform: rotate(0deg);
  margin: 0px 0 -3px 5px;
}
.${LIB_NAME}-dropdown-handle-no-rotate-open {
  margin: 0 0 0 5px;
  transform: rotate(180deg);
}

.${LIB_NAME}-no-data {
  padding: 10px;
  text-align: center;
  color: var(--select-color);
}

.${LIB_NAME}-option {
  padding: 0 5px;
  border-radius: 2px;
  line-height: 21px;
  margin: 3px 0 3px 5px;
  background: var(--select-option-color);
  color: #fff;
  display: flex;
  flex-direction: var(--select-option-direction, row);
}
.${LIB_NAME}-option .${LIB_NAME}-option-remove {
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: inline-block;
  text-align: center;
  margin: 0 -5px 0 0px;
  border-radius: 0 3px 3px 0;
}
.${LIB_NAME}-option .${LIB_NAME}-option-remove:hover {
  color: tomato;
}
.${LIB_NAME}-option:hover,
.${LIB_NAME}-option:hover > span {
  opacity: 0.9;
}

.${LIB_NAME}-item {
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;
}
.${LIB_NAME}-item-active {
  border-bottom: 1px solid #fff;
  background: var(--select-item-active-bg);
}
.${LIB_NAME}-item:hover,
.${LIB_NAME}-item:focus {
  background: var(--select-item-hover-bg);
  outline: none;
}
.${LIB_NAME}-item-selected {
  background: var(--select-item-selected-bg);
  color: var(--select-item-selected-color, #fff);
  border-bottom: 1px solid #fff;
}
.${LIB_NAME}-item-selected-disabled {
  background: #f2f2f2;
  color: #ccc;
}
.${LIB_NAME}-item-disabled {
  background: #f2f2f2;
  color: #ccc;
}
.${LIB_NAME}-item-disabled ins {
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 0px 3px;
  font-size: x-small;
  text-transform: uppercase;
}
.${LIB_NAME}-hidden-input {
  opacity: 0;
  width: 0;
  position: absolute;
}
`.trim();

let styleTag: HTMLStyleElement | null = null;
let styleTagNonce: string | undefined;
const registry = new Map<string, string>();

const buildCss = (): string => [CSS, ...Array.from(registry.values())].join('\n');

const ensureStyleTag = (nonce?: string): void => {
  if (typeof document === 'undefined') return;
  if (styleTag && styleTagNonce === nonce) return;

  styleTag?.remove();
  styleTag = document.createElement('style');
  styleTag.setAttribute('data-react-dropdown-select', '');
  if (nonce) {
    styleTag.setAttribute('nonce', nonce);
  }
  document.head.appendChild(styleTag);
  styleTagNonce = nonce;
};

const render = (): void => {
  if (styleTag) {
    styleTag.textContent = buildCss();
  }
};

export function injectStyles(nonce?: string): void {
  ensureStyleTag(nonce);
  render();
}

export function registerStyle(id: string, css: string, nonce?: string): void {
  registry.set(id, css);
  ensureStyleTag(nonce);
  render();
}

export function unregisterStyle(id: string): void {
  if (registry.delete(id)) {
    render();
  }
}
