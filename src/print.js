import { spawn } from 'child_process';

export default function print(data, copyToClipboard) {
  if (copyToClipboard) {
    pbcopy(data);
  } else {
    console.log(data);
  }
}

function pbcopy(data) {
  try {
    const pbcopy = spawn('pbcopy');
    pbcopy.stdin.write(data);
    pbcopy.stdin.end();
    console.log('copied to clipboard!')
  } catch (e) {
    console.error('Unable to use pbcopy utility')
    console.error(e)
  }
}
