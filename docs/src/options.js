const FIRST_NAMES = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah', 'Sophia', 'James',
  'Isabella', 'William', 'Mia', 'Benjamin', 'Charlotte', 'Lucas', 'Amelia',
  'Henry', 'Harper', 'Alexander', 'Evelyn', 'Michael', 'Abigail', 'Daniel',
  'Emily', 'Matthew', 'Ella', 'Joseph', 'Elizabeth', 'Sebastian', 'Camila',
  'David', 'Luna', 'Carter', 'Sofia', 'Wyatt', 'Avery', 'John', 'Mila',
  'Jack', 'Eleanor', 'Luke', 'Scarlett', 'Jayden', 'Penelope', 'Dylan',
  'Aria', 'Grayson', 'Chloe', 'Levi', 'Layla', 'Isaac'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts'
];

const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'Austin', 'Seattle', 'Denver',
  'Boston', 'Nashville', 'Portland', 'Las Vegas', 'Miami', 'Atlanta'
];

let seed = 42;

function seededRandom() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function pick(arr) {
  return arr[Math.floor(seededRandom() * arr.length)];
}

function generateId(index) {
  return `opt-${String(index).padStart(3, '0')}`;
}

export const options = Array.from({ length: 30 }, (_, i) => ({
  id: generateId(i),
  name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
  username: `${pick(FIRST_NAMES).toLowerCase()}${Math.floor(seededRandom() * 999)}`,
  email: `${pick(FIRST_NAMES).toLowerCase()}@example.com`,
  address: {
    street: `${Math.floor(seededRandom() * 9999)} ${pick(LAST_NAMES)} St`,
    suite: Math.floor(seededRandom() * 200) + 1,
    city: pick(CITIES),
    zipcode: String(Math.floor(seededRandom() * 90000) + 10000),
    geo: {
      lat: (seededRandom() * 180 - 90).toFixed(6),
      lng: (seededRandom() * 360 - 180).toFixed(6)
    }
  },
  phone: `${Math.floor(seededRandom() * 900) + 100}-${Math.floor(seededRandom() * 900) + 100}-${Math.floor(seededRandom() * 9000) + 1000}`,
  website: `${pick(FIRST_NAMES).toLowerCase()}.example.com`,
  company: {
    name: `${pick(LAST_NAMES)} ${pick(['Inc', 'LLC', 'Corp', 'Co'])}`,
    catchPhrase: `${pick(['synergize', 'maximize', 'leverage', 'streamline'])} ${pick(['cross-platform', 'enterprise', 'next-generation', 'wireless'])} ${pick(['solutions', 'systems', 'paradigms', 'architectures'])}`,
    bs: `${pick(['implement', 'empower', 'enable', 'aggregate'])} ${pick(['cutting-edge', '24/7', 'magnetic', 'front-end'])} ${pick(['web-readiness', 'e-services', 'channels', 'interfaces'])}`
  }
}));

export const optionsBase = (count = 30) =>
  Array.from({ length: count }, (_, i) => ({
    value: generateId(i),
    label: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`
  }));

export const optionsSimple = (count = 30) =>
  Array.from({ length: count }, (_, i) => ({
    id: generateId(i),
    name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`
  }));
