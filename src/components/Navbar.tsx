import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import aduLogo from "@/assets/adu-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Programs", "Academy", "Research", "About", "Apply"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <img src={aduLogo} alt="ADU Logo" className="h-10 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-primary-foreground/80 hover:text-secondary transition-colors">
              {l}
            </a>
          ))}
          <a href="#apply" className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:brightness-110 transition">
            Enroll Now
          </a>
        </div>
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-foreground border-t border-primary/20 px-4 pb-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block py-3 text-primary-foreground/80 hover:text-secondary transition-colors" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#apply" className="block mt-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-center">
            Enroll Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
