import re

def count_categories(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    counts = {
        'all': 0,
        'pension': 0,
        'investment': 0,
        'mutual': 0,
        'etc': 0
    }
    
    # Grid cards
    pattern = r'data-category="([^"]+)"'
    matches = re.findall(pattern, content)
    for m in matches:
        if m in counts:
            counts[m] += 1
            counts['all'] += 1
            
    # Carousel cards (usually ongoing pension/investment)
    # They are not usually counted in the archive tabs if they are only in carousel,
    # but let's see if they are duplicated in the grid.
    # In this project, they are often duplicates or separate.
    
    return counts

print(count_categories('project.html'))
