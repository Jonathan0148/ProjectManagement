export interface IRole {
  id: number;
  name: string;
  description: string;
  active: number;
  status: number;
  insertDate: string;
  functionalityRole: FunctionalityRole[];
}

export interface FunctionalityRole {
  id: number;
  roles_id: number;
  modules_id: number;
  status: number;
  insertDate: string;
  functionalityRolePermit: FunctionalityRolePermit[];
}

export interface FunctionalityRolePermit {
  id: number;
  permitId: number;
  modules_roles_id: number;
  permits_id: number;
  status: number;
  insertDate: string;
}
