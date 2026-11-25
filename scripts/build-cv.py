"""Generate the reviewed Portuguese CV; requires reportlab and a local Arial font."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path('C:/Windows/Fonts')
if (FONT_DIR / 'arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('Body', str(FONT_DIR / 'arial.ttf')))
    pdfmetrics.registerFont(TTFont('BodyBold', str(FONT_DIR / 'arialbd.ttf')))
    pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold', italic='Body', boldItalic='BodyBold')
else:
    pdfmetrics.registerFontFamily('Helvetica', normal='Helvetica', bold='Helvetica-Bold')
BODY = 'Body' if (FONT_DIR / 'arial.ttf').exists() else 'Helvetica'
BOLD = 'BodyBold' if BODY == 'Body' else 'Helvetica-Bold'
INK = colors.HexColor('#101b2d')
MUTED = colors.HexColor('#43516a')
styles = {
    'name': ParagraphStyle('name', fontName=BOLD, fontSize=25, leading=28, textColor=INK, spaceAfter=5),
    'subtitle': ParagraphStyle('subtitle', fontName=BOLD, fontSize=11, leading=15, textColor=INK, spaceAfter=6),
    'contact': ParagraphStyle('contact', fontName=BODY, fontSize=8.7, leading=12, textColor=MUTED, spaceAfter=13),
    'body': ParagraphStyle('body', fontName=BODY, fontSize=9.3, leading=13.3, textColor=INK, spaceAfter=6),
    'section': ParagraphStyle('section', fontName=BOLD, fontSize=9, leading=13, textColor=colors.HexColor('#294cc5'), spaceBefore=12, spaceAfter=7),
    'project': ParagraphStyle('project', fontName=BOLD, fontSize=10, leading=14, textColor=INK, spaceBefore=4, spaceAfter=2),
    'meta': ParagraphStyle('meta', fontName=BODY, fontSize=8.4, leading=11.5, textColor=MUTED, spaceAfter=5),
    'bullet': ParagraphStyle('bullet', fontName=BODY, fontSize=9.1, leading=12.7, textColor=INK, leftIndent=9, firstLineIndent=-8, spaceAfter=3),
}
story=[]
def p(text,style='body'): story.append(Paragraph(text,styles[style]))
def bullet(text): p('- '+text,'bullet')
p('Ian Santos','name')
p('Desenvolvimento de Software | Qualidade | Aplicações Web','subtitle')
p('Salvador, BA | <link href="mailto:ian.s4ntos@gmail.com">ian.s4ntos@gmail.com</link><br/><link href="https://github.com/IanSNasc">github.com/IanSNasc</link> | <link href="https://www.linkedin.com/in/ian-santos-qa">linkedin.com/in/ian-santos-qa</link>','contact')
p('Estudante de Engenharia de Software com projetos próprios em desenvolvimento web assistido por IA. Prática conectando interface, regras de negócio, APIs e dados, com revisão e testes nas entregas. Busco oportunidade em desenvolvimento de software, com destaque para qualidade.')
p('PROJETOS EM DESTAQUE','section')
p('CondoSphere - SaaS de gestão condominial','project')
p('Projeto pessoal com apoio de IA | React, TypeScript, Supabase, PostgreSQL, Vitest','meta')
bullet('Desenvolvimento de fluxos de unidades, moradores, portaria, reservas e comunicados, com diferentes perfis de acesso.')
bullet('Organização de componentes, hooks e services; validação de permissões e políticas RLS.')
bullet('Critérios de qualidade, testes funcionais e regressão automatizada para estados de erro, cache e troca de contexto.')
p('Foco PMBA - Organização pessoal de estudos','project')
p('Projeto pessoal | React, JavaScript, Vite, PWA, Node Test','meta')
bullet('Ciclo de estudo, prática de questões, revisões e progresso local; exportação e restauração de backup JSON.')
bullet('17 testes automatizados aprovados na execução local de 25/11/2026: domínio, filtros, respostas e preservação de dados.')
p('Klipper - Agendamento para barbearias','project')
p('Projeto de extensão | Python, Flask, Flutter, APIs REST','meta')
bullet('Desenvolvimento e análise funcional de agenda e integração; documentação de nove bugs de usabilidade, segurança e regras de negócio.')
p('EXPERIÊNCIA','section')
p('Auxiliar de Informática - Atacadão','project')
p('Abril de 2024 - atual','meta')
p('Análise e registro de incidentes, investigação de causas, monitoramento de servidores Linux e documentação de demandas. Contato entre áreas técnicas para alinhamento de soluções.')
p('BASE TÉCNICA','section')
p('<b>Desenvolvimento:</b> React, JavaScript/TypeScript, Python, SQL, APIs REST, Supabase, Git.<br/><b>Qualidade:</b> testes funcionais e exploratórios, Vitest, CodeceptJS, Postman, BDD/Gherkin e regressão. Playwright presente nos cenários do CondoSphere.')
p('FORMAÇÃO E CAPACITAÇÃO','section')
p('<b>Engenharia de Software</b> - Universidade Pitágoras Unopar Anhanguera (EAD)<br/>2024-2027 | Em andamento.<br/><b>QA Starter &amp; QA API</b> - QAzando | Certificação por módulo concluído.<br/><b>Inglês:</b> intermediário.')

out = ROOT / 'docs/cv/Ian-Santos-Desenvolvimento.pdf'
def decorate(canvas, doc):
    canvas.setTitle('Ian Santos - Desenvolvimento de Software')
    canvas.setAuthor('Ian Santos')
    canvas.setStrokeColor(colors.HexColor('#dce3ec'))
    canvas.line(42,36,A4[0]-42,36)
    canvas.setFont(BODY,7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(42,24,'Ian Santos | Desenvolvimento de Software & Qualidade')
    canvas.drawRightString(A4[0]-42,24,str(doc.page))
doc = SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=34,bottomMargin=47)
doc.build(story,onFirstPage=decorate,onLaterPages=decorate)
print(out)
