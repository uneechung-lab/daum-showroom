import re
from datetime import datetime

file_path = r'C:\Users\euni1\.gemini\antigravity\brain\070071ee-8e21-46d8-b3e1-7937ddecc746\.system_generated\steps\66\content.md'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

categories = {
    'pension': [],
    'investment': [],
    'mutual': [],
    'etc': []
}

current_cat = None
i = 0
while i < len(lines):
    line = lines[i].strip()
    
    if '퇴직연금(D-RPS)' in line:
        current_cat = 'pension'
    elif '집합투자증권(D-FTS)' in line:
        current_cat = 'investment'
    elif '공제회(D-MAA)' in line:
        current_cat = 'mutual'
    elif '유지보수및 기타' in line:
        current_cat = 'etc'
    
    # Check for date line (e.g., 2024.05 ~ 현 재)
    match = re.search(r'(\d{4}\.\d{2})\s*~\s*(현 재|\d{4}\.\d{2})', line)
    if match and current_cat:
        date_str = match.group(1)
        # Next non-empty line should be project name
        j = i + 1
        while j < len(lines) and not lines[j].strip():
            j += 1
        
        if j < len(lines):
            project_full = lines[j].strip()
            # Split company and title if possible (e.g., "KB증권 24년 퇴직연금...")
            # Usually company name is the first word or two
            parts = project_full.split(' ', 1)
            company = parts[0] if len(parts) > 1 else "기타"
            title = parts[1] if len(parts) > 1 else project_full
            
            categories[current_cat].append({
                'date': date_str,
                'company': company,
                'title': title
            })
            i = j
    i += 1

# Generate HTML
def get_icon(cat):
    return {
        'pension': 'wallet',
        'investment': 'trending-up',
        'mutual': 'shield-check',
        'etc': 'settings'
    }[cat]

def get_tag(cat):
    return {
        'pension': 'blue',
        'investment': 'orange',
        'mutual': 'blue',
        'etc': ''
    }[cat]

def get_tag_label(cat):
    return {
        'pension': 'Pension',
        'investment': 'Investment',
        'mutual': 'Mutual',
        'etc': 'Maintenance'
    }[cat]

html_output = ""
for cat, projects in categories.items():
    html_output += f"\n              <!-- {cat.upper()} Cards ({len(projects)}) -->\n"
    for p in projects:
        icon = get_icon(cat)
        tag_color = get_tag(cat)
        tag_label = get_tag_label(cat)
        
        # Determine if it's within last 5 years (2021.01 or later)
        year = int(p['date'].split('.')[0])
        is_recent = "true" if year >= 2021 else "false"
        
        html_output += f"""              <div class="project-card" data-category="{cat}" data-recent="{is_recent}">
                <div class="card-header">
                  <div class="card-icon"><i data-lucide="{icon}"></i></div>
                  <div class="card-tags"><span class="tag {tag_color}">{tag_label}</span><span class="tag">Finance</span></div>
                </div>
                <div class="project-info"><h3><span class="company-name">{p['company']}</span> {p['title']}</h3></div>
                <div class="project-year">{p['date']}</div>
              </div>\n"""

with open('projects_generated.html', 'w', encoding='utf-8') as f:
    f.write(html_output)

print("HTML generated in projects_generated.html")
print(f"Counts: RPS:{len(categories['pension'])}, FTS:{len(categories['investment'])}, MAA:{len(categories['mutual'])}, ETC:{len(categories['etc'])}")
