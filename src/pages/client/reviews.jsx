import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function Review() {
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: ''
  });

  const [hoveredStar, setHoveredStar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) return alert("Please select a star rating.");
    setReviews((prev) => [...prev, formData]);
    setFormData({ name: '', rating: 0, comment: '' });
    setHoveredStar(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F4] py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-black mb-8">Customer Reviews</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-pink-800">{review.name}</h2>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#86003C]">Leave a Review</h2>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#E41F7B]"
          />

          <div className="flex items-center space-x-2">
            <p className="text-gray-700">Your Rating:</p>
            <div className="flex">
              {Array(5).fill(0).map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    onClick={() => handleStarClick(ratingValue)}
                    onMouseEnter={() => setHoveredStar(ratingValue)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className={`cursor-pointer h-6 w-6 transition-colors ${
                      ratingValue <= (hoveredStar || formData.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <textarea
            name="comment"
            placeholder="Your review"
            value={formData.comment}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#E41F7B]"
          ></textarea>

          <button
            type="submit"
            className="bg-[#E41F7B] hover:bg-[#FF8BA0] text-white font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
