import re

with open('project.html', 'r', encoding='utf-8') as f:
    content = f.read()

grid_content = content.split('<div id="project-grid"')[1].split('</div>\n\n            <!-- Load More Container -->')[0]
cards = re.findall(r'class="project-card"', grid_content)
pension = re.findall(r'data-category="pension"', grid_content)
investment = re.findall(r'data-category="investment"', grid_content)
mutual = re.findall(r'data-category="mutual"', grid_content)
etc = re.findall(r'data-category="etc"', grid_content)

print(f"Total: {len(cards)}")
print(f"Pension: {len(pension)}")
print(f"Investment: {len(investment)}")
print(f"Mutual: {len(mutual)}")
print(f"ETC: {len(etc)}")
