export function PageShell(content = "", className = "view active"){
  return `<main class="${className}">${content}</main>`;
}
