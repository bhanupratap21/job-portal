import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#6A3862] mb-8">
        About Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image / Illustration */}
        <div>
          <img
            src="../assets/teamwork-svgrepo-com.svg"
            alt="Team illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Connecting Talent with Opportunity
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to <strong>JobMatch</strong> — your trusted platform for
            finding jobs that match your skills, passion, and career goals. We
            believe that job hunting should be seamless, efficient, and
            transparent for both job seekers and employers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you're a student looking for internships, a professional
            looking for a new role, or a company searching for the right
            candidate — we’re here to help.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to create a powerful bridge between talent and
            opportunity using modern technology and real-time job updates.
          </p>
        </div>
      </div>

      {/* Vision / Mission Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Our Vision & Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-bold mb-2 text-[#7209b7]">Integrity</h3>
            <p className="text-gray-600">
              We maintain transparency and honesty in everything we do.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-bold mb-2 text-[#7209b7]">
              Innovation
            </h3>
            <p className="text-gray-600">
              Continuously evolving to make hiring easier, faster, and better.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-bold mb-2 text-[#7209b7]">
              Empowerment
            </h3>
            <p className="text-gray-600">
              We empower individuals and organizations to thrive through better
              hiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
