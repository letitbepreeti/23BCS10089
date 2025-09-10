// script.js
const svg = document.getElementById("drawingArea");

let isDrawing = false;
let currentPath;

svg.addEventListener("mousedown", (e) => {
  isDrawing = true;

  const point = getMousePosition(e);

  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", "blue");
  currentPath.setAttribute("stroke-width", "2");
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("d", `M ${point.x} ${point.y}`);

  svg.appendChild(currentPath);
});

svg.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const point = getMousePosition(e);
  const d = currentPath.getAttribute("d");
  currentPath.setAttribute("d", `${d} L ${point.x} ${point.y}`);
});

svg.addEventListener("mouseup", () => {
  isDrawing = false;
});

svg.addEventListener("mouseleave", () => {
  isDrawing = false;
});

function getMousePosition(event) {
  const rect = svg.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
