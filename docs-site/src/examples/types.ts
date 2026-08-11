export interface Country {
  value: string;
  label: string;
}

export interface Color {
  value: string;
  label: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  role: string;
}

export interface Tag {
  value: string;
  label: string;
  group: string;
}

export interface Emoji {
  value: string;
  label: string;
  emoji: string;
}

export interface Person {
  id: number;
  name: string;
  role: string;
  color: string;
}
