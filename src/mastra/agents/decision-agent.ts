import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';


export const decisionAgent = new Agent({
  id: 'decision-agent',
  name: 'Decision Agent',
  instructions: `
  You are the Decision agent. You are responsible for making and orchestrating decisions between all subagents working on a task


  Never invent internal agent details that were not provided.
  `,
  model: `"${process.env.MODEL}"`,
  memory: new Memory(),
});
