import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Check if ffmpeg is installed
function hasFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

const basePath = path.join(process.cwd(), 'public/pronunciation/lesson-2');

if (!hasFFmpeg()) {
  console.log('FFmpeg is not installed or not in PATH. Skipping video optimization.');
  process.exit(0);
}

console.log('FFmpeg detected. Starting video optimization...');

const subdirs = ['i-long', 'i-short', 'e', 'ae', 'schwa', 'uh'];

subdirs.forEach(dir => {
  const dirPath = path.join(basePath, dir);
  const videoPath = path.join(dirPath, 'guide-video.mp4');
  const tempPath = path.join(dirPath, 'guide-video-optimized.mp4');

  if (fs.existsSync(videoPath)) {
    console.log(`Optimizing ${videoPath}...`);
    try {
      // ffmpeg command to optimize for web:
      // - H.264 video codec, AAC audio codec
      // - scale to max 720p (1280x720) while preserving aspect ratio
      // - movflags +faststart to place index/moov atom at start of file for instant play
      execSync(`ffmpeg -y -i "${videoPath}" -vcodec libx264 -pix_fmt yuv420p -profile:v main -level 3.1 -crf 23 -vf "scale='min(1280,iw)':-2" -acodec aac -b:a 128k -movflags +faststart "${tempPath}"`, { stdio: 'inherit' });
      
      // Replace original file with optimized one
      fs.renameSync(tempPath, videoPath);
      console.log(`Successfully optimized ${videoPath}`);
    } catch (err) {
      console.error(`Failed to optimize ${videoPath}:`, err);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  } else {
    console.log(`Video not found: ${videoPath}`);
  }
});
