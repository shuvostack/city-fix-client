import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Local Resident",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      comment: "CityFix has completely changed how I report issues. I reported a broken streetlight in front of my house, and it was fixed within 48 hours! Truly impressive."
    },
    {
      id: 2,
      name: "Rahim Uddin",
      role: "Community Volunteer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      comment: "Being able to track the status of my reports gives me so much peace of mind. The dashboard is super easy to use. Highly recommended for every citizen!"
    },
    {
      id: 3,
      name: "Priya Das",
      role: "University Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      rating: 4,
      comment: "I love the leaderboard feature! It motivates me to report more issues and keep my neighborhood clean. Great initiative by the team."
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      comment: "Finally, a platform that listens. The 'High Priority' tag actually works. Had a major pothole near my shop fixed in no time. Thank you, CityFix!"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Quote size={14} className="fill-current" />
            Citizen Voices
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-500 text-lg">
            Real stories from citizens who are making a difference in their communities using CityFix.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              centeredSlides: false, 
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
          }}
          className="pb-16" 
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="h-full">
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group">
                
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 text-gray-200 group-hover:text-primary/10 transition-colors duration-300">
                   <Quote size={48} className="fill-current" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 mb-8 italic leading-relaxed relative z-10">
                  "{review.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wide">{review.role}</p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;