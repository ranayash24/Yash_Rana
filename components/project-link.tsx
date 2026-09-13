import type { Project } from "@/lib/projects";

export function ProjectLink({
  link,
  className,
}: {
  link: Project["links"][number];
  className?: string;
}) {
  if (link.unavailable) {
    return (
      <span className={className ? `${className} opacity-60` : "text-muted"}>
        {link.label} · currently unavailable
      </span>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {link.label} ↗
    </a>
  );
}
