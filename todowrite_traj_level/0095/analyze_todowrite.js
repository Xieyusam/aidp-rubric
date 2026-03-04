
const fs = require('fs');
const path = 'l:\\ai任务\\aidp-rubric\\todowrite_traj_level\\0095\\step.json';

try {
  const data = fs.readFileSync(path, 'utf8');
  const json = JSON.parse(data);
  const trajectory = json.code_grm_trajectory;

  console.log('--- TodoWrite Details ---');
  trajectory.forEach((step, index) => {
    if (step.role === 'assistant' && step.content.includes('TodoWrite')) {
      console.log(`\nStep ${index}:`);
      // Extract the JSON payload of TodoWrite if possible, or just print a snippet
      const match = step.content.match(/<function name="TodoWrite">([\s\S]*?)<\/function>/);
      if (match) {
          console.log(match[1].substring(0, 500) + "..."); 
      } else {
          console.log("TodoWrite detected but format not matched exactly.");
      }
    }
  });

} catch (err) {
  console.error(err);
}
