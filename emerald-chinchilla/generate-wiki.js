const fs = require("fs");
const path = require("path");

const PARENT_DIR = "";
const TESTS_DIR = "./__checks__/cotton_cloud";
const WIKI_DIR = "./wiki";

const getParentDir = () => {
  return path.basename(path.resolve(__dirname, "./"));
};

const getTestFiles = (dir) => {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      files = files.concat(getTestFiles(filePath));
    } else if (file.endsWith(".spec.ts")) {
      files.push(filePath);
    }
  });
  return files;
};

const generateMarkdownContent = (filePath) => {
  const parentDir = getParentDir();
  const fileName = path.basename(filePath);
  const relativePath = filePath.replace(/\\/g, "/");
  const repoURL = "https://github.com/Alejandro-Mota-Cotton/Test";
  const fileURL = `${repoURL}/blob/main/${parentDir}/${relativePath}`;

  return `
# Documentation for ${fileName}

## File Path
\`${relativePath}\`

## Purpose/Requirement
SOME PURPOSE

## Test Prerequisites
SOME PREREQUISITES

## Scenarios Covered
SOME SCENARIOS
- Adding and removing roles to any user
  ### Test cases
    * Log in required to access this page
    * Case 2
- Scenario 2



## Test file
- [View the test file on GitHub](${fileURL})
  `.trim(); // Trim unnecessary whitespace from the content
};

const writeMarkdownFiles = (files) => {
  if (!fs.existsSync(WIKI_DIR)) {
    fs.mkdirSync(WIKI_DIR, { recursive: true });
  }

  files.forEach((filePath) => {
    const fileName = `${path.basename(filePath, ".spec.ts")}.md`;
    const markdownContent = generateMarkdownContent(filePath);
    const outputPath = path.join(WIKI_DIR, fileName);

    fs.writeFileSync(outputPath, markdownContent); // Write the Markdown file
    console.log(`Generated Wiki page: ${outputPath}`);
  });
};

const testFiles = getTestFiles(TESTS_DIR);
writeMarkdownFiles(testFiles);
