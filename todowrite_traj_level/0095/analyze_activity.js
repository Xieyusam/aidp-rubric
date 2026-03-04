
const fs = require('fs');
const path = 'l:\\ai任务\\aidp-rubric\\todowrite_traj_level\\0095\\step.json';

try {
  const data = fs.readFileSync(path, 'utf8');
  const json = JSON.parse(data);
  const trajectory = json.code_grm_trajectory;

  console.log('--- Activity between Step 45 and 81 ---');
  for (let i = 46; i < 81; i++) {
    const step = trajectory[i];
    if (step.role === 'assistant') {
      let desc = "Content only";
      if (step.content.includes('<seed:tool_call>')) {
        const match = step.content.match(/<function name="(\w+)">/);
        desc = match ? `Tool: ${match[1]}` : "Tool call";
      }
      console.log(`Step ${i}: ${desc}`);
    }
  }

  console.log('\n--- Activity after Step 81 ---');
  for (let i = 82; i < trajectory.length; i++) {
    const step = trajectory[i];
    if (step.role === 'assistant') {
      let desc = "Content only";
      if (step.content.includes('<seed:tool_call>')) {
        const match = step.content.match(/<function name="(\w+)">/);
        desc = match ? `Tool: ${match[1]}` : "Tool call";
      }
      console.log(`Step ${i}: ${desc}`);
    }
  }

} catch (err) {
  console.error(err);
}
