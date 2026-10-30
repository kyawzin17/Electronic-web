import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CircuitBoard,
  Clock3,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import {
  deleteSavedProject,
  listSavedProjects,
  type SavedCircuitProject,
} from "./projectStorage";
import "./circuit.css";
import { FaBook } from "react-icons/fa";
import { getBuiltInProjects } from "./buildInProjectLoad";


function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<SavedCircuitProject[]>([]);
  const [builtInProjects, setBuiltInProjects] = useState<SavedCircuitProject[]>([]);

  const refresh = () => {
    setProjects(listSavedProjects());
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    getBuiltInProjects().then((projects) => {
      setBuiltInProjects(projects);
    });
  }, []);

  const allProjects = [...projects, ...builtInProjects];

  const openProject = (id: string) => {
    navigate("/circuit/?project=" + encodeURIComponent(id));
  };

  const createProject = () => {
    navigate("/circuit");
  };

  const removeProject = (id: string) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return;

    const confirmed = window.confirm(
      'Delete "' + project.name + '"? This cannot be undone.',
    );

    if (!confirmed) return;

    deleteSavedProject(id);
    refresh();
  };


  return (
    <main className="h-[calc(100vh-65px)] fixed top-16 left-0 right-0 project-scrollbar-width m-0 custom-scrollbar bg-soft text-text-main overflow-auto">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-card/90 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/circuit")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-text-secondary bg-text-secondary/20 text-text-main/70 transition hover:border-cyan-500/50 hover:text-secondary"
              title="Back to circuit editor"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-md lg:text-lg font-semibold mb-4">My Projects</h1>
              <p className="text-xs text-text-secondary">
                Saved circuits and Arduino sketches
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={createProject}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs lg:text-sm font-semibold text-black/90 transition hover:bg-cyan-400"
          >
            <Plus size={17} />
            New Project
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        {allProjects.filter((project) => !project.isBuiltIn).length === 0 ? (
          <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-cyan-400">
              <FolderOpen size={30} />
            </div>

            <h2 className="text-base font-semibold">
              No saved projects yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Build a circuit, write your Arduino code, then press Save.
              Your project will appear here.
            </p>

            <button
              type="button"
              onClick={createProject}
              className="mt-5 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300"
            >
              <CircuitBoard size={17} />
              Start building
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allProjects.filter((project) => !project.isBuiltIn).map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-text-secondary/20 bg-card shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-cyan-500/40"
              >
                <button
                  type="button"
                  onClick={() => openProject(project.id)}
                  className="block w-full text-left"
                >
                  <div className="relative h-40 overflow-hidden border-b border-soft/80 bg-bg">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name + " circuit preview"}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]">
                        <CircuitBoard
                          size={48}
                          className="text-cyan-400/70 transition group-hover:scale-105 group-hover:text-cyan-300"
                        />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-4 bg-card">
                    <h2 className="truncate text-sm font-semibold text-text-main">
                      {project.name}
                    </h2>

                    <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
                      <span>{project.nodes.length} components</span>
                      <span>{project.edges.length} wires</span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary/90">
                      <Clock3 size={12} />
                      {formatDate(project.updatedAt)}
                    </div>
                  </div>
                </button>

                <div className="border-t border-text-secondary/20 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="flex items-center gap-1.5 text-xs text-error/80 transition hover:text-error"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="mx-auto max-w-6xl px-5 py-8 border-t-2 border-text-secondary">
        <h1 className="text-center font-bold text-text-main text-base lg:text-xl mt-4">Build In Projects</h1>
        <p className="text-center text-lg lg:text-4xl mb-12 font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">✦•┈๑⋅⋯ ⋯⋅๑┈•✦</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-12">
            {allProjects.filter((project) => project.isBuiltIn).map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-secondary/20 bg-card shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-cyan-500/40"
              >
                <button
                  type="button"
                  onClick={() => openProject(project.id)}
                  className="block w-full text-left"
                >
                  <div className="relative h-40 overflow-hidden border-b border-soft/80 bg-bg">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name + " circuit preview"}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]">
                        <CircuitBoard
                          size={48}
                          className="text-cyan-400/70 transition group-hover:scale-105 group-hover:text-cyan-300"
                        />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="p-4 bg-card">
                    <h2 className="truncate text-sm font-semibold text-text-main">
                      {project.name}
                    </h2>

                    <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
                      <span>{project.nodes.length} components</span>
                      <span>{project.edges.length} wires</span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary/90">
                      <Clock3 size={12} />
                      {formatDate(project.updatedAt)}
                    </div>
                  </div>
                </button>

                <div className="border-t border-text-secondary/20 px-4 py-3">
                  <Link
                    to={project.project_url || ""}
                    className="flex items-center font-bold gap-1.5 text-xs text-secondary/80 transition hover:text-secondary"
                  >
                    <FaBook className="text-success" size={14} />
                    Read Description!
                  </Link>
                </div>
              </article>
            ))}
          </div>
      </section>
    </main>
  );
}
