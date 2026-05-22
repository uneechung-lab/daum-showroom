const fs = require('fs');
const files = ['business.html', 'investment.html', 'mutual.html', 'sales.html', 'asset.html', 'project.html', 'clients.html', 'index.html', 'overview.html', 'ceo.html', 'history.html', 'careers-jobs.html', 'careers-process.html', 'careers-welfare.html', 'careers-announcement.html'];
files.forEach(f => {
  if(fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/<h2 class="cta-text">\s+/, '<h2 class="cta-text">');
    fs.writeFileSync(f, c);
  }
});
