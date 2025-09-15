import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { Github, Facebook, Instagram, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/JmBagares",
    label: "GitHub",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/jm.bagares.14",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ziim_69/",
    label: "Instagram",
  },
];

interface NavigationProps {
  theme: "light" | "dark";
  onThemeToggle: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({
  theme,
  onThemeToggle,
  currentSection,
  onSectionChange,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position (55% viewport)
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.55;

      const currentSectionFound = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= triggerPoint && rect.bottom >= triggerPoint;
        }
        return false;
      });

      if (currentSectionFound && currentSectionFound !== currentSection) {
        onSectionChange(currentSectionFound);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, onSectionChange]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update current section immediately when clicked
      onSectionChange(href.substring(1));
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 nav-shadow ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-semibold text-xl text-primary">
              Jan Manuel
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`nav-link text-foreground hover:text-primary transition-colors duration-200 ${
                  currentSection === link.href.substring(1) ? "active" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />

            {/* Download CV Button */}
            <Button
              href="/JanManuelBagares_CV.pdf"
              download="JanManuelBagares_CV.pdf"
              variant="primary"
              size="large"
            >
              Download CV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-border mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Button variant="primary" className="flex-1 mr-2">
                    Download CV
                  </Button>
                  <ThemeToggle theme={theme} onToggle={onThemeToggle} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
