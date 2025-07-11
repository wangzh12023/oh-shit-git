const fs = require('fs');
const path = require('path');

// Define the mapping between files and content sections
const FILE_MAPPINGS = [
  { 
    file: 'reflog.md', 
    title: 'Oh shit, I did something terribly wrong, please tell me git has a magic time machine!?!',
    anchor: 'magic-time-machine'
  },
  { 
    file: 'amend.md', 
    title: 'Oh shit, I committed and immediately realized I need to make one small change!',
    anchor: 'change-last-commit'
  },
  { 
    file: 'amend-msg.md', 
    title: 'Oh shit, I need to change the message on my last commit!',
    anchor: 'change-last-commit-message'
  },
  { 
    file: 'new-branch.md', 
    title: 'Oh shit, I accidentally committed something to master that should have been on a brand new branch!',
    anchor: 'accidental-commit-master'
  },
  { 
    file: 'wrong-branch.md', 
    title: 'Oh shit, I accidentally committed to the wrong branch!',
    anchor: 'accidental-commit-wrong-branch'
  },
  { 
    file: 'diff-empty.md', 
    title: 'Oh shit, I tried to run a diff but nothing happened?!',
    anchor: 'dude-wheres-my-diff'
  },
  { 
    file: 'revert-old.md', 
    title: 'Oh shit, I need to undo a commit from like 5 commits ago!',
    anchor: 'undo-a-commit'
  },
  { 
    file: 'undo-file.md', 
    title: 'Oh shit, I need to undo my changes to a file!',
    anchor: 'undo-a-file'
  },
  { 
    file: 'fuck-this.md', 
    title: 'Fuck this noise, I give up.',
    anchor: 'fuck-this-noise'
  }
];

function extractSection(content, anchor) {
  const anchorRegex = new RegExp(`## \\[.*?\\]\\(#${anchor}\\)`, 'i');
  const nextSectionRegex = /## \[.*?\]\(#.*?\)/g;
  
  const anchorMatch = content.match(anchorRegex);
  if (!anchorMatch) {
    return null;
  }
  
  const startIndex = content.indexOf(anchorMatch[0]);
  const afterAnchor = content.substring(startIndex);
  
  // Find the next section
  const allMatches = [...afterAnchor.matchAll(nextSectionRegex)];
  if (allMatches.length > 1) {
    const nextSectionIndex = afterAnchor.indexOf(allMatches[1][0]);
    return afterAnchor.substring(0, nextSectionIndex).trim();
  }
  
  // If no next section, find the disclaimer or end
  const disclaimerIndex = afterAnchor.indexOf('*Disclaimer:');
  if (disclaimerIndex > 0) {
    return afterAnchor.substring(0, disclaimerIndex).trim();
  }
  
  return afterAnchor.trim();
}

function generateMarkdownFiles() {
  const contentDir = path.join(__dirname, '..', 'content');
  const sourceFile = path.join(contentDir, 'oh-shit-git.md');
  
  // Read the source content
  if (!fs.existsSync(sourceFile)) {
    console.error('Source file not found:', sourceFile);
    return;
  }
  
  const sourceContent = fs.readFileSync(sourceFile, 'utf8');
  
  // Generate each file
  FILE_MAPPINGS.forEach(mapping => {
    const targetFile = path.join(contentDir, mapping.file);
    
    // Skip if file already exists
    if (fs.existsSync(targetFile)) {
      console.log(`Skipping existing file: ${mapping.file}`);
      return;
    }
    
    const section = extractSection(sourceContent, mapping.anchor);
    if (!section) {
      console.error(`Could not extract section for: ${mapping.file}`);
      return;
    }
    
    // Write the extracted section to new file
    fs.writeFileSync(targetFile, section);
    console.log(`Created: ${mapping.file}`);
  });
  
  console.log('Batch generation complete!');
}

// Run the script
generateMarkdownFiles();
