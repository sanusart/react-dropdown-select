---
path: '/methods'
date: '2017-11-07'
title: 'methods'
---

| Method                         | Arguments                                                                          | Return    | Description                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| removeItem(event, item, false) | **event**: eventEmitter \| null <br/>**item**: object<br/> **closeModal**: boolean | undefined | `event` used to stop propagation                                                                               |
| dropDown('toggle')             | **string**: open\|close\|toggle                                                    | undefined | one of _open_, _close_ or _toggle_                                                                             |
| addItem(item)                  | **item**: object                                                                   | true      |                                                                                                                |
| setSearch(event)               | **event**: eventEmitter                                                            | undefined | expects to get `event` with `{ target: { value } }`                                                            |
| getInputSize()                 | -                                                                                  | number    | input character count                                                                                          |
| toggleSelectAll()              | -                                                                                  | undefined |                                                                                                                |
| clearAll()                     | -                                                                                  | undefined |                                                                                                                |
| selectAll([])                  | -                                                                                  | undefined | will select all values except disabled or a list of values provided as first parameter                         |
| isSelected(item)               | **item**: object                                                                   | boolean   |                                                                                                                |
| searchResults()                | -                                                                                  | array     | returns array of items matching `/item.label/i` regex, if `searchBy` prop is used - matches against it's value |
| selectRef()                    | -                                                                                  | DOM node  | returns DOM element of &lt;Select/&gt;                                                                         |
| getSelectBounds()              | -                                                                                  | object    | returns `getBoundingClientRect()` of &lt;Select/&gt;                                                           |
| areAllSelected()               | -                                                                                  | boolean   | returns true/false if all values (except disabled) selected                                                    |
| sortBy()                       | -                                                                                  | array     | returns sorted array of values (sort field defined by `sortBy` prop)                                           |
| safeString()                   | **string**: string                                                                 | string    | returns cleaned up (safe) string                                                                               |
