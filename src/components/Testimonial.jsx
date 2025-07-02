import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      avatar: "/assets/images/testimonial-1.png",
      content:
        "codeintervu's courses transformed my career. The hands-on projects and expert instructors helped me land my dream job within 3 months of completing the program.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UI/UX Designer",
      avatar: "/assets/images/testimonial-2.png",
      content:
        "The quality of education here is unmatched. I went from complete beginner to confident designer thanks to their comprehensive curriculum and supportive community.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Data Scientist",
      avatar: "/assets/images/testimonial-3.png",
      content:
        "As a working professional, I needed flexible learning options. codeintervu's self-paced courses with mentor support were perfect for my schedule and learning style.",
      rating: 4,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Full-stack Developer",
      avatar: "/assets/images/testimonial-1.png",
      content:
        "The practical skills I gained were immediately applicable at work. My salary increased by 40% after completing just two courses from codeintervu.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <p className="text-center uppercase text-sm font-medium tracking-wider mb-4 text-radical-red dark:text-red-500">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold font-league-spartan text-center mb-8 text-gray-900 dark:text-white">
          What Our{" "}
          <span className="text-kappel dark:text-teal-400">Students</span> Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-isabelline dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-league-spartan font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <p className="mb-6 italic text-gray-900 dark:text-gray-100">
                "{testimonial.content}"
              </p>

              <div className="flex text-selective-yellow">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-selective-yellow dark:text-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
