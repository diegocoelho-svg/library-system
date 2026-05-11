/** biome-ignore-all lint/style/noNamespace: biome require this */
/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: biome require this */
declare namespace Express {
  export interface Request {
    user?: {
      id: string
      role: string
    }
  }
}
