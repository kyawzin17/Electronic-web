import "./home.css";
import { Link } from "react-router-dom";
import ImageCarousel from "./HomeImage";
import { FaArrowRight } from "react-icons/fa6";

const projects = [
  {
    title: "LED Blink",
    description: "Learn the basics of Arduino by blinking an LED with simple code.",
    level: "Beginner",
    tags: ["LED", "Resistor"],
    kind: "led",
    url: "/circuit/?project=project-1791991873555-258ice"
  },
  {
    title: "Ultrasonic Distance Alert",
    description: "Use an ultrasonic sensor to detect distance and activate a buzzer when something is near.",
    level: "Beginner",
    tags: ["Ultrasonic Sensor", "Buzzer"],
    kind: "ultrasonic",
    url: "/circuit/?project=project-1792315039378-uo9yy6"
  },
  {
  title: "Keypad Password Lock",
  description:
    "Build a password entry system using a 4×4 keypad and Arduino to enter and verify a security code.",
  level: "Intermediate",
  tags: ["4×4 Keypad", "Arduino", "Password"],
  kind: "keypad",
  url: "/circuit/?project=project-1792986116717-510d2v"
}
];

function CircuitIllustration() {

  return <div className="sim-window" aria-label="Circuit simulator preview">
          <div className="sim-titlebar">
              <div className="window-dots">
                  <i/><i/><i/>
              </div>
              <span>RDE Circuit Simulator</span>
              <span className="titlebar-menu">⌄</span>
          </div>
          <div>
              <ImageCarousel />
          </div>

  </div>;
}

function ProjectPreview({ kind }: { kind: string }) {

  return (
<div className={`project-preview ${kind}`}>
  <div className="mini-arduino">
    <b>∞</b>
    <small>UNO</small>
  </div>

  {kind !== "led" && (
    <div className="mini-breadboard" />
  )}

  {kind === "ultrasonic" && (
    <div className="mini-ultra">
      <i />
      <i />
    </div>
  )}

  {kind === "keypad" && (
    <div className="mini-keypad">
      {["1", "2", "3", "A",
        "4", "5", "6", "B",
        "7", "8", "9", "C",
        "*", "0", "#", "D"].map((key) => (
        <span key={key}>{key}</span>
      ))}
    </div>
  )}

  {kind === "lcd" && (
    <div className="mini-lcd">
      RDE Electronics
      <br />
      Hello Myanmar!
    </div>
  )}

  {kind === "led" && (
    <div className="mini-led" />
  )}

  <svg
    viewBox="0 0 300 120"
    preserveAspectRatio="none"
  >
    <path
      d="M65 45 V15 H130 V30 H220 V60"
      stroke="#ff4b55"
    />
    <path
      d="M70 50 V25 H140 V38 H230 V70"
      stroke="#12e5c3"
    />
    <path
      d="M80 55 V35 H150 V48 H240 V80"
      stroke="#17bfff"
    />
  </svg>
</div>
  )
}

export default function CircuitLandingPage() {

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
      <div className="hero-visual"><CircuitIllustration /></div>
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
      <div className="project-grid">
        {projects.map(project => 
        <article className="project-card" key={project.title}>
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
          <Link className="card-arrow bg-secondary/50 text-text-main/60 hover:text-text-main border border-text-secondary" to={`${project.url}`} aria-label={`Open ${project.title}`}>
            <FaArrowRight size={16}/>
          </Link>
      </article>)}
      </div>
    </section>

    <section className="how shell mt-16" id="learn">
      <div className="section-kicker centered"><span/> HOW IT WORKS <span/></div>
      <div className="steps">
        <article>
          <b className="step-number">1</b><span className="step-icon">⬡</span>
          <div><h3>Place components</h3><p>Add the components you need<br/>from the library.</p></div>
        </article>
        <span className="step-chevron">›</span>
        <article>
          <b className="step-number purple-border">2</b><span className="step-icon">♧</span><div><h3>Connect wires</h3><p>Make the right connections<br/>on the breadboard.</p></div></article><span className="step-chevron">›</span>
        <article><b className="step-number">3</b><span className="step-icon">▷</span><div><h3>Run your code</h3><p>Click run and see your circuit<br/>come to life!</p></div></article>
      </div>
    </section>
  </main>;
}
