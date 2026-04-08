import aduLogo from "@/assets/adu-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img src={aduLogo} alt="ADU" className="h-12 mb-4" />
            <p className="text-primary-foreground/50 text-sm">
              Part of the African Digital Technologies ecosystem. Training Africa's next generation of tech builders.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Programs</h4>
            {["Software Engineering", "AI & Data Science", "FinTech", "Internet Systems"].map((l) => (
              <a key={l} href="#" className="block text-sm text-primary-foreground/50 hover:text-secondary transition-colors mb-2">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Ecosystem</h4>
            {["AfriTube", "AfroMail", "AfriSearch", "AfriCloud"].map((l) => (
              <a key={l} href="#" className="block text-sm text-primary-foreground/50 hover:text-secondary transition-colors mb-2">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Connect</h4>
            {["admissions@adu.africa", "Twitter/X", "LinkedIn", "WhatsApp Community"].map((l) => (
              <a key={l} href="#" className="block text-sm text-primary-foreground/50 hover:text-secondary transition-colors mb-2">{l}</a>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/30 text-sm">
          © 2026 African Digital University. A product of African Digital Technologies.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
