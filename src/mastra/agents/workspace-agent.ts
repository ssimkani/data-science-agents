import { Workspace, LocalFilesystem } from '@mastra/core/workspace'


// workspace for the workspace agent
export const workspace = new Workspace({
  filesystem: new LocalFilesystem({ basePath: './workspace' }),
})
