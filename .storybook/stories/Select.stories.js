import React from 'react';
import { Select } from '../../src';
import { optionsBase } from '../../docs/src/options';

const options = optionsBase(4);
const baseArgs = {
  ...Select.defaultProps,
  options,
  multi: false,
  onChange: (values) => console.log(values)
};

export default {
  title: 'react-dropdown-select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Basic select examples'
      }
    }
  }
};

export const Basic = { args: baseArgs };
export const Multi = { args: { ...baseArgs, multi: true } };
export const Disabled = {
  args: {
    ...baseArgs,
    disabled: true,
    placeholder: 'Disabled select'
  }
};

export const WithPlaceholder = {
  args: {
    ...baseArgs,
    placeholder: 'Select an option...'
  }
};

export const WithDefaultValue = {
  args: {
    ...baseArgs,
    values: [options[1]],
    placeholder: 'Preselected value'
  }
};

export const Clearable = {
  args: {
    ...baseArgs,
    clearable: true,
    placeholder: 'Clearable select'
  }
};

export const Loading = {
  args: {
    ...baseArgs,
    loading: true,
    placeholder: 'Loading...'
  }
};

export const Searchable = {
  args: {
    ...baseArgs,
    searchable: true,
    placeholder: 'Type to search...'
  }
};

export const NoDataLabel = {
  args: {
    ...baseArgs,
    options: [],
    noDataLabel: 'Nothing found',
    placeholder: 'Try searching...'
  }
};

export const SelectAll = {
  args: {
    ...baseArgs,
    multi: true,
    selectAll: true,
    selectAllLabel: 'Select everything',
    placeholder: 'Select all enabled'
  }
};

export const RTL = {
  args: {
    ...baseArgs,
    direction: 'rtl',
    placeholder: 'Right-to-left'
  }
};

export const CustomColor = {
  args: {
    ...baseArgs,
    color: '#e57373',
    placeholder: 'Custom color'
  }
};

export const DropdownTop = {
  args: {
    ...baseArgs,
    dropdownPosition: 'top',
    placeholder: 'Dropdown opens above'
  }
};

export const AutoFocus = {
  args: {
    ...baseArgs,
    autoFocus: true,
    placeholder: 'Auto focused'
  }
};

export const CustomLabelValue = {
  args: {
    ...baseArgs,
    options: [
      { label: 'Alpha', value: 'A' },
      { label: 'Beta', value: 'B' },
      { label: 'Gamma', value: 'C' }
    ],
    labelField: 'label',
    valueField: 'value',
    placeholder: 'Custom label/value'
  }
};

export const KeepOpen = {
  args: {
    ...baseArgs,
    keepOpen: true,
    multi: true,
    placeholder: 'Dropdown stays open after select'
  }
};

export const CustomNoDataRenderer = {
  args: {
    ...baseArgs,
    options: [],
    noDataRenderer: () => <div style={{ color: 'red' }}>Custom no data!</div>,
    placeholder: 'Custom no data renderer'
  }
};

export const CustomLoadingRenderer = {
  args: {
    ...baseArgs,
    loading: true,
    loadingRenderer: () => <div style={{ color: 'blue' }}>Loading custom...</div>,
    placeholder: 'Custom loading renderer'
  }
};

export const CustomDropdownRenderer = {
  args: {
    ...baseArgs,
    dropdownRenderer: ({ props }) => (
      <div style={{ padding: 10, background: '#f0f0f0' }}>
        <strong>Custom dropdown!</strong>
        <ul style={{ margin: 0, padding: 0 }}>
          {props.options.map((o, i) => (
            <li key={i}>{o.label || o.value || o}</li>
          ))}
        </ul>
      </div>
    ),
    placeholder: 'Custom dropdown renderer'
  },
  parameters: {
    docs: {
      source: {
        code: `<Select {...args} dropdownRenderer={({ props }) => (
  <div style={{ padding: 10, background: '#f0f0f0' }}>
    <strong>Custom dropdown!</strong>
    <ul style={{ margin: 0, padding: 0 }}>
      {props.options.map((o, i) => (
        <li key={i}>{o.label || o.value || o}</li>
      ))}
    </ul>
  </div>
)} placeholder="Custom dropdown renderer" />`
      }
    }
  }
};

