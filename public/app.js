const get = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed ${path}`);
  return response.json();
};
const el = (id) => document.getElementById(id);
const svg = (tag, attrs) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs))
    node.setAttribute(key, String(value));
  return node;
};
async function render() {
  const hour = Number(el("hour").value);
  const world = await get(`/api/world?hour=${hour}`);
  el("time").textContent = `${String(hour).padStart(2, "0")}:00`;
  const habitat = el("habitat");
  habitat.replaceChildren();
  habitat.dataset.night = String(world.phenotype.night);
  habitat.append(
    svg("rect", {
      width: 900,
      height: 400,
      fill: world.phenotype.night ? "#101b36" : "#abcab4",
    }),
  );
  habitat.append(
    svg("circle", {
      cx: 730,
      cy: 80,
      r: 30,
      fill: world.phenotype.night ? "#e1edcf" : "#f6dfa0",
    }),
  );
  habitat.append(
    svg("path", {
      d: "M0 310 Q220 210 450 300 T900 280 V400 H0Z",
      fill: "#25483f",
    }),
  );
  for (let i = 0; i < 24; i++) {
    const x = 25 + i * 37;
    habitat.append(
      svg("path", {
        d: `M${x} 365 Q${x - 20} 290 ${x + 6} ${235 + (i % 5) * 17}`,
        stroke: "#91b896",
        "stroke-width": 3,
        fill: "none",
      }),
    );
  }
  for (let i = 0; i < world.phenotype.flowers; i++)
    habitat.append(
      svg("circle", {
        cx: 130 + i * 147,
        cy: 300 + (i % 2) * 20,
        r: 7,
        fill: "#b6fff3",
        "data-trait": "lumen-flower",
      }),
    );
  el("traits").textContent =
    `Traits: ${world.traits.flora.join(", ")} · ${world.traits.fauna.join(", ")}`;
}
try {
  const [generation, lineage, health] = await Promise.all([
    get("/api/generation"),
    get("/api/lineage"),
    get("/healthz"),
  ]);
  el("generation").textContent = generation.id;
  el("mutation").textContent = generation.mutation;
  el("health").textContent =
    `${health.status} service / production ${health.production}`;
  for (const generation of lineage) {
    const item = document.createElement("li");
    item.textContent = `${generation.id} ← ${generation.parent ?? "origin"} · ${generation.mutation} · ${generation.checks.production} · ${generation.created_at}`;
    el("lineage").append(item);
  }
  el("hour").addEventListener("input", () => {
    render().catch(() => {
      el("health").textContent = "Habitat unavailable";
    });
  });
  await render();
} catch {
  el("health").textContent = "State unavailable";
}
