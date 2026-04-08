import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <div className="animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 text-secondary text-sm font-medium mb-6">
            🌍 Africa's Premier Digital University
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mx-auto mb-6">
            <span className="text-primary-foreground">Train Africans to</span>
            <br />
            <span className="text-gradient-gold">Build Africa's Future</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/70 font-light">
            From software engineering to AI, FinTech to GovTech — ADU is building the continent's next generation of tech leaders through project-based, real-world learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#programs" className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg hover:brightness-110 transition shadow-elevated">
              Explore Programs
            </a>
            <a href="#apply" className="px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/10 transition">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