export const CustomItemRenderer = {
  args: {
    ...baseArgs,
    itemRenderer: ({ item }) => (
      <div style={{ fontWeight: 'bold' }}>{item.label || item.value || item}</div>
    ),
    placeholder: 'Custom item renderer'
  }
};

export const CreateNew = {
  args: {
    ...baseArgs,
    create: true,
    searchable: true,
    createNewLabel: 'Add new value',
    placeholder: 'Type to add new option'
  }
};

export const Separator = {
  args: {
    ...baseArgs,
    separator: true,
    placeholder: 'With separator'
  }
};

export const DebounceDelay = {
  args: {
    ...baseArgs,
    searchable: true,
    debounceDelay: 1000,
    placeholder: 'Debounced search (1s)'
  }
};

export const DropdownHeight = {
  args: {
    ...baseArgs,
    dropdownHeight: '60px',
    placeholder: 'Dropdown height 60px'
  }
};

export const Required = {
  args: {
    ...baseArgs,
    required: true,
    placeholder: 'Required select'
  }
};

export const Pattern = {
  args: {
    ...baseArgs,
    pattern: '[A-Za-z]{3,}',
    placeholder: 'Pattern: at least 3 letters'
  }
};

export const CloseOnSelect = {
  args: {
    ...baseArgs,
    closeOnSelect: true,
    multi: true,
    placeholder: 'Closes on select (multi)'
  }
};

export const KeepSelectedInList = {
  args: {
    ...baseArgs,
    keepSelectedInList: true,
    multi: true,
    placeholder: 'Keep selected in list (multi)'
  }
};

export const BackspaceDelete = {
  args: {
    ...baseArgs,
    multi: true,
    backspaceDelete: true,
    placeholder: 'Backspace deletes selected'
  }
};

export const DropdownHandle = {
  args: {
    ...baseArgs,
    dropdownHandle: true,
    placeholder: 'With dropdown handle'
  }
};

export const CloseOnScroll = {
  args: {
    ...baseArgs,
    closeOnScroll: true,
    placeholder: 'Closes on scroll'
  }
};

export const DropdownGap = {
  args: {
    ...baseArgs,
    dropdownGap: 30,
    placeholder: 'Dropdown gap 30px'
  }
};

export const DisabledLabel = {
  args: {
    ...baseArgs,
    disabled: true,
    disabledLabel: 'Custom disabled label',
    placeholder: 'Custom disabled label'
  }
};

export const AddPlaceholder = {
  args: {
    ...baseArgs,
    create: true,
    addPlaceholder: 'Add something new...',
    placeholder: 'Add placeholder for new items'
  }
};

export const CustomClearRenderer = {
  args: {
    ...baseArgs,
    clearable: true,
    clearRenderer: () => <span style={{ color: 'green' }}>🧹 Clear All</span>,
    placeholder: 'Custom clear renderer'
  }
};

export const CustomContentRenderer = {
  args: {
    ...baseArgs,
    contentRenderer: ({ props, state }) => (
      <div style={{ background: '#ffe0b2', padding: 8 }}>
        <strong>Custom content!</strong>
        <div>Selected: {state.values.map((v) => v.label || v.value || v).join(', ')}</div>
      </div>
    ),
    placeholder: 'Custom content renderer'
  }
};

export const CustomDropdownHandleRenderer = {
  args: {
    ...baseArgs,
    dropdownHandle: true,
    dropdownHandleRenderer: () => <span style={{ color: 'purple' }}>▼▼</span>,
    placeholder: 'Custom dropdown handle renderer'
  }
};

export const CustomInputRenderer = {
  args: {
    ...baseArgs,
    searchable: true,
    inputRenderer: ({ inputRef }) => (
      <input
        ref={inputRef}
        style={{ border: '2px solid #2196f3', padding: 4 }}
        placeholder="Custom input..."
      />
    ),
    placeholder: 'Custom input renderer'
  }
};

