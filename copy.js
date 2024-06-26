const fs = require('fs');

const src = process.argv[2];
const dest = process.argv[3];

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error('Error copying file:', err);
  } else {
    console.log(`File copied from ${src} to ${dest}`);
  }
});