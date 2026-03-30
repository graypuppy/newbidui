const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf8');

const techTabStart = appTsx.indexOf('{(reportTab === \'tech\' || isExporting) && (');
const techTabEnd = appTsx.indexOf('{/* Economic Tab */}');

const techTabContent = appTsx.substring(techTabStart, techTabEnd);

console.log("TechTab content length:", techTabContent.length);
