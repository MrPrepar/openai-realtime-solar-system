import React, { useEffect, useState } from "react";
import "./scene.css";
import "./lite-scene.css";
import { getComponent } from "@/lib/components-mapping";
import {
  MOON_INFO,
  PLANET_INFO,
  PLANET_ORDER,
  type PlanetInfo,
} from "@/lib/planets";

// A 2D stand-in for the Spline scene that reacts to the same tool calls.
// The Raspberry Pi 4 GPU crashes when Spline zooms in on a planet, so the
// mirror uses this instead (?lite=1).

interface ToolCall {
  name: string;
  arguments: any;
}

interface IssPosition {
  latitude: string;
  longitude: string;
}

interface LiteSceneProps {
  toolCall: ToolCall | null;
  issPosition: IssPosition | null;
}

type View =
  | { kind: "overview" }
  | { kind: "orbit" }
  | { kind: "planet"; planet: string }
  | { kind: "moons"; moons: string[] }
  | { kind: "iss" };

const Disc: React.FC<{ planet: PlanetInfo; size: string }> = ({
  planet,
  size,
}) => (
  <div className="lite-disc-wrap" style={{ width: size, height: size }}>
    <div className="lite-disc" style={{ background: planet.surface }} />
    {planet.ring && (
      <svg className="lite-ring" viewBox="0 0 170 24">
        <ellipse
          cx="85"
          cy="12"
          rx="82"
          ry="10"
          fill="none"
          stroke="rgba(226, 204, 150, 0.75)"
          strokeWidth="3"
        />
      </svg>
    )}
  </div>
);

const Overview: React.FC = () => (
  <div className="lite-overview">
    <div className="lite-overview-item">
      <Disc planet={PLANET_INFO.Sun} size="22vmin" />
      <span>{PLANET_INFO.Sun.label}</span>
    </div>
    {PLANET_ORDER.map((name) => {
      const planet = PLANET_INFO[name];
      return (
        <div key={name} className="lite-overview-item">
          <Disc planet={planet} size={`${planet.size * 7}vmin`} />
          <span>{planet.label}</span>
        </div>
      );
    })}
  </div>
);

const Orbits: React.FC = () => (
  <svg className="lite-orbits" viewBox="-110 -110 220 220">
    <circle r="7" fill="url(#lite-sun)" />
    <defs>
      <radialGradient id="lite-sun">
        <stop offset="0%" stopColor="#fff6c2" />
        <stop offset="100%" stopColor="#ff7a00" />
      </radialGradient>
    </defs>
    {PLANET_ORDER.map((name, i) => {
      const r = 14 + i * 11;
      // Spread the planets around so the labels don't collide
      const angle = (i * 137.5 * Math.PI) / 180;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      return (
        <g key={name}>
          <circle r={r} fill="none" stroke="rgba(255,255,255,0.18)" />
          <circle cx={x} cy={y} r={2.2} fill="#fff" />
          <text x={x} y={y - 4} fill="#cbd5e1" fontSize="6" textAnchor="middle">
            {PLANET_INFO[name].label}
          </text>
        </g>
      );
    })}
  </svg>
);

const PlanetView: React.FC<{ planet: PlanetInfo }> = ({ planet }) => (
  <div className="lite-planet">
    <Disc planet={planet} size="48vmin" />
    <h1>{planet.label}</h1>
    <dl>
      {planet.facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const MoonsView: React.FC<{ moons: string[] }> = ({ moons }) => {
  const byPlanet: Record<string, string[]> = {};
  for (const moon of moons) {
    const info = MOON_INFO[moon];
    if (!info) continue;
    (byPlanet[info.planet] ||= []).push(info.label);
  }
  return (
    <div className="lite-moons">
      {Object.entries(byPlanet).map(([planet, names]) => (
        <div key={planet} className="lite-moon-group">
          <Disc planet={PLANET_INFO[planet]} size="20vmin" />
          <h2>Måner rundt {PLANET_INFO[planet].label}</h2>
          <ul>
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const IssView: React.FC<{ position: IssPosition | null }> = ({ position }) => (
  <div className="lite-iss">
    <div className="lite-iss-icon">🛰️</div>
    <h1>Den internasjonale romstasjonen</h1>
    {position ? (
      <dl>
        <div>
          <dt>Breddegrad</dt>
          <dd>{Number(position.latitude).toFixed(2)}°</dd>
        </div>
        <div>
          <dt>Lengdegrad</dt>
          <dd>{Number(position.longitude).toFixed(2)}°</dd>
        </div>
      </dl>
    ) : (
      <p>Henter posisjon …</p>
    )}
  </div>
);

const LiteScene: React.FC<LiteSceneProps> = ({ toolCall, issPosition }) => {
  const [view, setView] = useState<View>({ kind: "overview" });
  const [displayComponent, setDisplayComponent] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (!toolCall) return;

    let args: any = {};
    try {
      args = JSON.parse(toolCall.arguments || "{}");
    } catch (error) {
      console.error("Failed to parse toolCall arguments:", error);
      return;
    }

    // Reset UI before handling a tool call, like the Spline scene
    setDisplayComponent(null);

    switch (toolCall.name) {
      case "focus_planet":
        if (PLANET_INFO[args.planet]) {
          setView({ kind: "planet", planet: args.planet });
        }
        break;
      case "display_data":
        setDisplayComponent(getComponent(args) || null);
        break;
      case "show_moons":
        setView({ kind: "moons", moons: args.moons || [] });
        break;
      case "get_iss_position":
        setView({ kind: "iss" });
        break;
      case "reset_camera":
        setView({ kind: "overview" });
        break;
      case "show_orbit":
        setView({ kind: "orbit" });
        break;
    }
  }, [toolCall]);

  let content: React.ReactNode;
  switch (view.kind) {
    case "planet":
      content = <PlanetView planet={PLANET_INFO[view.planet]} />;
      break;
    case "moons":
      content = <MoonsView moons={view.moons} />;
      break;
    case "orbit":
      content = <Orbits />;
      break;
    case "iss":
      content = <IssView position={issPosition} />;
      break;
    default:
      content = <Overview />;
  }

  return (
    <div className="scene-bg lite-scene">
      <div key={JSON.stringify(view)} className="lite-view">
        {content}
      </div>
      {displayComponent && <div className="lite-chart">{displayComponent}</div>}
    </div>
  );
};

export default LiteScene;
