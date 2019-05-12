"use strict";exports.__esModule=!0,exports.default=void 0;var _styledBase=_interopRequireDefault(require("@emotion/styled-base")),_react=_interopRequireDefault(require("react")),_constants=require("../constants");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Option=function(a){var b=a.item,c=a.props,d=a.state,e=a.methods;return b&&c.optionRenderer?c.optionRenderer({item:b,props:c,state:d,methods:e}):_react.default.createElement(OptionComponent,{role:"listitem",disabled:c.disabled,direction:c.direction,className:_constants.LIB_NAME+"-option",color:c.color},_react.default.createElement("span",{className:_constants.LIB_NAME+"-option-label"},b[c.labelField]),_react.default.createElement("span",{className:_constants.LIB_NAME+"-option-remove",onClick:function onClick(a){return e.removeItem(a,b,c.closeOnSelect)}},"\xD7"))},OptionComponent=(0,_styledBase.default)("span",{target:"e1l4eby50",label:"OptionComponent"})("padding:0 5px;border-radius:2px;line-height:21px;margin:3px 0 3px 5px;background:",function(a){var b=a.color;return b},";color:#fff;display:flex;flex-direction:",function(a){var b=a.direction;return"rtl"===b?"row-reverse":"row"},";.",_constants.LIB_NAME,"-option-remove{cursor:pointer;width:22px;height:22px;display:inline-block;text-align:center;margin:0 -5px 0 0px;border-radius:0 3px 3px 0;:hover{color:tomato;}}:hover,:hover > span{opacity:0.9;}"+("production"===process.env.NODE_ENV?"":"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL09wdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1Qm1DIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL09wdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBMSUJfTkFNRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IE9wdGlvbiA9ICh7IGl0ZW0sIHByb3BzLCBzdGF0ZSwgbWV0aG9kcyB9KSA9PlxuICBpdGVtICYmIHByb3BzLm9wdGlvblJlbmRlcmVyID8gKFxuICAgIHByb3BzLm9wdGlvblJlbmRlcmVyKHsgaXRlbSwgcHJvcHMsIHN0YXRlLCBtZXRob2RzIH0pXG4gICkgOiAoXG4gICAgPE9wdGlvbkNvbXBvbmVudFxuICAgICAgcm9sZT1cImxpc3RpdGVtXCJcbiAgICAgIGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cbiAgICAgIGRpcmVjdGlvbj17cHJvcHMuZGlyZWN0aW9ufVxuICAgICAgY2xhc3NOYW1lPXtgJHtMSUJfTkFNRX0tb3B0aW9uYH1cbiAgICAgIGNvbG9yPXtwcm9wcy5jb2xvcn0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0xJQl9OQU1FfS1vcHRpb24tbGFiZWxgfT57aXRlbVtwcm9wcy5sYWJlbEZpZWxkXX08L3NwYW4+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzc05hbWU9e2Ake0xJQl9OQU1FfS1vcHRpb24tcmVtb3ZlYH1cbiAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBtZXRob2RzLnJlbW92ZUl0ZW0oZXZlbnQsIGl0ZW0sIHByb3BzLmNsb3NlT25TZWxlY3QpfT5cbiAgICAgICAgJnRpbWVzO1xuICAgICAgPC9zcGFuPlxuICAgIDwvT3B0aW9uQ29tcG9uZW50PlxuICApO1xuXG5jb25zdCBPcHRpb25Db21wb25lbnQgPSBzdHlsZWQuc3BhbmBcbiAgcGFkZGluZzogMCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgbGluZS1oZWlnaHQ6IDIxcHg7XG4gIG1hcmdpbjogM3B4IDAgM3B4IDVweDtcbiAgYmFja2dyb3VuZDogJHsoeyBjb2xvciB9KSA9PiBjb2xvcn07XG4gIGNvbG9yOiAjZmZmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogJHsoeyBkaXJlY3Rpb24gfSkgPT4gZGlyZWN0aW9uID09PSAncnRsJyA/ICdyb3ctcmV2ZXJzZScgOiAncm93J307XG4gIFxuXG4gIC4ke0xJQl9OQU1FfS1vcHRpb24tcmVtb3ZlIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgd2lkdGg6IDIycHg7XG4gICAgaGVpZ2h0OiAyMnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAwIC01cHggMCAwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG5cbiAgICA6aG92ZXIge1xuICAgICAgY29sb3I6IHRvbWF0bztcbiAgICB9XG4gIH1cblxuICA6aG92ZXIsXG4gIDpob3ZlciA+IHNwYW4ge1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uO1xuIl19 */")),_default=Option;exports.default=_default;