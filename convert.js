import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = './public/docs/images'; // သင့်ပုံတွေရှိတဲ့ လမ်းကြောင်း

fs.readdirSync(directory).forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const filename = file.split('.').slice(0, -1).join('.');
    sharp(`${directory}/${file}`)
      .webp({ quality: 80 })
      .toFile(`${directory}/${filename}.webp`)
      .then(() => console.log(`${file} converted!`));
  }
});