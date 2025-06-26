import React from "react";

const StatsComponent = () => {
  const stats = [
    {
      value: "29.3k",
      label: "Student Enrolled",
      color: "bg-[rgba(42,189,187,0.1)]",
      textColor: "text-kappel",
    },
    {
      value: "32.4K",
      label: "Class Completed",
      color: "bg-[rgba(255,45,85,0.1)]",
      textColor: "text-radical-red",
    },
    {
      value: "100%",
      label: "Satisfaction Rate",
      color: "bg-[rgba(170,75,41,0.1)]",
      textColor: "text-[#AA4B29]",
    },
    {
      value: "354+",
      label: "Top Instructors",
      color: "bg-[rgba(255,183,3,0.1)]",
      textColor: "text-selective-yellow",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} p-8 rounded-xl text-center`}
            >
              <h3
                className={`${stat.textColor} text-3xl font-bold font-league-spartan mb-2`}
              >
                {stat.value}
              </h3>
              <p className="font-league-spartan font-medium uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
