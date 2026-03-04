import json
import re
import sys

def analyze_steps(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        trajectory = data.get('code_grm_trajectory', [])
        
        # Regex to find tool calls
        tool_call_pattern = re.compile(r'<seed:tool_call>(.*?)</seed:tool_call>', re.DOTALL)
        func_name_pattern = re.compile(r'<function name="(.*?)">')
        param_pattern = re.compile(r'<parameter name="(.*?)"(?: string="(.*?)")?>(.*?)</parameter>', re.DOTALL)

        for i, step in enumerate(trajectory):
            content = step.get('content', '')
            if not content:
                continue

            tool_calls = tool_call_pattern.findall(content)
            for tc in tool_calls:
                func_match = func_name_pattern.search(tc)
                if func_match:
                    func_name = func_match.group(1)
                    
                    # Extract parameters
                    params = {}
                    for p_match in param_pattern.finditer(tc):
                        p_name = p_match.group(1)
                        p_value = p_match.group(3)
                        params[p_name] = p_value

                    if func_name == 'todo_write':
                        print(f"Step {i}: [TODO_WRITE] {params.get('todos')}")
                    elif func_name == 'run_command':
                        print(f"Step {i}: [RUN_COMMAND] {params.get('command')}")
                    elif func_name in ['update_file', 'write_to_file']:
                        print(f"Step {i}: [FILE_EDIT] {func_name} - {params.get('file_path')}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_steps(r"l:\ai任务\aidp-rubric\todowrite_turn_level\0220\step.json")
