import type { Color, Country, Emoji, Person, Tag, User } from './types';

export const countryOptions: Country[] = [
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'cn', label: 'China' },
  { value: 'fi', label: 'Finland' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

export const colorOptions: Color[] = [
  { value: '#ef4444', label: 'Red' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#10b981', label: 'Emerald' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Violet' },
  { value: '#ec4899', label: 'Pink' },
];

export const userOptions: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    company: { name: 'Acme Inc' },
    role: 'admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: { name: 'Globex' },
    role: 'editor',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    company: { name: 'Initech' },
    role: 'viewer',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    company: { name: 'Umbrella Corp' },
    role: 'admin',
  },
  {
    id: 5,
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    company: { name: 'Stark Industries' },
    role: 'editor',
  },
];

export const tagOptions: Tag[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'express', label: 'Express', group: 'Backend' },
  { value: 'django', label: 'Django', group: 'Backend' },
  { value: 'rails', label: 'Rails', group: 'Backend' },
  { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
  { value: 'mongo', label: 'MongoDB', group: 'Database' },
  { value: 'redis', label: 'Redis', group: 'Database' },
];

export const largeOptions: Country[] = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}));

export const emojiOptions: Emoji[] = [
  { value: 'us', label: 'United States', emoji: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', emoji: '🇬🇧' },
  { value: 'jp', label: 'Japan', emoji: '🇯🇵' },
  { value: 'de', label: 'Germany', emoji: '🇩🇪' },
  { value: 'fr', label: 'France', emoji: '🇫🇷' },
  { value: 'br', label: 'Brazil', emoji: '🇧🇷' },
  { value: 'au', label: 'Australia', emoji: '🇦🇺' },
  { value: 'ca', label: 'Canada', emoji: '🇨🇦' },
];

export const people: Person[] = [
  { id: 1, name: 'John Doe', role: 'Engineer', color: '#6366f1' },
  { id: 2, name: 'Jane Smith', role: 'Designer', color: '#ec4899' },
  { id: 3, name: 'Bob Wilson', role: 'PM', color: '#10b981' },
  { id: 4, name: 'Alice Brown', role: 'DevOps', color: '#f59e0b' },
];
