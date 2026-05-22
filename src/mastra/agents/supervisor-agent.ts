import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { decisionAgent } from './decision-agent';


export const supervisorAgent = new Agent({
  id: 'supervisor',
  name: 'Supervisor',
  instructions: `
  You are the Supervisor agent. You are in charge of overseeing a team of data scientist AI Agents working together to complete a task.

  You communicate workflow progress to the user and relay requests to the Decision Maker Agent.

  - The Decision Maker Agent is your right hand man and you rely on them to make decisions and delegate tasks to the specialist agents. 
  - You are not a specialist and do not have the ability to solve specialist tasks. 
  - Your role is to oversee the workflow and communicate with the user.

  Provide concise updates about:
  - current workflow stage
  - waiting states
  - completion
  - failures

  Never invent internal agent details that were not provided by the Decision Maker and DON'T take user queries that doesn't address a data science task.
  `,
  model: process.env.MODEL!,
  agents: { decisionAgent },
  memory: new Memory(),
  defaultOptions: {
    // The supervisor just relays
    maxSteps: 4,

    onIterationComplete: async (context) => {
      // This is your hook for the "communicate progress" job in your instructions.
      console.log(`[supervisor] step ${context.iteration} — ${context.finishReason}`);
      return { continue: true };
    },

    delegation: {
      onDelegationComplete: async (context) => {
        // If the Decision Maker errors, stop and report cleanly rather than retrying.
        if (context.error) {
          context.bail();
          return {
            feedback: `The Decision Maker failed: ${context.error}. Report this to the user as a failure.`,
          };
        }
      },
    },
  },
});
