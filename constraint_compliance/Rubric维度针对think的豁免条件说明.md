前情提要及必要说明
- think在轨迹中的位置是：thinking有内容代表有推理过程，反之则没有。

- System Prompt里要求使用<think_never_***></think_never_***>包裹think内容，指的是上图中的thinking字段的内容，而非content内容！
- 只有role为assistant时，才可能出现thinking，并非每一个step中都存在thinking。
豁免情况说明
1. 第一种情况：
  - System Prompt里要求使用<think_never_***></think_never_***>包裹think内容，且在sp最后出现no think。

  - 情况说明：轨迹出现no think时，整条轨迹无think内容合理，针对constraint_compliance的rubric维度中提到的评分要点：“输出格式违规：要求特定输出格式却使用了其他格式。”不做扣分处理。
2. 第二种情况：
  - System Prompt里要求使用<think_never_***></think_never_***>包裹think内容，且在sp最后出现Unrestricted think。

  - 豁免情况说明：轨迹出现Unrestricted think时，轨迹中存在thinking内容，即使没有按照要求使用<think_never_***></think_never_***>包裹think内容，针对constraint_compliance的rubric维度中提到的评分要点：“输出格式违规：要求特定输出格式却使用了其他格式。”仍然不做扣分处理，为豁免情况。