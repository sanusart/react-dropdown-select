import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './demo-styles.css';

import Select from '../../src';

const options = [
  {
    value: 'Canis lupus lycaon',
    label: 'Wolf, timber',
    customProperty: 'Violet'
  },
  {
    value: 'Corvus brachyrhynchos',
    label: 'Crow, house',
    customProperty: 'Fuscia'
  },
  {
    value: 'Colaptes campestroides',
    label: 'Campo flicker',
    customProperty: 'Orange'
  },
  {
    value: 'Ammospermophilus nelsoni',
    label: 'Squirrel, antelope ground',
    customProperty: 'Puce'
  },
  {
    value: 'Paradoxurus hermaphroditus',
    label: 'Cat, toddy',
    customProperty: 'Violet'
  },
  {
    value: 'Mirounga angustirostris',
    label: 'Northern elephant seal',
    customProperty: 'Teal'
  },
  {
    value: 'Catharacta skua',
    label: 'Skua, great',
    customProperty: 'Purple'
  },
  {
    value: 'Colobus guerza',
    label: 'Colobus, white-mantled',
    customProperty: 'Orange'
  },
  {
    value: 'Orcinus orca',
    label: 'Orca',
    customProperty: 'Crimson'
  },
  {
    value: 'Isoodon obesulus',
    label: 'Southern brown bandicoot',
    customProperty: 'Teal'
  },
  {
    value: 'Bison bison',
    label: 'Bison, american',
    customProperty: 'Turquoise'
  },
  {
    value: 'Ciconia ciconia',
    label: 'Stork, european',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Ardea cinerea',
    label: 'Gray heron',
    customProperty: 'Pink'
  },
  {
    value: 'Leprocaulinus vipera',
    label: 'Insect, stick',
    customProperty: 'Mauv'
  },
  {
    value: 'Phalaropus lobatus',
    label: 'Phalarope, red-necked',
    customProperty: 'Red'
  },
  {
    value: 'Streptopelia decipiens',
    label: 'Dove, mourning collared',
    customProperty: 'Red'
  },
  {
    value: 'Petaurus breviceps',
    label: 'Glider, sugar',
    customProperty: 'Purple'
  },
  {
    value: 'Panthera onca',
    label: 'Jaguar',
    customProperty: 'Mauv'
  },
  {
    value: 'Cercopithecus aethiops',
    label: 'Vervet monkey',
    customProperty: 'Indigo'
  },
  {
    value: 'Spilogale gracilis',
    label: 'Western spotted skunk',
    customProperty: 'Puce'
  },
  {
    value: 'Threskionis aethiopicus',
    label: 'Sacred ibis',
    customProperty: 'Green'
  },
  {
    value: 'Bettongia penicillata',
    label: 'Brush-tailed rat kangaroo',
    customProperty: 'Crimson'
  },
  {
    value: 'Grus antigone',
    label: 'Sarus crane',
    customProperty: 'Green'
  },
  {
    value: 'Haliaeetus leucoryphus',
    label: 'Pallas\'s fish eagle',
    customProperty: 'Maroon'
  },
  {
    value: 'Zalophus californicus',
    label: 'California sea lion',
    customProperty: 'Aquamarine'
  },
  {
    value: 'Lepus arcticus',
    label: 'Arctic hare',
    customProperty: 'Violet'
  },
  {
    value: 'Capreolus capreolus',
    label: 'Deer, roe',
    customProperty: 'Teal'
  },
  {
    value: 'Carduelis pinus',
    label: 'Siskin, pine',
    customProperty: 'Aquamarine'
  },
  {
    value: 'Himantopus himantopus',
    label: 'Stilt, black-winged',
    customProperty: 'Aquamarine'
  },
  {
    value: 'Lepus arcticus',
    label: 'Arctic hare',
    customProperty: 'Red'
  },
  {
    value: 'Bubalus arnee',
    label: 'Wild water buffalo',
    customProperty: 'Khaki'
  },
  {
    value: 'Hystrix cristata',
    label: 'Crested porcupine',
    customProperty: 'Indigo'
  },
  {
    value: 'Dasyurus viverrinus',
    label: 'Cat, native',
    customProperty: 'Aquamarine'
  },
  {
    value: 'Bubalornis niger',
    label: 'Red-billed buffalo weaver',
    customProperty: 'Blue'
  },
  {
    value: 'Junonia genoveua',
    label: 'Tropical buckeye butterfly',
    customProperty: 'Yellow'
  },
  {
    value: 'Sceloporus magister',
    label: 'Lizard, desert spiny',
    customProperty: 'Puce'
  },
  {
    value: 'Anas bahamensis',
    label: 'Pintail, bahama',
    customProperty: 'Green'
  },
  {
    value: 'Uraeginthus granatina',
    label: 'Grenadier, common',
    customProperty: 'Pink'
  },
  {
    value: 'Dendrocygna viduata',
    label: 'White-faced whistling duck',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Falco mexicanus',
    label: 'Prairie falcon',
    customProperty: 'Purple'
  },
  {
    value: 'Ceryle rudis',
    label: 'Kingfisher, pied',
    customProperty: 'Blue'
  },
  {
    value: 'Rhea americana',
    label: 'Rhea, common',
    customProperty: 'Puce'
  },
  {
    value: 'Colaptes campestroides',
    label: 'Campo flicker',
    customProperty: 'Maroon'
  },
  {
    value: 'Tachyglossus aculeatus',
    label: 'Australian spiny anteater',
    customProperty: 'Puce'
  },
  {
    value: 'Lorythaixoides concolor',
    label: 'Lourie, grey',
    customProperty: 'Fuscia'
  },
  {
    value: 'Castor canadensis',
    label: 'Beaver, north american',
    customProperty: 'Crimson'
  },
  {
    value: 'Cynictis penicillata',
    label: 'Red meerkat',
    customProperty: 'Green'
  },
  {
    value: 'Plectopterus gambensis',
    label: 'Spur-winged goose',
    customProperty: 'Pink'
  },
  {
    value: 'Francolinus swainsonii',
    label: 'Swainson\'s francolin',
    customProperty: 'Green'
  },
  {
    value: 'Odocoileus hemionus',
    label: 'Deer, black-tailed',
    customProperty: 'Blue'
  },
  {
    value: 'Delphinus delphis',
    label: 'Dolphin, common',
    customProperty: 'Khaki'
  },
  {
    value: 'Propithecus verreauxi',
    label: 'Sifaka, verreaux\'s',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Dicrostonyx groenlandicus',
    label: 'Arctic lemming',
    customProperty: 'Khaki'
  },
  {
    value: 'Fregata magnificans',
    label: 'Magnificent frigate bird',
    customProperty: 'Mauv'
  },
  {
    value: 'Balearica pavonina',
    label: 'Black-crowned crane',
    customProperty: 'Pink'
  },
  {
    value: 'Anathana ellioti',
    label: 'Shrew, mandras tree',
    customProperty: 'Crimson'
  },
  {
    value: 'Geococcyx californianus',
    label: 'Greater roadrunner',
    customProperty: 'Turquoise'
  },
  {
    value: 'Marmota flaviventris',
    label: 'Yellow-bellied marmot',
    customProperty: 'Red'
  },
  {
    value: 'Felis concolor',
    label: 'Puma',
    customProperty: 'Red'
  },
  {
    value: 'Tenrec ecaudatus',
    label: 'Tailless tenrec',
    customProperty: 'Khaki'
  },
  {
    value: 'Pterocles gutturalis',
    label: 'Sandgrouse, yellow-throated',
    customProperty: 'Yellow'
  },
  {
    value: 'Pycnonotus nigricans',
    label: 'Bulbul, african red-eyed',
    customProperty: 'Aquamarine'
  },
  {
    value: 'Castor fiber',
    label: 'Beaver, eurasian',
    customProperty: 'Maroon'
  },
  {
    value: 'Macropus parryi',
    label: 'Wallaby, whip-tailed',
    customProperty: 'Mauv'
  },
  {
    value: 'Melanerpes erythrocephalus',
    label: 'Red-headed woodpecker',
    customProperty: 'Indigo'
  },
  {
    value: 'Ephippiorhynchus mycteria',
    label: 'Black-necked stork',
    customProperty: 'Purple'
  },
  {
    value: 'Ploceus rubiginosus',
    label: 'Weaver, chestnut',
    customProperty: 'Puce'
  },
  {
    value: 'unavailable',
    label: 'South American meadowlark (unidentified)',
    customProperty: 'Purple'
  },
  {
    value: 'Heloderma horridum',
    label: 'Monster, gila',
    customProperty: 'Maroon'
  },
  {
    value: 'Gazella granti',
    label: 'Gazelle, grant\'s',
    customProperty: 'Khaki'
  },
  {
    value: 'Nesomimus trifasciatus',
    label: 'Mockingbird, galapagos',
    customProperty: 'Indigo'
  },
  {
    value: 'Vulpes vulpes',
    label: 'Asian red fox',
    customProperty: 'Khaki'
  },
  {
    value: 'Vulpes vulpes',
    label: 'Fox, north american red',
    customProperty: 'Pink'
  },
  {
    value: 'Butorides striatus',
    label: 'Green heron',
    customProperty: 'Pink'
  },
  {
    value: 'Ursus americanus',
    label: 'Black bear',
    customProperty: 'Indigo'
  },
  {
    value: 'Macropus fuliginosus',
    label: 'Black-faced kangaroo',
    customProperty: 'Maroon'
  },
  {
    value: 'Alopex lagopus',
    label: 'Blue fox',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Otocyon megalotis',
    label: 'Bat-eared fox',
    customProperty: 'Yellow'
  },
  {
    value: 'Eolophus roseicapillus',
    label: 'Roseate cockatoo',
    customProperty: 'Pink'
  },
  {
    value: 'Mungos mungo',
    label: 'Banded mongoose',
    customProperty: 'Violet'
  },
  {
    value: 'unavailable',
    label: 'Mudskipper (unidentified)',
    customProperty: 'Red'
  },
  {
    value: 'Funambulus pennati',
    label: 'Palm squirrel',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Canis mesomelas',
    label: 'Silver-backed jackal',
    customProperty: 'Turquoise'
  },
  {
    value: 'Equus hemionus',
    label: 'Ass, asiatic wild',
    customProperty: 'Turquoise'
  },
  {
    value: 'Stenella coeruleoalba',
    label: 'Striped dolphin',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Butorides striatus',
    label: 'Heron, green',
    customProperty: 'Khaki'
  },
  {
    value: 'Cracticus nigroagularis',
    label: 'Black-throated butcher bird',
    customProperty: 'Violet'
  },
  {
    value: 'Falco peregrinus',
    label: 'Falcon, peregrine',
    customProperty: 'Pink'
  },
  {
    value: 'Felis concolor',
    label: 'Mountain lion',
    customProperty: 'Indigo'
  },
  {
    value: 'Ara ararauna',
    label: 'Blue and yellow macaw',
    customProperty: 'Indigo'
  },
  {
    value: 'Felis chaus',
    label: 'Jungle cat',
    customProperty: 'Yellow'
  },
  {
    value: 'Ephippiorhynchus mycteria',
    label: 'Stork, jabiru',
    customProperty: 'Goldenrod'
  },
  {
    value: 'Charadrius tricollaris',
    label: 'Plover, three-banded',
    customProperty: 'Khaki'
  },
  {
    value: 'Vulpes chama',
    label: 'Cape fox',
    customProperty: 'Green'
  },
  {
    value: 'Papio cynocephalus',
    label: 'Olive baboon',
    customProperty: 'Aquamarine'
  },
  {
    value: 'unavailable',
    label: 'Red-winged hawk (unidentified)',
    customProperty: 'Khaki'
  },
  {
    value: 'Macaca mulatta',
    label: 'Rhesus monkey',
    customProperty: 'Red'
  },
  {
    value: 'unavailable',
    label: 'Mudskipper (unidentified)',
    customProperty: 'Green'
  },
  {
    value: 'Thamnolaea cinnmomeiventris',
    label: 'Mocking cliffchat',
    customProperty: 'Crimson'
  },
  {
    value: 'Tiliqua scincoides',
    label: 'Blue-tongued lizard',
    customProperty: 'Pink'
  }
];

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multi: true,
      disabled: false,
      loading: false,
      contentRenderer: false,
      dropdownRenderer: false,
      selectValues: [],
      searchBy: 'label',
      clearable: true,
      separator: true,
      forceOpen: false,
      handle: true
    };
  }

  setValues = (selectValues) => this.setState({ selectValues });

  contentRenderer = (innerProps, innerState) => {
    return (
      <div>
        {innerState.values.length} of {innerState.options.length} Selected
      </div>
    );
  };

  dropdownRenderer = (props, state, methods) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div>
        <input
          type="text"
          size={methods.getInputSize}
          value={state.search}
          onChange={methods.setSearch}
          placeholder="Type anything"
        />
        <button onClick={() => methods.toggleSelectAll()}>
          {state.values.length === 0 ? 'Select all' : 'Clear all'}
        </button>
        {state.options
          .filter((item) => regexp.test(item[props.searchBy] || item.label))
          .map((option) => (
            <div className="sa-select-item" onClick={() => methods.addItem(option)}>
              <input
                type="checkbox"
                onChange={() => methods.addItem(option)}
                checked={state.values.indexOf(option) !== -1}
              />
              {option.label}
            </div>
          ))}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <p>
            react-dropdown-select demo |{' '}
            <a href="https://github.com/sanusart/react-dropdown-select">GitHub</a>
          </p>

          <Select
            placeholder="Sasha's family members"
            addPlaceholder="+ click to add"
            disabled={this.state.disabled}
            loading={this.state.loading}
            searchBy={this.state.searchBy}
            separator={this.state.separator}
            clearable={this.state.clearable}
            forceOpen={this.state.forceOpen}
            handle={this.state.handle}
            multi={this.state.multi}
            values={[options[0]]}
            options={options}
            onDropdownOpen={() => undefined}
            onDropdownClose={() => undefined}
            onChange={(values) => this.setValues(values)}
            noDataRenderer="No matches found"
            contentRenderer={
              this.state.contentRenderer
                ? (innerProps, innerState) => this.contentRenderer(innerProps, innerState)
                : undefined
            }
            dropdownRenderer={
              this.state.dropdownRenderer
                ? (innerProps, innerState, innerMethods) =>
                    this.dropdownRenderer(innerProps, innerState, innerMethods)
                : undefined
            }
          />
        </div>

        <p>
          <input
            type="checkbox"
            checked={this.state.multi}
            onChange={() =>
              this.setState({
                multi: !this.state.multi
              })
            }
          />{' '}
          Multi
          <br />
          <input
            type="checkbox"
            checked={this.state.disabled}
            onChange={() =>
              this.setState({
                disabled: !this.state.disabled
              })
            }
          />{' '}
          Disabled
          <br />
          <input
            type="checkbox"
            checked={this.state.loading}
            onChange={() =>
              this.setState({
                loading: !this.state.loading
              })
            }
          />{' '}
          Loading
          <br />
          <input
            type="checkbox"
            checked={this.state.clearable}
            onChange={() =>
              this.setState({
                clearable: !this.state.clearable
              })
            }
          />{' '}
          Clearable
          <br />
          <input
            type="checkbox"
            checked={this.state.separator}
            onChange={() =>
              this.setState({
                separator: !this.state.separator
              })
            }
          />{' '}
          Separator
          <br />
          <input
            type="checkbox"
            checked={this.state.handle}
            onChange={() =>
              this.setState({
                handle: !this.state.handle
              })
            }
          />{' '}
          Dropdown handle
          <br />
          <input
            type="checkbox"
            checked={this.state.forceOpen}
            onChange={() =>
              this.setState({
                forceOpen: !this.state.forceOpen
              })
            }
          />{' '}
          Stay open
          <br />
          <input
            type="checkbox"
            checked={this.state.contentRenderer}
            onChange={() =>
              this.setState({
                contentRenderer: !this.state.contentRenderer
              })
            }
          />{' '}
          Custom content renderer
          <br />
          <input
            type="checkbox"
            checked={this.state.dropdownRenderer}
            onChange={() =>
              this.setState({
                dropdownRenderer: !this.state.dropdownRenderer
              })
            }
          />{' '}
          Custom dropdown renderer
          <br />
          Search by field:{' '}
          <select
            selected={this.state.searchBy}
            onChange={(searchBy) =>
              this.setState({
                searchBy
              })
            }>
            <option value="label">label</option>
            <option value="customProperty">customProperty</option>
          </select>
        </p>

        <p>Current value(s):</p>
        <pre>{JSON.stringify(this.state.selectValues, false, 2)}</pre>

        <p>
          I am text, I am text, I am text, I am text, I am text, I am text, I am text, I am text, I
          am text, I am text, I am text, I am text, I am text, I am text, I am text,{' '}
        </p>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
