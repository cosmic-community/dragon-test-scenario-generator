const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return false;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n</head>`);
  } else if (content.includes('<body>')) {
    content = content.replace('<body>', `<body>\n  ${scriptTag}`);
  } else {
    return false;
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let injected = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      injected += processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      if (injectScript(filePath)) {
        console.log(`✓ Injected script into ${filePath}`);
        injected++;
      }
    }
  });
  
  return injected;
}

const outDir = path.join(process.cwd(), 'out');
if (fs.existsSync(outDir)) {
  const count = processDirectory(outDir);
  console.log(`\n✓ Console capture script injected into ${count} HTML file(s)`);
} else {
  console.log('No output directory found. Build script injection skipped.');
}