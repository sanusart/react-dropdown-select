const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const v = require('../package.json').version;

execSync('git add -A');
execSync(`git commit -m "chore: release v${v}"`);
execSync(`git tag v${v}`);
execSync('git pull --rebase origin master');
execSync('git push && git push --tags');

const changelog = fs.readFileSync(path.join(__dirname, '../../../CHANGELOG.md'), 'utf8');
const parts = changelog.split(/\n(?=## v)/);
const entry = parts.find((p) => p.startsWith(`## v${v}`));
const upcoming = parts.find((p) => p.startsWith('## Upcoming version'));
const notes = (entry || upcoming || '').trim();

if (notes) {
  const tmp = `/tmp/rn-${v}.md`;
  fs.writeFileSync(tmp, notes);
  execSync(`gh release create v${v} --notes-file ${tmp}`, { stdio: 'inherit' });
  fs.unlinkSync(tmp);
}
