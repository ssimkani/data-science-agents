import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { Workspace } from '@mastra/core/workspace'

// skill.md for decision agent
const decisionMaker = new Workspace({
  skills: ['./skills/decision-maker'],
})

export const decisionAgent: Agent = new Agent({
  id: 'decision-agent',
  name: 'Decision Agent',
  instructions: `
  You are the Decision agent. You are responsible for making and orchestrating decisions between all subagents working on a task


  Never invent internal agent details that were not provided.
  `,
  model: process.env.MODEL!,
  workspace: decisionMaker,
  memory: new Memory({
      options: {
        workingMemory: {
          enabled: true,
          scope: 'thread', // Memory stays in one thread
          template: `# Decision Agent Working Memory\n
          - **User's Problem**:\n
          - **Long-term Goal**:\n
          - **User Preferences**:\n
          - **Execution Plan**:\n
          - **Completed Steps**:\n
          - **Current Step**:\n
          - **Remaining Steps**:\n
          - **Last Reviewer Verdict**:\n`
        },
      },
    }),
});
