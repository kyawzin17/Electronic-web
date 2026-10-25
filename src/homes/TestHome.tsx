import "./home.css";
import fullCircuitD from "../assets/full-circuit-d.webp";
import fullCircuitL from "../assets/full-circuit-l.webp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const projects = [
  {
    title: "Ultrasonic Distance Alert",
    description: "Use an ultrasonic sensor to detect distance and activate a buzzer when something is near.",
    level: "Beginner",
    tags: ["Ultrasonic Sensor", "Buzzer"],
    kind: "ultrasonic",
  },
  {
    title: "LED Blink",
    description: "Learn the basics of Arduino by blinking an LED with simple code.",
    level: "Beginner",
    tags: ["LED", "Resistor"],
    kind: "led",
  },
  {
    title: "LCD Message Display",
    description: "Display text on a 16×2 LCD screen using Arduino and I²C connection.",
    level: "Intermediate",
    tags: ["LCD1602", "I²C"],
    kind: "lcd",
  },
];

function CircuitIllustration({ isDark }: { isDark: boolean }) {

  return <div className="sim-window" aria-label="Circuit simulator preview">
    <div className="sim-titlebar">
        <div className="window-dots">
            <i/><i/><i/>
        </div>
        <span>RDE Circuit Simulator</span>
        <span className="titlebar-menu">⌄</span>
    </div>
    <div>
        <img src={isDark ? fullCircuitD : fullCircuitL} alt="Circuit illustration" />
    </div>

  </div>;
}

function ProjectPreview({ kind }: { kind: string }) {

  return <div className={`project-preview ${kind}`}>
    <div className="mini-arduino"><b>∞</b><small>UNO</small></div>
    {kind !== "led" && <div className="mini-breadboard"/>}
    {kind === "ultrasonic" && <div className="mini-ultra"><i/><i/></div>}
    {kind === "lcd" && <div className="mini-lcd">RDE Electronics<br/>Hello Myanmar!</div>}
    {kind === "led" && <div className="mini-led"/>}
    <svg viewBox="0 0 300 120" preserveAspectRatio="none"><path d="M65 45 V15 H130 V30 H220 V60" stroke="#ff4b55"/><path d="M70 50 V25 H140 V38 H230 V70" stroke="#12e5c3"/><path d="M80 55 V35 H150 V48 H240 V80" stroke="#17bfff"/></svg>
  </div>;
}

export default function CircuitLandingPage() {

    const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    // လက်ရှိ theme ကို ချက်ချင်းစစ်ဆေးမယ်
    updateTheme();

    // Theme Button က html class ပြောင်းတာကို စောင့်ကြည့်မယ်
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return <main className="rde-landing pb-24" id="top">

    <section className="hero shell" id="simulator">
      <div className="circuit-decoration decor-left" aria-hidden="true"/>
      <div className="circuit-decoration decor-right" aria-hidden="true"/>
      <div className="hero-copy">
        <div className="eyebrow">RDE CIRCUIT SIMULATOR <span>•</span> PUBLIC ALPHA</div>
        <h1>Build circuits.<br/>Run code.<br/><span>Learn by doing.</span></h1>
        <p>Design Arduino circuits, add components, write and test your code directly in your browser. No installation needed.</p>
        <div className="hero-actions">
            <Link className="primary-btn" to="/circuit">▶ <span>Start Building</span></Link>
            <Link className="secondary-btn" to="/docs/doc/components">◇ <span>Explore Components</span></Link></div>
        <div className="hero-benefits"><span>ϟ <small>No installation</small></span><span>♧ <small>Beginner friendly</small></span><span>♡ <small>Free to explore</small></span></div>
      </div>
      <div className="hero-visual"><CircuitIllustration isDark={isDark}/></div>
    </section>

    <section className="feature-strip shell" id="components">
      <article>
                <div className="feature-icon">▦</div>
                <div>
                    <h3>Design circuits</h3>
                    <p className="text-text-secondary">Drag &amp; drop components, connect wires and build your ideas.</p>
                </div>
        </article>
      <article><div className="feature-icon purple">&lt;/&gt;</div><div><h3>Write Arduino code</h3><p>Edit, compile and run your sketches directly in the simulator.</p></div></article>
      <article><div className="feature-icon">♧</div><div><h3>Learn step by step</h3><p>Bilingual documentation and component guides for Myanmar learners.</p></div></article>
    </section>

    <section className="projects shell mt-16" id="projects">
      <div className="section-heading">
        <div>
            <h2>Try these popular projects</h2>
            </div>
                <Link to="/circuit/project">
                    View all projects <span>→</span>
                </Link>
            </div>
      <div className="project-grid">{projects.map(project => <article className="project-card" key={project.title}>
        <ProjectPreview kind={project.kind}/>
        <div className="project-info">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-meta">
                <span className={project.level === "Intermediate" ? "level intermediate" : "level"}>{project.level}</span>
                {project.tags.map(tag => 
                    <span className="tag" key={tag}>♧ {tag}</span>
                    )}
            </div>
        </div>
        <Link className="card-arrow" to={`/circuit/${project.title}`} aria-label={`Open ${project.title}`}>›</Link>
      </article>)}
      </div>
    </section>

    <section className="how shell mt-16" id="learn">
      <div className="section-kicker centered"><span/> HOW IT WORKS <span/></div>
      <div className="steps">
        <article><b className="step-number">1</b><span className="step-icon">⬡</span>
        <div><h3>Place components</h3><p>Add the components you need<br/>from the library.</p></div>
        </article><span className="step-chevron">›</span>
        <article><b className="step-number purple-border">2</b><span className="step-icon">♧</span><div><h3>Connect wires</h3><p>Make the right connections<br/>on the breadboard.</p></div></article><span className="step-chevron">›</span>
        <article><b className="step-number">3</b><span className="step-icon">▷</span><div><h3>Run your code</h3><p>Click run and see your circuit<br/>come to life!</p></div></article>
      </div>
    </section>
  </main>;
}
