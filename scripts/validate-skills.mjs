import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const requiredSkillKeys = [
  'name',
  'description',
  'risk',
  'universal',
  'source',
  'date_added',
];
const requiredSkillHeadings = [
  '# 1. Skill Description',
  '# 2. Skill Objective',
  '# 3. Inputs / Entradas',
  '# 4. Outputs / Salidas',
  '# 5. Execution Steps',
  '# 6. Example Usage (Prompt)',
  '# 7. Recommended File Structure / Estructura Recomendada',
];
const editorialArtifactPatterns = [
  /\*\((?:Let me|Rewriting|I will|Wait,|Sigh|Done|Cleaning this|Skip the adverbs|Wow, fixing this)/i,
  /\b(?:Rewriting prompt|Manually rewriting|Ignoring adverb spam|I will write pure text)\b/i,
];
const allowedRiskValues = new Set(['low', 'medium', 'high']);
const ignoredDirectories = new Set(['.git', 'node_modules']);
const errors = [];
const warnings = [];
const files = [];

walk(rootDir);

const markdownFiles = files.filter((file) => file.endsWith('.md'));
const skillFiles = markdownFiles.filter((file) => path.basename(file) === 'SKILL.md');
const jsonFiles = files.filter((file) => file.endsWith('.json'));

if (skillFiles.length !== 25) {
  errors.push(`Expected 25 SKILL.md files but found ${skillFiles.length}.`);
}

for (const file of skillFiles) {
  validateSkill(file);
}

for (const file of markdownFiles) {
  validateMarkdownLinks(file);
}

for (const file of jsonFiles) {
  validateJson(file);
}

if (warnings.length > 0) {
  console.warn('Warnings:');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
  console.warn('');
}

if (errors.length > 0) {
  console.error('Validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${skillFiles.length} skills, ${markdownFiles.length} markdown files, and ${jsonFiles.length} JSON files.`);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    files.push(fullPath);
  }
}

function validateSkill(file) {
  const rel = toRel(file);
  const text = fs.readFileSync(file, 'utf8');
  const frontmatter = extractFrontmatter(text);

  if (!frontmatter) {
    errors.push(`${rel}: missing or malformed front matter.`);
    return;
  }

  for (const pattern of editorialArtifactPatterns) {
    if (pattern.test(text)) {
      errors.push(`${rel}: contains editorial artifact text that should not be published.`);
      break;
    }
  }

  for (const key of requiredSkillKeys) {
    if (!(key in frontmatter.data)) {
      errors.push(`${rel}: missing front matter key "${key}".`);
    }
  }

  if (frontmatter.duplicates.length > 0) {
    errors.push(`${rel}: duplicate front matter keys found (${frontmatter.duplicates.join(', ')}).`);
  }

  if (frontmatter.data.risk && !allowedRiskValues.has(frontmatter.data.risk)) {
    errors.push(`${rel}: risk must be one of low, medium, or high.`);
  }

  if (frontmatter.data.universal && !['true', 'false'].includes(frontmatter.data.universal)) {
    errors.push(`${rel}: universal must be "true" or "false".`);
  }

  if (frontmatter.data.date_added && !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.data.date_added)) {
    errors.push(`${rel}: date_added must use YYYY-MM-DD format.`);
  }

  for (const heading of requiredSkillHeadings) {
    if (!text.includes(heading)) {
      errors.push(`${rel}: missing required heading "${heading}".`);
    }
  }
}

function validateMarkdownLinks(file) {
  const rel = toRel(file);
  const text = fs.readFileSync(file, 'utf8');
  const linkPattern = /\[[^\]]+\]\((?!https?:\/\/|mailto:|#)([^)]+)\)/g;

  for (const match of text.matchAll(linkPattern)) {
    const rawTarget = match[1].split('#')[0];
    const target = rawTarget.trim();
    const resolved = path.resolve(path.dirname(file), target);

    if (!fs.existsSync(resolved)) {
      errors.push(`${rel}: broken relative link "${match[1]}".`);
    }
  }
}

function validateJson(file) {
  const rel = toRel(file);
  const text = fs.readFileSync(file, 'utf8');

  try {
    JSON.parse(text);
  } catch (error) {
    errors.push(`${rel}: invalid JSON (${error.message}).`);
  }
}

function extractFrontmatter(text) {
  const normalized = text.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) {
    return null;
  }

  const data = {};
  const duplicates = [];
  const lines = match[1].split('\n').filter(Boolean);

  for (const line of lines) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      errors.push(`Front matter line "${line}" is malformed.`);
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (key in data) {
      duplicates.push(key);
    }

    data[key] = value;
  }

  return { data, duplicates };
}

function toRel(file) {
  return path.relative(rootDir, file).replace(/\\/g, '/');
}