export const CustomOptionRenderer = {
  args: {
    ...baseArgs,
    optionRenderer: ({ item }) => (
      <div style={{ color: 'orange' }}>{item.label || item.value || item}</div>
    ),
    placeholder: 'Custom option renderer'
  }
};

export const CustomSeparatorRenderer = {
  args: {
    ...baseArgs,
    separator: true,
    separatorRenderer: () => <div style={{ borderTop: '2px dashed #aaa', margin: 4 }} />,
    placeholder: 'Custom separator renderer'
  }
};

Basic.parameters = {
  docs: {
    source: {
      code: `<Select {...args} />`
    }
  }
};

Multi.parameters = {
  docs: {
    source: {
      code: `<Select {...args} multi />`
    }
  }
};

Disabled.parameters = {
  docs: {
    source: {
      code: `<Select {...args} disabled placeholder="Disabled select" />`
    }
  }
};

WithPlaceholder.parameters = {
  docs: {
    source: {
      code: `<Select {...args} placeholder="Select an option..." />`
    }
  }
};

WithDefaultValue.parameters = {
  docs: {
    source: {
      code: `<Select {...args} values={[options[1]]} placeholder="Preselected value" />`
    }
  }
};

Clearable.parameters = {
  docs: {
    source: {
      code: `<Select {...args} clearable placeholder="Clearable select" />`
    }
  }
};

Loading.parameters = {
  docs: {
    source: {
      code: `<Select {...args} loading placeholder="Loading..." />`
    }
  }
};

Searchable.parameters = {
  docs: {
    source: {
      code: `<Select {...args} searchable placeholder="Type to search..." />`
    }
  }
};

NoDataLabel.parameters = {
  docs: {
    source: {
      code: `<Select {...args} options={[]} noDataLabel="Nothing found" placeholder="Try searching..." />`
    }
  }
};

SelectAll.parameters = {
  docs: {
    source: {
      code: `<Select {...args} multi selectAll selectAllLabel="Select everything" placeholder="Select all enabled" />`
    }
  }
};

RTL.parameters = {
  docs: {
    source: {
      code: `<Select {...args} direction="rtl" placeholder="Right-to-left" />`
    }
  }
};

CustomColor.parameters = {
  docs: {
    source: {
      code: `<Select {...args} color="#e57373" placeholder="Custom color" />`
    }
  }
};

DropdownTop.parameters = {
  docs: {
    source: {
      code: `<Select {...args} dropdownPosition="top" placeholder="Dropdown opens above" />`
    }
  }
};

AutoFocus.parameters = {
  docs: {
    source: {
      code: `<Select {...args} autoFocus placeholder="Auto focused" />`
    }
  }
};

CustomLabelValue.parameters = {
  docs: {
    source: {
      code: `<Select {...args} options={[{ label: 'Alpha', value: 'A' }, { label: 'Beta', value: 'B' }, { label: 'Gamma', value: 'C' }]} labelField="label" valueField="value" placeholder="Custom label/value" />`
    }
  }
};

KeepOpen.parameters = {
  docs: {
    source: {
      code: `<Select {...args} keepOpen multi placeholder="Dropdown stays open after select" />`
    }
  }
};

CustomNoDataRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} options={[]} noDataRenderer={() => <div style={{ color: 'red' }}>Custom no data!</div>} placeholder="Custom no data renderer" />`
    }
  }
};

CustomLoadingRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} loading loadingRenderer={() => <div style={{ color: 'blue' }}>Loading custom...</div>} placeholder="Custom loading renderer" />`
    }
  }
};

CustomDropdownRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} dropdownRenderer={({ props }) => (
  <div style={{ padding: 10, background: '#f0f0f0' }}>
    <strong>Custom dropdown!</strong>
    <ul style={{ margin: 0, padding: 0 }}>
      {props.options.map((o, i) => (
        <li key={i}>{o.label || o.value || o}</li>
      ))}
    </ul>
  </div>
)} placeholder="Custom dropdown renderer" />`
    }
  }
};

CustomItemRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} itemRenderer={({ item }) => (
  <div style={{ fontWeight: 'bold' }}>{item.label || item.value || item}</div>
)} placeholder="Custom item renderer" />`
    }
  }
};

