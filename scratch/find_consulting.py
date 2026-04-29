import re

with open('project.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all cards and their titles
card_pattern = r'(<div class="project-card"[^>]+>.*?<h3>.*?</h3>.*?</div>)'
cards = re.findall(card_pattern, content, re.DOTALL)

consulting_titles = []
for card in cards:
    if '컨설팅' in card or 'ISP' in card:
        title = re.search(r'<h3>(.*?)</h3>', card, re.DOTALL).group(1)
        consulting_titles.append(title.strip())

for t in consulting_titles:
    print(t)
