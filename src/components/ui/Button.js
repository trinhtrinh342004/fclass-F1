export function Button({ label, className = "btn-primary", type = "button", attrs = "" } = {}){
  return `<button class="${className}" type="${type}" ${attrs}>${label}</button>`;
}