CreateNew.parameters = {
  docs: {
    source: {
      code: `<Select {...args} create searchable createNewLabel="Add new value" placeholder="Type to add new option" />`
    }
  }
};

Separator.parameters = {
  docs: {
    source: {
      code: `<Select {...args} separator placeholder="With separator" />`
    }
  }
};

DebounceDelay.parameters = {
  docs: {
    source: {
      code: `<Select {...args} searchable debounceDelay={1000} placeholder="Debounced search (1s)" />`
    }
  }
};

DropdownHeight.parameters = {
  docs: {
    source: {
      code: `<Select {...args} dropdownHeight="60px" placeholder="Dropdown height 60px" />`
    }
  }
};

Required.parameters = {
  docs: {
    source: {
      code: `<Select {...args} required placeholder="Required select" />`
    }
  }
};

Pattern.parameters = {
  docs: {
    source: {
      code: `<Select {...args} pattern="[A-Za-z]{3,}" placeholder="Pattern: at least 3 letters" />`
    }
  }
};

CloseOnSelect.parameters = {
  docs: {
    source: {
      code: `<Select {...args} closeOnSelect multi placeholder="Closes on select (multi)" />`
    }
  }
};

KeepSelectedInList.parameters = {
  docs: {
    source: {
      code: `<Select {...args} keepSelectedInList multi placeholder="Keep selected in list (multi)" />`
    }
  }
};

BackspaceDelete.parameters = {
  docs: {
    source: {
      code: `<Select {...args} multi backspaceDelete placeholder="Backspace deletes selected" />`
    }
  }
};

DropdownHandle.parameters = {
  docs: {
    source: {
      code: `<Select {...args} dropdownHandle placeholder="With dropdown handle" />`
    }
  }
};

CloseOnScroll.parameters = {
  docs: {
    source: {
      code: `<Select {...args} closeOnScroll placeholder="Closes on scroll" />`
    }
  }
};

DropdownGap.parameters = {
  docs: {
    source: {
      code: `<Select {...args} dropdownGap={30} placeholder="Dropdown gap 30px" />`
    }
  }
};

DisabledLabel.parameters = {
  docs: {
    source: {
      code: `<Select {...args} disabled disabledLabel="Custom disabled label" placeholder="Custom disabled label" />`
    }
  }
};

AddPlaceholder.parameters = {
  docs: {
    source: {
      code: `<Select {...args} create addPlaceholder="Add something new..." placeholder="Add placeholder for new items" />`
    }
  }
};

CustomClearRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} clearable clearRenderer={() => <span style={{ color: 'green' }}>🧹 Clear All</span>} placeholder="Custom clear renderer" />`
    }
  }
};

CustomContentRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} contentRenderer={({ props, state }) => (<div style={{ background: '#ffe0b2', padding: 8 }}><strong>Custom content!</strong><div>Selected: {state.values.map((v) => v.label || v.value || v).join(', ')}</div></div>)} placeholder="Custom content renderer" />`
    }
  }
};

CustomDropdownHandleRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} dropdownHandle dropdownHandleRenderer={() => <span style={{ color: 'purple' }}>▼▼</span>} placeholder="Custom dropdown handle renderer" />`
    }
  }
};

CustomInputRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} searchable inputRenderer={({ inputRef }) => (<input ref={inputRef} style={{ border: '2px solid #2196f3', padding: 4 }} placeholder="Custom input..." />)} placeholder="Custom input renderer" />`
    }
  }
};

CustomOptionRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} optionRenderer={({ item }) => (
  <div style={{ color: 'orange' }}>{item.label || item.value || item}</div>
)} placeholder="Custom option renderer" />`
    }
  }
};

CustomSeparatorRenderer.parameters = {
  docs: {
    source: {
      code: `<Select {...args} separator separatorRenderer={() => <div style={{ borderTop: '2px dashed #aaa', margin: 4 }} />} placeholder="Custom separator renderer" />`
    }
  }
};
