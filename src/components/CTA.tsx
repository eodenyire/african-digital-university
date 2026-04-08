const CTA = () => {
  return (
    <section id="apply" className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(40, 90%, 52%) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(145, 55%, 22%) 0%, transparent 50%)" }} />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
          Ready to Shape Africa's <span className="text-gradient-gold">Digital Future?</span>
        </h2>
        <p className="text-primary-foreground/60 max-w-xl mx-auto mb-10 text-lg">
          Join thousands of Africans learning to build systems that serve a billion people. Applications are now open.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg hover:brightness-110 transition shadow-elevated">
            Start Your Application
          </a>
          <a href="#" className="px-8 py-4 rounded-xl border-2 border-primary-foreground/20 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/10 transition">
            Download Prospectus
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
