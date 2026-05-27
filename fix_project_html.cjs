const fs = require('fs');
let content = fs.readFileSync('c:\\daum_site\\project.html', 'utf8');

const marker = `      .content-wrapper {
        margin-top: 0 !important;
        box-shadow: none;
        background: white;
        position: relative;
        z-index: 10;
      }
      <div class="container">`;

const replacement = `      .content-wrapper {
        margin-top: 0 !important;
        box-shadow: none;
        background: white;
        position: relative;
        z-index: 10;
      }

      .project-heading, .project-heading span {
        font-size: var(--font-h2) !important;
      }

      @media (max-width: 768px) {
        body.sub-page .slim-hero .section-title {
          font-size: var(--font-h2) !important;
        }
        body.sub-page .slim-hero .hero-sub {
          font-size: 1.25rem !important;
          word-break: keep-all !important;
        }
        body.sub-page .slim-hero .hero-sub br {
          display: none;
        }
      }
    </style>
  </head>
  <body class="sub-page force-dark">
    <header id="header">
      <div class="container">`;

if (content.includes(marker)) {
    content = content.replace(marker, replacement);
    fs.writeFileSync('c:\\daum_site\\project.html', content);
    console.log('Successfully fixed project.html!');
} else {
    console.log('Failed to find marker.');
}
