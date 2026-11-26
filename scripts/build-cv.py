"""Generate Ian Santos's one-page A4 CV with selectable text and PDF links."""
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
SITE = "https://iansnasc.github.io/portfolio-qa-ian-santos/"
WIDTH, HEIGHT = A4
LEFT = 44
RIGHT = WIDTH - LEFT
INK = "#172735"
BODY = "#293644"
ACCENT = "#284B69"
MUTED = "#475767"
LINE = "#BCC8CF"

regular, bold, display = "Helvetica", "Helvetica-Bold", "Times-Roman"
font_dir = Path("C:/Windows/Fonts")
for name, file in [("Segoe", "segoeui.ttf"), ("SegoeBold", "segoeuib.ttf"), ("Cambria", "cambria.ttc")]:
    if (font_dir / file).is_file():
        pdfmetrics.registerFont(TTFont(name, str(font_dir / file)))
        if name == "Segoe":
            regular = name
        elif name == "SegoeBold":
            bold = name
        else:
            display = name
pdfmetrics.registerFontFamily(regular, normal=regular, bold=bold)
page = Canvas(str(OUTPUT), pagesize=A4, invariant=True)
page.setTitle("Ian Santos | Desenvolvimento de software")
page.setAuthor("Ian Santos")
page.setSubject("Currículo profissional")


def paragraph(top, content, size=11, leading=15.5, font=None, color=BODY, width=RIGHT-LEFT):
    style = ParagraphStyle("cv", fontName=font or regular, fontSize=size,
                           leading=leading, textColor=HexColor(color))
    block = Paragraph(content, style)
    _, height = block.wrap(width, HEIGHT)
    block.drawOn(page, LEFT, HEIGHT - top - height)
    return top + height


def section(top, label):
    baseline = HEIGHT - top - 9
    text = page.beginText(LEFT, baseline)
    text.setFont(bold, 9.5)
    text.setCharSpace(1.25)
    text.setFillColor(HexColor(ACCENT))
    text.textOut(label)
    text.setCharSpace(0)
    page.drawText(text)
    end = LEFT + pdfmetrics.stringWidth(label, bold, 9.5) + len(label) * 1.25
    page.setStrokeColor(HexColor(LINE))
    page.setLineWidth(.55)
    page.line(end + 12, baseline + 3, RIGHT, baseline + 3)
    return top + 23


def entry(top, title, detail):
    detail_width = pdfmetrics.stringWidth(detail, regular, 9.2)
    max_title = RIGHT - LEFT - detail_width - 14
    if pdfmetrics.stringWidth(title, bold, 11.5) > max_title:
        raise ValueError(f"Entry title overlaps its detail: {title}")
    page.setFont(bold, 11.5)
    page.setFillColor(HexColor(INK))
    page.drawString(LEFT, HEIGHT - top - 11, title)
    page.setFont(regular, 9.2)
    page.setFillColor(HexColor(MUTED))
    page.drawRightString(RIGHT, HEIGHT - top - 11, detail)
    return top + 17


def link(url, label):
    return f'<link href="{url}" color="{ACCENT}"><u>{label.replace(" ", "&nbsp;")}</u></link>'


y = paragraph(38, "Ian Santos", 32, 37, display, INK)
y = paragraph(y + 3, "Desenvolvimento de software e qualidade", 14, 19, regular, ACCENT)
contacts = ["Salvador, BA", link("mailto:ian.s4ntos@gmail.com", "ian.s4ntos@gmail.com"),
            link(SITE, "Portfólio"), link("https://github.com/IanSNasc", "GitHub"),
            link("https://www.linkedin.com/in/ian-santos-qa", "LinkedIn")]
y = paragraph(y + 6, " &nbsp; · &nbsp; ".join(contacts), 9.8, 14, color=MUTED)
y = paragraph(y + 11, "Estudo Engenharia de Software e trabalho com suporte de TI. Busco uma vaga de estágio ou júnior "
              "em desenvolvimento web, com foco em qualidade e testes de software.")

y = section(y + 17, "EXPERIÊNCIA PROFISSIONAL")
y = entry(y, "Auxiliar de Informática", "Abril de 2024 – atual")
y = paragraph(y, "Atacadão · Salvador, BA", 10, 14, color=MUTED)
y = paragraph(y + 3, "Presto suporte aos usuários, investigo incidentes e valido sistemas após manutenções. "
              "Monitoro servidores Linux e apoio as rotinas de backup e controle de permissões.")

y = section(y + 21, "PROJETOS")
y = entry(y, "CondoSphere", "React · TypeScript · Supabase · PostgreSQL")
y = paragraph(y, "Criei do zero, com apoio de IA, um sistema de gestão condominial com reservas, "
              "portaria e comunicados. No fluxo de documentos, testei a recuperação de falhas e o "
              "isolamento dos dados na troca de conta. " + link(SITE + "casos/condosphere/", "Estudo de caso"))
y = entry(y + 12, "Foco PMBA", "React · JavaScript · PWA")
y = paragraph(y, "Desenvolvi uma aplicação para estudar para a Polícia Militar da Bahia, praticar questões "
              "e revisar erros. Na execução local de 25/11/2026, passaram os 17 testes de respostas, filtros, "
              "progresso e regras de estudo.")
y = entry(y + 12, "Klipper", "Python · Flask · Flutter")
y = paragraph(y, "Em projeto de extensão, desenvolvi e analisei o agendamento para barbearias. "
              "Documentei nove falhas de usabilidade, segurança e regras de negócio.")
y = entry(y + 12, "Portal de eventos culturais", "Python · Flask · SQLAlchemy · MySQL")
y = paragraph(y, "Implementei rotas e modelos de dados para publicar eventos e registrar inscrições. "
              + link("https://github.com/IanSNasc/meu-projeto-flask", "Repositório"))

y = section(y + 21, "FORMAÇÃO")
y = entry(y, "Bacharelado em Engenharia de Software", "Conclusão prevista em julho de 2027")
y = paragraph(y, "Universidade Pitágoras Unopar Anhanguera · EAD · Início em 2024")
y = paragraph(y + 4, "<b>Formação complementar</b> · Trilhas QA Starter e QA API, QAzando.")

y = section(y + 21, "COMPETÊNCIAS")
y = paragraph(y, "<b>Desenvolvimento</b> · React, TypeScript, JavaScript, Python, SQL, APIs REST, Supabase e Git.")
y = paragraph(y + 3, "<b>Testes</b> · Testes funcionais, exploratórios e de regressão. Vitest, Playwright, CodeceptJS, "
              "Postman e BDD/Gherkin.")
y = paragraph(y + 3, "<b>Idioma</b> · Inglês intermediário.")
if y > HEIGHT - 30:
    raise ValueError(f"CV exceeds printable area at {y:.1f} pt")
page.showPage()
page.save()
print(OUTPUT)
