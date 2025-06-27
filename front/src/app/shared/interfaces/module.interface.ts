export interface IModule {
  id: number;
  name: string;
  description: string;
  permitSelection?: Record<number, boolean>;
  functionalityRoleId?: number;
}
