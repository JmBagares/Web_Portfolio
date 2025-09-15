import React from "react";
import { Navigation } from "./components/Navigation";
import { SectionHeader } from "./components/SectionHeader";
import { Button } from "./components/Button";
import { SkillChip } from "./components/SkillChip";
import { ProjectCard } from "./components/ProjectCard";
import { Lightbox } from "./components/Lightbox";
import { ContactForm } from "./components/ContactForm";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Github,
  Facebook,
  Instagram,
  MapPin,
  Mail,
  Calendar,
  ChevronUp,
  Filter,
} from "lucide-react";

/* --------------------  ADD: image resolver (works with Vite build & GH Pages) -------------------- */
// Eagerly import all images under src/assets/img so Vite bundles them and gives us URLs
const _imgsRel = import.meta.glob("./assets/img/**/*.{png,jpg,jpeg,svg,gif,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const _imgsAbs = import.meta.glob("/src/assets/img/**/*.{png,jpg,jpeg,svg,gif,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function resolveImage(path: string): string {
  if (!path) return "";
  // normalize common variants (and typos like assests -> assets, just in case)
  let p = path.replace(/assests/g, "assets");

  // try a few path shapes users commonly write
  const candidates = [
    p,
    p.replace(/^src\//, "./"),
    p.replace(/^\.\/?/, "/src/"),
    "./" + p.replace(/^src\//, ""),
  ];

  for (const c of candidates) {
    if (c in _imgsRel) return _imgsRel[c];
    if (c in _imgsAbs) return _imgsAbs[c];
  }
  return "";
}
/* ------------------------------------------------------------------------------------------------ */

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [currentSection, setCurrentSection] = React.useState("home");
  const [lightboxState, setLightboxState] = React.useState({
    isOpen: false,
    currentIndex: 0,
  });
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("All");

  React.useEffect(() => {
    setIsLoaded(true);

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    // Back to top scroll listener
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skillCategories = {
    Frontend: [
      "TypeScript",
      "React",
      "Vite",
      "Bootstrap",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    Mobile: ["React-Native", "Expo-Go"],
    CMS: ["WordPress", "Elementor"],
    Tools: ["Git", "Photoshop"],
    Other: ["PC Assembly & Troubleshooting", "Basic Video Editing"],
  };

  const projects = [
    {
      title: "Magnaval Services",
      description:
        "Company site built with WordPress and Elementor showcasing IT and security services.",
      tags: ["WordPress", "Elementor", "CSS"],
      category: "WordPress",
      image: "src/assets/img/Screenshot 2025-09-08 171637.png",
      primaryCTA: {
        label: "Live Site",
        href: "https://magnavalservices.com/",
        disabled: false,
      },
    },
    {
      title: "Warduz Petshop",
      description:
        "E-commerce website for a pet supply store, built with WordPress and Elementor.",
      tags: ["WordPress", "Elementor", "CSS"],
      category: "WordPress",
      image: "src/assets/img/Screenshot 2025-09-08 171713.png",
      primaryCTA: {
        label: "Live Site",
        href: "https://warduzpetshop.com/",
        disabled: false,
      },
    },
    {
      title: "CVSU Website Redesign",
      description: "Simple HTML/CSS website from 2nd year.",
      tags: ["Web Design", "First Web project", "HTML/CSS"],
      category: "Design",
      image: "src/assets/img/enrollment.png",
      primaryCTA: {
        label: "Source Code",
        href: "https://github.com/Jmbagares/CvsuWebsite",
        disabled: false,
      },
    },
    {
      title: "WEBIT",
      description: "Pseudo website for a web dev services company.",
      tags: ["Web Design", "Bootstrap", "HTML/CSS"],
      category: "Design",
      image: "src/assets/img/WebIT.png",
      primaryCTA: {
        label: "Source Code",
        href: "https://github.com/Jmbagares/WebDesign",
        disabled: false,
      },
    },
    {
      title: "Custom Hoodie Design",
      description: "Hoodie design for UPHSD 12 ICT 2; concept artwork.",
      tags: ["Product Design", "Adobe Illustrator", "Adobe Photoshop"],
      category: "Design",
      image: "src/assets/img/hoodie.png",
      primaryCTA: {
        label: "View Design",
        href: "https://www.facebook.com/share/p/1Ex4yZaLPc/",
        disabled: false,
      },
    },
    {
      title: "YZZK — Fan Art",
      description: "Artwork of a favorite PH rapper (2020).",
      tags: ["Vector Art", "Illustration", "Adobe Photoshop"],
      category: "Design",
      image: "src/assets/img/YZZK.png",
      primaryCTA: {
        label: "View Artwork",
        href: "https://www.instagram.com/p/B9WuMx7nvAM/",
        disabled: false,
      },
    },
  ];

  const filterCategories = ["All", "WordPress", "Design"];

  /* --------------------  USE the resolver: build a resolved copy for runtime  -------------------- */
  const projectsResolved = React.useMemo(
    () => projects.map((p) => ({ ...p, image: resolveImage(p.image) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filteredProjects =
    activeFilter === "All"
      ? projectsResolved
      : projectsResolved.filter((project) => project.category === activeFilter);

  const lightboxImages = projectsResolved.map((project) => ({
    src: project.image,
    title: project.title,
    alt: project.description,
  }));
  /* ----------------------------------------------------------------------------------------------- */

  const openLightbox = (index: number) => {
    setLightboxState({ isOpen: true, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightboxState({ isOpen: false, currentIndex: 0 });
  };

  const nextImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % lightboxImages.length,
    }));
  };

  const prevImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? lightboxImages.length - 1
          : prev.currentIndex - 1,
    }));
  };

  return (
    <div
      className={`min-h-screen bg-background ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <Navigation
        theme={theme}
        onThemeToggle={toggleTheme}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* Hero Section */}
      <section id="home" className="relative py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-accent mb-4 uppercase tracking-wide font-medium animate-slide-up">
                Hello, I'm
              </p>
              <h1 className="text-xl  mb-6 animate-slide-up stagger-1">
                Jan Manuel Bagares
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-slide-up stagger-2">
                Computer Science student and front-end developer building
                responsive, accessible web experiences with React, TypeScript,
                and WordPress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-3">
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => scrollToSection("#projects")}
                >
                  View Projects
                </Button>
                <Button
                  variant="secondary"
                  size="large"
                  href="mailto:jmbagares52@gmail.com"
                >
                  Contact Me
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* USE resolver for hero image */}
                <ImageWithFallback
                  src={resolveImage("src/assets/img/img.png")}
                  alt="Developer illustration"
                  className="w-64 h-auto rounded-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-16 sm:py-12 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="About Me" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed mb-6">
                Passionate Computer Science student with hands-on experience in
                front-end development using HTML, CSS, JavaScript, React.js, and
                WordPress (Elementor). I focus on building responsive,
                accessible interfaces and design-system-driven UIs. Comfortable
                with TypeScript, modern tooling (Vite), and version control
                (Git). Quick problem solver and eager to contribute to
                real-world projects.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Las Piñas, Philippines</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a
                  href="mailto:jmbagares52@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  jmbagares52@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="bg-success/10 text-success px-3 py-1 rounded-full">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-16 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Skills" />
          <div className="space-y-8">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category}>
                <h3 className="mb-4 text-primary">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <SkillChip key={index}>{skill}</SkillChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 md:py-16 sm:py-12 bg-muted/50 max-h-[600px] overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Projects" />

          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const originalIndex = projectsResolved.findIndex(
                (p) => p.title === project.title
              );
              return (
                <div
                  key={project.title}
                  className={`transition-all duration-300 ${
                    filteredProjects.includes(project)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <ProjectCard
                    {...project}
                    onImageClick={() => openLightbox(originalIndex)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-16 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Education" />
          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="mb-2">
                    Cavite State University – Bacoor Campus
                  </h3>
                  <p className="text-primary font-medium">
                    Bachelor of Science in Computer Science
                  </p>
                </div>
                <span className="text-muted-foreground">2022 — Present</span>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Specializing in software dev, UI/UX, full-stack</li>
                <li>• React, React Native, TypeScript, Vite, Expo</li>
                <li>• Bootstrap, Tailwind, WordPress, Elementor</li>
                <li>• Git, Photoshop, PC assembly/troubleshooting</li>
                <li className="flex items-center gap-2">
                  • Thesis: PetSOS — AI-assisted geolocation & automated
                  response system for community-based animal rescue in
                  Dasmariñas City
                  <span className="flex items-center gap-1 text-accent">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot"></span>
                    <span className="text-sm">(Ongoing)</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="mb-2">
                    University of Perpetual Help System DALTA — Las Piñas Campus
                  </h3>
                  <p className="text-primary font-medium">
                    Senior High School — ICT Strand
                  </p>
                </div>
                <span className="text-muted-foreground">Graduated</span>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Foundations in systems, networking, basic programming</li>
                <li>• Problem-solving, digital tools, documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-16 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Let's Connect" />
        <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground">
              Ready to bring your ideas to life? Let's discuss your next
              project.
            </p>
          </div>

          <ContactForm />

          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground">
                <span>Las Piñas, Philippines</span>
                <span className="hidden sm:block">•</span>
                <a
                  href="mailto:jmbagares52@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  jmbagares52@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/JmBagares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/jm.bagares.14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/ziim_69/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Jan Manuel Bagares.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        images={lightboxImages}
        currentIndex={lightboxState.currentIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Back to Top FAB */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover-lift flex items-center justify-center"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
