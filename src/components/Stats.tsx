const stats = [
  { value: "54", label: "African Countries", suffix: "" },
  { value: "6", label: "Schools", suffix: "" },
  { value: "100", label: "Courses", suffix: "+" },
  { value: "0", label: "Tuition Barrier", suffix: "" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient-gold mb-2">
                {s.value}{s.suffix}
              </div>
              <div className="text-primary-foreground/60 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
