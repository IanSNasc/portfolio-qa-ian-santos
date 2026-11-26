"""Build the one-page portfolio CV. Requires ReportLab."""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs/cv/Ian-Santos-Desenvolvimento.pdf"
PORTFOLIO = "https://iansnasc.github.io/portfolio-qa-ian-santos/"
WIDTH, HEIGHT = A4
MARGIN = 37
TEXT_WIDTH = WIDTH - 2 * MARGIN
NAVY = "#132436"
INK = "#192C39"
MUTED = "#425866"
TEAL = "#17604E"
MINT = "#BEE9AC"
PAPER = "#F1F6F2"
LINE = "#C7D6D1"
REGULAR, BOLD = "Helvetica", "Helvetica-Bold"
fonts = Path("C:/Windows/Fonts")
if (fonts / "segoeui.ttf").is_file() and (fonts / "segoeuib.ttf").is_file():
    REGULAR, BOLD = "SegoeUI", "SegoeUI-Bold"
    pdfmetrics.registerFont(TTFont(REGULAR, str(fonts / "segoeui.ttf")))
    pdfmetrics.registerFont(TTFont(BOLD, str(fonts / "segoeuib.ttf")))
pdfmetrics.registerFontFamily(REGULAR, normal=REGULAR, bold=BOLD)

canvas = Canvas(str(OUTPUT), pagesize=A4, invariant=True)
canvas.setTitle("Ian Santos | Desenvolvimento de software e qualidade")
canvas.setAuthor("Ian Santos")
canvas.setSubject("Currículo profissional")


def text(top, content, *, x=MARGIN, width=TEXT_WIDTH, size=10.4,
         leading=14.1, color=INK, bold=False):
    style = ParagraphStyle("text", fontName=BOLD if bold else REGULAR,
                           fontSize=size, leading=leading, textColor=HexColor(color))
    paragraph = Paragraph(content, style)
    _, height = paragraph.wrap(width, HEIGHT)
    paragraph.drawOn(canvas, x, HEIGHT - top - height)
    return top + height


def section(top, label):
    canvas.setStrokeColor(HexColor(LINE))
    canvas.line(MARGIN, HEIGHT - top, WIDTH - MARGIN, HEIGHT - top)
    return text(top + 6, label, size=12, leading=16, bold=True, color=TEAL) + 6


def project(top, title, stack, description):
    top = text(top, title, size=11.5, leading=15, bold=True)
    top = text(top + 1, stack, size=9.2, leading=12.4, color=MUTED)
    return text(top + 2, description) + 7


def link(url, label):
    return f'<link href="{url}"><u>{label}</u></link>'


canvas.setFillColor(HexColor(NAVY))
canvas.rect(0, HEIGHT - 137, WIDTH, 137, fill=1, stroke=0)
canvas.setFillColor(HexColor(MINT))
canvas.rect(MARGIN, HEIGHT - 23, 29, 3, fill=1, stroke=0)
text(28, "Ian Santos", size=32, leading=39, color="#FFFFFF", bold=True)
text(70, "Desenvolvimento de software e qualidade", size=15, leading=20, color=MINT)
contact = "Salvador, BA &nbsp; · &nbsp; " + link("mailto:ian.s4ntos@gmail.com", "ian.s4ntos@gmail.com")
text(99, contact, size=10, leading=13, color="#FFFFFF")
links = [link(PORTFOLIO, "Portfólio"), link("https://github.com/IanSNasc", "GitHub"),
         link("https://www.linkedin.com/in/ian-santos-qa", "LinkedIn")]
text(115, " &nbsp; · &nbsp; ".join(links), size=10, leading=13, color="#FFFFFF")

y = text(151, "Estudo Engenharia de Software e desenvolvo aplicações web com apoio de IA. "
         "Trabalho com suporte de informática e busco uma oportunidade em desenvolvimento "
         "para aplicar minha experiência com investigação de falhas e testes de software.")
y = section(y + 11, "Projetos")
panel_top = y
panel_height = 108
canvas.setFillColor(HexColor(PAPER))
canvas.roundRect(MARGIN, HEIGHT - y - panel_height, TEXT_WIDTH, panel_height, 6, fill=1, stroke=0)
detail = dict(x=MARGIN + 13, width=TEXT_WIDTH - 26)
y = text(y + 7, "CondoSphere", size=15, leading=19, bold=True, **detail)
y = text(y + 1, "Gestão condominial · React, TypeScript, Supabase, PostgreSQL e Vitest",
         size=9.2, leading=13, color=TEAL, **detail)
y = text(y + 2, "Criei o sistema do zero com apoio de IA. Desenvolvi fluxos de reservas, portaria e "
         "comunicados com diferentes permissões. No painel de documentos, investiguei falhas de "
         "consulta e testei a preservação de dados e a troca de conta.", **detail)
y = text(y + 2, link(PORTFOLIO + "casos/condosphere/", "Consultar estudo de caso e testes"),
         size=9.3, leading=12, color=TEAL, **detail)
if y > panel_top + panel_height - 3:
    raise ValueError("CondoSphere text exceeds the highlighted area")

y = project(panel_top + panel_height + 8, "Foco PMBA", "Projeto pessoal · React, JavaScript, Vite e PWA",
            "Criei o aplicativo para estudar para a Polícia Militar da Bahia, praticar questões e revisar erros. "
            "Na execução local de 25/11/2026, os 17 testes de domínio, filtros, respostas e progresso passaram.")
y = project(y, "Klipper", "Projeto de extensão · Python, Flask, Flutter e APIs REST",
            "Desenvolvi e analisei fluxos de agendamento para barbearias. Documentei nove falhas de "
            "usabilidade, segurança e regras de negócio.")
y = project(y, "Portal de eventos culturais", "Projeto acadêmico · Python, Flask, SQLAlchemy e MySQL",
            "Implementei rotas e modelos relacionais para publicar eventos e cadastrar inscrições. "
            + link("https://github.com/IanSNasc/meu-projeto-flask", "Ver código"))

y = section(y + 2, "Experiência")
y = text(y, "Auxiliar de Informática · Atacadão", bold=True, size=11.5, leading=15)
y = text(y + 1, "Desde abril de 2024", size=9.2, leading=12.4, color=MUTED)
y = text(y + 2, "Presto suporte aos usuários, monitoro servidores Linux e apoio rotinas de backup e permissões. "
         "Investigo incidentes, documento demandas e valido sistemas após manutenções.")

y = section(y + 10, "Formação e capacitação")
y = text(y, "<b>Engenharia de Software</b> · Universidade Pitágoras Unopar Anhanguera (EAD)")
y = text(y, "2024 a 2027 · Conclusão prevista para julho de 2027", color=MUTED, size=9.5, leading=13)
y = text(y + 2, "<b>QAzando</b> · Trilhas QA Starter e QA API · Certificação por módulo. &nbsp; <b>Inglês</b> · Intermediário.")

y = section(y + 10, "Competências técnicas")
y = text(y, "<b>Desenvolvimento</b> · React, JavaScript, TypeScript, Python, SQL, APIs REST, Supabase e Git.")
y = text(y + 2, "<b>Qualidade</b> · Testes funcionais, exploratórios e de regressão, Vitest, CodeceptJS, "
         "Playwright, Postman e BDD/Gherkin.")
if y > HEIGHT - 22:
    raise ValueError(f"CV content exceeds the printable area ({y:.1f} pt)")
canvas.showPage()
canvas.save()
print(OUTPUT)
