import { type SavedCircuitProject } from "./projectStorage";

export async function getBuiltInProjects(): Promise<
  SavedCircuitProject[]
> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}built-in-projects.json`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load built-in projects: ${response.status}`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Built-in projects JSON must be an array.");
  }

  return data as SavedCircuitProject[];
}

export async function getBuiltInProject(
  id: string,
): Promise<SavedCircuitProject | null> {
  const projects = await getBuiltInProjects();

  return projects.find((project) => project.id === id) ?? null;
}