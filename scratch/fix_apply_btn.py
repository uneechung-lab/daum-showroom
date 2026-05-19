import re

file_path = r'c:\daum_site\careers-announcement.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix showApplyForm function to open modal
content = content.replace(
    "const modalScrollArea = document.querySelector('.modal-scroll-area');",
    "const modalScrollArea = document.querySelector('.modal-scroll-area');\n        const modal = document.getElementById('jobModal');"
)
content = content.replace(
    "if (modalScrollArea) modalScrollArea.scrollTop = 0;\n        lucide.createIcons();",
    "modal.classList.add('active');\n        document.body.style.overflow = 'hidden';\n        if (modalScrollArea) modalScrollArea.scrollTop = 0;\n        lucide.createIcons();"
)

# Fix the apply buttons to call showApplyForm instead of mailto
def replace_link(match):
    role_id = match.group(1)
    block = match.group(0)
    return block.replace(
        '<a href="mailto:recruit@daumis.co.kr" class="apply-btn" onclick="event.stopPropagation()">',
        f'<a href="javascript:void(0)" class="apply-btn" onclick="event.stopPropagation(); showApplyForm(\'{role_id}\')">'
    )

content = re.sub(
    r'<div class="announcement-item" onclick="openJobModal\(\'(.*?)\'\)\">.*?<a href="mailto:recruit@daumis.co.kr" class="apply-btn" onclick="event.stopPropagation()">',
    replace_link,
    content,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('File updated successfully')
