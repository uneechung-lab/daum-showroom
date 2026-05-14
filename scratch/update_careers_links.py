import os

files_to_update = [
    'index.html', 'overview.html', 'ceo.html', 'vision.html', 'history.html', 
    'contact.html', 'ai-lab.html', 'ax-lab.html', 'business.html', 
    'investment.html', 'mutual.html', 'sales.html', 'asset.html', 
    'project.html', 'clients.html', 'careers.html'
]

old_links = [
    '<li><a href="/careers.html#jobs">직무소개</a></li>',
    '<li><a href="/careers.html#process">채용절차</a></li>',
    '<li><a href="/careers.html#welfare">복지제도</a></li>',
    '<li><a href="/careers.html#announcement">채용공고</a></li>',
    '<li><a href="/careers.html" class="active">직무소개</a></li>',
    '<li><a href="/careers.html">채용절차</a></li>',
    '<li><a href="/careers.html">복지제도</a></li>',
    '<li><a href="/careers.html">채용공고</a></li>'
]

new_links = [
    '<li><a href="/careers-jobs.html">직무소개</a></li>',
    '<li><a href="/careers-process.html">채용절차</a></li>',
    '<li><a href="/careers-welfare.html">복지제도</a></li>',
    '<li><a href="/careers-announcement.html">채용공고</a></li>',
    '<li><a href="/careers-jobs.html">직무소개</a></li>',
    '<li><a href="/careers-process.html">채용절차</a></li>',
    '<li><a href="/careers-welfare.html">복지제도</a></li>',
    '<li><a href="/careers-announcement.html">채용공고</a></li>'
]

for filename in files_to_update:
    if not os.path.exists(filename):
        print(f"Skipping {filename}, not found.")
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in zip(old_links, new_links):
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"No changes needed for {filename}")
