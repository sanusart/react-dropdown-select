export interface SelectPropDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
  category?: string;
  receives?: string;
  replaces?: string;
}

interface JsDoc {
  description: string;
  default?: string;
  category?: string;
  receives?: string;
  replaces?: string;
}

function parseJsDoc(block: string): JsDoc {
  const lines = block
    .replace(/^\/\*\*?/, '')
    .replace(/\*\/\s*$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim());

  const description: string[] = [];
  let def: string | undefined;
  let category: string | undefined;
  let receives: string | undefined;
  let replaces: string | undefined;

  for (const line of lines) {
    if (line.startsWith('@default')) {
      def = line.replace(/^@default\s*/, '').trim();
    } else if (line.startsWith('@category')) {
      category = line.replace(/^@category\s*/, '').trim();
    } else if (line.startsWith('@receives')) {
      receives = line.replace(/^@receives\s*/, '').trim();
    } else if (line.startsWith('@replaces')) {
      replaces = line.replace(/^@replaces\s*/, '').trim();
    } else if (line) {
      description.push(line);
    }
  }

  return {
    description: description.join(' ').trim(),
    default: def || undefined,
    category,
    receives,
    replaces,
  };
}

function buildProp(memberText: string, comment: string): SelectPropDoc | null {
  const colonIdx = memberText.indexOf(':');
  if (colonIdx === -1) return null;

  const namePart = memberText.slice(0, colonIdx).trim();
  const required = !namePart.endsWith('?');
  const name = required ? namePart : namePart.slice(0, -1);

  const jsdoc = parseJsDoc(comment);

  return {
    name,
    type: memberText
      .slice(colonIdx + 1)
      .replace(/;\s*$/, '')
      .trim(),
    required,
    description: jsdoc.description,
    default: jsdoc.default,
    category: jsdoc.category,
    receives: jsdoc.receives,
    replaces: jsdoc.replaces,
  };
}

/**
 * Parses an interface declaration and its JSDoc (description, `@default`,
 * `@category`, `@receives`, `@replaces`) out of the raw source text.
 */
export function parseInterface(source: string, interfaceName: string): SelectPropDoc[] {
  const interfaceIdx = source.indexOf(`interface ${interfaceName}`);
  if (interfaceIdx === -1) return [];

  const openBrace = source.indexOf('{', interfaceIdx);
  if (openBrace === -1) return [];

  const props: SelectPropDoc[] = [];
  let i = openBrace + 1;
  let interfaceDepth = 1;
  let pendingComment = '';

  const isWhitespace = (ch: string) => /\s/.test(ch);

  while (i < source.length && interfaceDepth > 0) {
    while (i < source.length && isWhitespace(source[i])) i++;
    if (i >= source.length) break;

    if (source[i] === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      const block = source.slice(i, end + 2);
      pendingComment = block.startsWith('/**') ? block : '';
      i = end + 2;
      continue;
    }

    if (source[i] === '}') {
      interfaceDepth--;
      i++;
      continue;
    }

    const memberStart = i;
    let paren = 0;
    let bracket = 0;
    let brace = 0;
    let inString: string | null = null;
    let inLineComment = false;
    let inBlockComment = false;

    while (i < source.length) {
      const ch = source[i];
      const next = source[i + 1];

      if (inLineComment) {
        if (ch === '\n') inLineComment = false;
        i++;
        continue;
      }
      if (inBlockComment) {
        if (ch === '*' && next === '/') {
          inBlockComment = false;
          i += 2;
        } else {
          i++;
        }
        continue;
      }
      if (inString) {
        if (ch === '\\') {
          i += 2;
        } else if (ch === inString) {
          inString = null;
          i++;
        } else {
          i++;
        }
        continue;
      }
      if (ch === '/' && next === '/') {
        inLineComment = true;
        i += 2;
        continue;
      }
      if (ch === '/' && next === '*') {
        inBlockComment = true;
        i += 2;
        continue;
      }
      if (ch === "'" || ch === '"' || ch === '`') {
        inString = ch;
        i++;
        continue;
      }
      if (ch === '(') {
        paren++;
        i++;
        continue;
      }
      if (ch === ')') {
        paren--;
        i++;
        continue;
      }
      if (ch === '[') {
        bracket++;
        i++;
        continue;
      }
      if (ch === ']') {
        bracket--;
        i++;
        continue;
      }
      if (ch === '{') {
        brace++;
        i++;
        continue;
      }
      if (ch === '}') {
        brace--;
        i++;
        continue;
      }
      if (ch === ';' && paren === 0 && bracket === 0 && brace === 0) {
        i++;
        break;
      }
      i++;
    }

    const memberText = source.slice(memberStart, i).replace(/\s+/g, ' ').trim();
    if (memberText) {
      const prop = buildProp(memberText, pendingComment);
      if (prop) props.push(prop);
    }
    pendingComment = '';
  }

  return props;
}

const LIB_NAME = 'react-dropdown-select';

/**
 * Extracts every `${LIB_NAME}-suffix` selector from the raw `styles.ts` source,
 * so the CSS-class table always mirrors the actual stylesheet.
 */
export function parseCssClasses(source: string): string[] {
  const selector = /\.\$\{LIB_NAME\}-([a-zA-Z0-9-]+)/g;
  const classes = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = selector.exec(source)) !== null) {
    classes.add(`${LIB_NAME}-${match[1]}`);
  }
  return Array.from(classes).sort();
}

/**
 * Parses `SelectProps<T>` and its JSDoc out of the raw source text.
 */
export function parseSelectProps(source: string): SelectPropDoc[] {
  return parseInterface(source, 'SelectProps');
}
