
const fs = require('fs');
const path = 'l:\\ai任务\\aidp-rubric\\todowrite_traj_level\\0095\\step.json';

try {
  const data = fs.readFileSync(path, 'utf8');
  const json = JSON.parse(data);
  const trajectory = json.code_grm_trajectory;
  
  console.log(`Total steps: ${trajectory.length}`);
  
  console.log('--- TodoWrite Usage ---');
  trajectory.forEach((step, index) => {
    if (step.role === 'assistant' && step.content.includes('TodoWrite')) {
      console.log(`Step ${index}: TodoWrite used`);
    }
  });

  console.log('--- Task Execution Steps (Sample) ---');
  trajectory.forEach((step, index) => {
      // Check for tool calls that are NOT TodoWrite
      if (step.role === 'assistant' && step.content.includes('<seed:tool_call>') && !step.content.includes('TodoWrite')) {
          // simple check, might need parsing the tool call name
          console.log(`Step ${index}: Tool Call (Potential Task Execution)`);
      }
  });

} catch (err) {
  console.error(err);
}
