// Simple file manager using Node.js and switch-case
const fs = require('fs');
const readline = require('readline');

// Set up readline for interactive input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Common file name
const fileName = 'data.txt';

// Display menu to the user
console.log(`
Welcome to the Simple File Manager 📁
Please choose an option:
1. Create a file and write content
2. Read the file
3. Append content to the file
4. Delete the file
`);

rl.question('Enter your choice (1-4): ', (choice) => {
  switch (choice.trim()) {
    case '1':
      // Create and write content to the file
      rl.question('Enter content to write in the file: ', (text) => {
        fs.writeFileSync(fileName, text);
        console.log(`✅ File '${fileName}' created and content saved.`);
        rl.close();
      });
      break;

    case '2':
      // Read content from the file
      if (fs.existsSync(fileName)) {
        const data = fs.readFileSync(fileName, 'utf8');
        console.log(`📖 Content of '${fileName}':\n\n${data}`);
      } else {
        console.log(`⚠️ Cannot read. File '${fileName}' does not exist.`);
      }
      rl.close();
      break;

    case '3':
      // Append new content to the file
      if (fs.existsSync(fileName)) {
        rl.question('Enter content to append: ', (moreText) => {
          fs.appendFileSync(fileName, '\n' + moreText);
          console.log(`📝 Content appended to '${fileName}'.`);
          rl.close();
        });
      } else {
        console.log(`⚠️ Cannot append. File '${fileName}' does not exist.`);
        rl.close();
      }
      break;

    case '4':
      // Delete the file
      if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log(`🗑️ File '${fileName}' deleted successfully.`);
      } else {
        console.log(`⚠️ Cannot delete. File '${fileName}' does not exist.`);
      }
      rl.close();
      break;

    default:
      console.log('❌ Invalid input. Please enter a number between 1 and 4.');
      rl.close();
  }
});
