export type ProjectStatus = "planned" | "in-progress" | "completed";

export interface Project {
  id: string;
  title: string;
  type: "manual" | "AI-suggested";
  status: ProjectStatus;
  estimatedCost: number;
  contractorRequired: boolean;
  category?: string;
  description?: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  imageUrl?: string;
  projects: Project[];
  totalBudget: number;
  completedProjects: number;
}

export interface User {
  id: string;
  email: string;
  language: string;
  userType: "renter" | "homeowner";
}

export interface ShoppingItem {
  id: string;
  projectId: string;
  name: string;
  category: string;
  estimatedCost: number;
  url?: string;
  purchased: boolean;
}