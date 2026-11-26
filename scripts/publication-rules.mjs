const professionalEmails = new Set(['ian.s4ntos@gmail.com']);
const permittedExampleDomains = /^(?:example\.(?:com|org|net)|.+\.(?:invalid|test))$/i;

export function blockedPublicationPath(path) {
  const name = path.replaceAll('\\','/').split('/').pop();
  return /^\.env(?:\.|$)/i.test(name) || /\.(?:pem|key|p12|pfx|log)$/i.test(name) || /^(?:vitest|test-results|playwright-report)(?:[-_.]|$).*\.json$/i.test(name);
}

export function scanPublicationText(source) {
  const issues = [];
  const add = (rule, index) => {
    const line = source.slice(0,index).split('\n').length;
    if (!issues.some(item => item.rule === rule && item.line === line)) issues.push({rule,line});
  };
  const patterns = [
    ['credential', /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|sb_secret_[A-Za-z0-9_-]{15,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|AKIA[A-Z0-9]{16})\b/g],
    ['private_key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
    ['jwt', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g],
    ['identity_number', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g],
    ['phone', /(?<![\w])(?:\+55[ .-]?)?\(?[1-9]\d\)?[ .-]?(?:9\d{4}|\d{4})[- ]\d{4}(?![\w])/g],
    ['local_path', /file:\/\/\/|\b[A-Z]:[\\/](?:Users|IA|Backup)[\\/]/g],
    ['credential_url', /https?:\/\/[^\s/:@]+:[^\s/@]+@/g]
  ];
  for (const [rule, pattern] of patterns) for (const match of source.matchAll(pattern)) add(rule,match.index);
  for (const match of source.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)) {
    const email = match[0].toLowerCase();
    if (!professionalEmails.has(email) && !permittedExampleDomains.test(email.split('@')[1])) add('unapproved_email',match.index);
  }
  return issues;
}
