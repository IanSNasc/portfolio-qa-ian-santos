import test from 'node:test';
import assert from 'node:assert/strict';
import {scanPublicationText,blockedPublicationPath} from '../scripts/publication-rules.mjs';

test('identifica credenciais sem devolver seus valores', () => {
  const values = [
    'ghp_'+'A'.repeat(36), 'github_pat_'+'B'.repeat(50),
    'sb_secret_'+'C'.repeat(30), 'sk-'+'D'.repeat(35),
    'AKIA'+'E'.repeat(16),
    '-----BEGIN '+'PRIVATE KEY-----',
    'eyJ'+'F'.repeat(20)+'.'+'G'.repeat(20)+'.'+'H'.repeat(20)
  ];
  for (const value of values) {
    const findings = scanPublicationText('cabeçalho\n'+value);
    assert.equal(findings.length,1);
    assert.equal(findings[0].line,2);
    assert.equal(JSON.stringify(findings).includes(value),false);
    assert.deepEqual(Object.keys(findings[0]).sort(),['line','rule']);
  }
});
test('sinaliza documentos, telefone e e-mail fora da política', () => {
  const document = ['123','456','789'].join('.')+'-00';
  const company = '12.'+'345.678/'+'0001-00';
  const phone = '(71) '+'90000'+'-0000';
  const email = 'pessoa@'+'dominio-real.com';
  assert.equal(scanPublicationText(document)[0].rule,'identity_number');
  assert.equal(scanPublicationText(company)[0].rule,'identity_number');
  assert.equal(scanPublicationText(phone)[0].rule,'phone');
  assert.equal(scanPublicationText(email)[0].rule,'unapproved_email');
});
test('preserva contato profissional e exemplos explicitamente permitidos', () => {
  const source = ['ian.s4ntos@gmail.com','a@example.invalid','teste@example.com','pessoa@fixture.test'].join('\n');
  assert.deepEqual(scanPublicationText(source),[]);
});
test('sinaliza caminhos privados e credenciais embutidas em URL', () => {
  const windowsPath = 'D:'+String.fromCharCode(47)+'IA'+String.fromCharCode(47)+'projeto';
  const localUrl = 'file:'+String.fromCharCode(47).repeat(3)+'privado';
  const url = 'https:'+'//login'+':senha'+'@host.example';
  assert.equal(scanPublicationText(windowsPath)[0].rule,'local_path');
  assert.equal(scanPublicationText(localUrl)[0].rule,'local_path');
  assert.ok(scanPublicationText(url).some(item=>item.rule==='credential_url'));
});
test('não confunde commits, datas e referências públicas com credenciais', () => {
  assert.deepEqual(scanPublicationText('303c81c5f47663455868b71defe7a3d44f019dcc\n25/11/2026\nhttps://github.com/IanSNasc\n14 aprovados e 1 falha'),[]);
});
test('bloqueia arquivos de ambiente, chaves e relatórios brutos', () => {
  for (const file of ['.env','.env.local','private.pem','chave.key','execucao.log','vitest-results.json']) assert.equal(blockedPublicationPath(file),true);
  for (const file of ['docs/casos/condosphere/evidencias.json','README.md','docs/cv/curriculo.pdf']) assert.equal(blockedPublicationPath(file),false);
});
