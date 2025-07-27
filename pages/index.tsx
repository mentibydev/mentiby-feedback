import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { STARTING_ENROLLMENT_NUMBER, COHORT_TYPE, COHORT_NUMBER } from '../config/enrollmentConfig';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not set');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function mentibyFeedbackForm() {
  
  
  const [form, setForm] = useState({
    yourName: '',
    enrollmentID: '',
    mentor1Name: '',
    mentor2Name: '',
    batch: '',
    cohort: '',
    mentor1Feedback: '',
    mentor2Feedback: '',
    mentibyOverallFeedback: '',
    challengesFaced: '',
    suggestionsToImprove: '',
    mentorTeachingStyleRating: '',
    overallMentibyRating: ''
  });


  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes for all form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    if (!/^\d+$/.test(form.cohort)) {
      setError('Please enter only numbers for the Cohort field.');
      setLoading(false);
      return;
    }
    const enrollmentPattern = /^\d{2}[A-Za-z]{3}\d{4}$/;
    if (!enrollmentPattern.test(form.enrollmentID)) {
      setError('Roll Number must follow the format: 25MBY2001 (2 digits, 3 letters, 4 digits).');
      setLoading(false);
      return;
    }
    try{

      // Prepare data for Supabase (Mentiby feedback form fields)
      const submissionData = {
        'Full Name': form.yourName,
        'EnrollmentID': form.enrollmentID,
        'Mentor 1': form.mentor1Name,
        'Mentor 2': form.mentor2Name,
        'Batch': form.batch,
        'Cohort': form.cohort,
        'Mentor 1 Feedback': form.mentor1Feedback,
        'Mentor 2 Feedback': form.mentor2Feedback,
        'Mentiby Overall Feedback': form.mentibyOverallFeedback,
        'Challenges Faced': form.challengesFaced,
        'Suggestions to Improve': form.suggestionsToImprove,
        'Mentor Teaching Style Rating': form.mentorTeachingStyleRating,
        'Overall Mentiby Rating': form.overallMentibyRating
      };
      console.log('Submitting feedback:', submissionData);
      // Insert into Supabase with better error handling
      const { data, error } = await supabase
        .from('mentibyFeedback')
        .insert([submissionData])
        .select();

      if (error) {
        console.log('Error inserting feedback:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      setSuccess(true);

      // Clear form data for security (Mentiby feedback form reset)
      setForm({
        yourName: '',
        enrollmentID: '',
        mentor1Name: '',
        mentor2Name: '',
        batch: '',
        cohort: '',
        mentor1Feedback: '',
        mentor2Feedback: '',
        mentibyOverallFeedback: '',
        challengesFaced: '',
        suggestionsToImprove: '',
        mentorTeachingStyleRating: '',
        overallMentibyRating: ''
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values instead of Math.random() to avoid hydration mismatch
          const left = ((i * 37 + 13) % 100);
          const top = ((i * 43 + 17) % 100);
          const delay = (i * 0.7) % 5;
          const duration = 3 + (i % 4);

          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            ></div>
          );
        })}
      </div>

      {/* Success Page - Full Screen */}
      {success ? (
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-8">
            {/* Success Animation */}
            <div className="mb-12 animate-fadeIn">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-6xl">🎉</span>
                </div>
                {/* Sparkle effects around checkmark */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${20 + ((i % 2) * 60)}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback Submission Acknowledgment */}
            <div className="space-y-8 animate-fadeIn">
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
                Thank You for Your Feedback!
              </h1>

              <div className="h-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg max-w-2xl mx-auto"></div>

              <p className="text-3xl md:text-4xl text-gray-100 font-light tracking-wide leading-relaxed">
                🙏 We appreciate your valuable input.
              </p>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your feedback has been submitted successfully. Thank you for helping us improve MentiBY!
              </p>

              {/* Additional celebration elements */}
              <div className="mt-16 space-y-6">
                <div className="flex justify-center space-x-8 text-6xl">
                  <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎯</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>💫</span>
                </div>

                <p className="text-lg text-purple-200">
                  You may close this page or submit more feedback if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 animate-gradient drop-shadow-2xl">
                MentiBY
              </h1>
              <div className="h-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
            <p className="text-gray-200 text-2xl mt-10 font-light tracking-wide">Join the Future of Learning ✨</p>
          </div>

          {/* Glassmorphism Form Container */}
          <div className="backdrop-blur-3xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-lg animate-pulse"></div>

            <div className="relative z-10">
              <form className="space-y-12" onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="space-y-8">
                  <div className="flex items-center mb-10">
                    <div className="w-4 h-12 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full mr-6 shadow-lg animate-pulse"></div>
                    <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                      Feedback Form
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Your Name */}
                    <div className="form-group group">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Your Name</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="yourName"
                          value={form.yourName}
                          
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Enter Your Name"
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    {/* Roll Number */}
                    <div className="form-group group">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Roll Number</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="enrollmentID"
                          value={form.enrollmentID}
                          pattern="\d{2}[A-Za-z]{3}\d{4}"
                          title="Roll Number must follow the format: 25MBY2001"
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Enter your Roll Number"
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Mentor 1 Name */}
                    <div className="form-group group">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Mentor 1 Name</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="mentor1Name"
                          value={form.mentor1Name}
                          
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Enter Mentor 1 Name"
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Mentor 2 Name */}
                    <div className="form-group group">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Mentor 2 Name</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="mentor2Name"
                          value={form.mentor2Name}
                          
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Enter Mentor 2 Name"
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Batch */}
                    <div className="form-group group">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Batch</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          name="batch"
                          value={form.batch}
                          
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Enter Batch (Basic or Placement)"
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Cohort */}
                    <div className="form-group group">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Cohort</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="number"
                          name="cohort"
                          value={form.cohort}
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Enter Cohort Number (e.g., 1)"
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Mentor 1 Feedback */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Mentor 1 Feedback</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          name="mentor1Feedback"
                          value={form.mentor1Feedback}
                          
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Write Mentor 1 Feedback"
                          rows={3}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Mentor 2 Feedback */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Mentor 2 Feedback</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          name="mentor2Feedback"
                          value={form.mentor2Feedback}
                          
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Write Mentor 2 Feedback"
                          rows={3}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Mentiby Overall Feedback */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Mentiby Overall Feedback</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          name="mentibyOverallFeedback"
                          value={form.mentibyOverallFeedback}

                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Write Overall Feedback"
                          rows={3}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                     {/* Mentor Teaching Style Rating */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">
                          Mentor Teaching Style Rating (1-5)
                        </span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="number"
                          name="mentorTeachingStyleRating"
                          value={form.mentorTeachingStyleRating}
                          min="1"
                          max="5"
                          step="1"
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Rate Mentor Teaching Style out of 5"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Overall Mentiby Rating */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">
                          Overall Mentiby Rating (1-5)
                        </span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="number"
                          name="overallMentibyRating"
                          value={form.overallMentibyRating}
                          min="1"
                          max="5"
                          step="1"
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Rate Overall Mentiby out of 5"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    {/* Challenges Faced */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Challenges Faced</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          name="challengesFaced"
                          value={form.challengesFaced}

                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Mention Challenges Faced"
                          rows={3}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Suggestions to Improve */}
                    <div className="form-group group md:col-span-2">
                      <label className="form-label font-black text-xl md:text-2xl mb-4 block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-purple-100 font-black tracking-wide">Suggestions to Improve</span> <span className="text-pink-400 font-black">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          name="suggestionsToImprove"
                          value={form.suggestionsToImprove}
                          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-white/90 to-gray-50/90 border-2 border-transparent text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                          placeholder="Your Suggestions to Improve"
                          rows={3}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                   
                  </div>

                </div>

                
                {/* Submit Button */}
                <div className="text-center pt-10">
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Submit Mentiby Feedback"
                    className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-xl rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-purple-500/25 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                    onClick={e => {
                      if (loading) {
                        e.preventDefault();
                        return;
                      }
                    }}
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting your feedback...</span>
                        </>
                      ) : (
                        <>
                          <span className="group-hover:animate-bounce">🚀</span>
                          <span>Submit Your Feedback</span>
                          <span className="group-hover:animate-pulse">✨</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Enhanced Status Messages */}
                {error && (
                  <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 backdrop-blur-sm animate-fadeIn">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">⚠</span>
                      </div>
                      <p className="text-red-300 font-semibold text-lg">
                        Oops! Something went wrong. Please try again.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(-8px) rotate(240deg) scale(0.9); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .form-group {
          @apply relative;
        }
        
        .form-label {
          @apply block text-gray-100 font-bold mb-4 text-lg tracking-wide;
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .input-wrapper, .select-wrapper, .textarea-wrapper {
          @apply relative;
        }
        
        .input-glow, .select-glow, .textarea-glow {
          @apply absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-pink-400/0 opacity-0 transition-opacity duration-300 pointer-events-none;
        }
        
        .input-wrapper:hover .input-glow,
        .select-wrapper:hover .select-glow,
        .textarea-wrapper:hover .textarea-glow {
          @apply opacity-100;
          animation: glow 2s ease-in-out infinite;
        }
        
        .skill-checkbox {
          @apply cursor-pointer relative;
        }
        
        .skill-card {
          @apply relative flex items-center p-5 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-2 border-purple-400/20 transition-all duration-300 hover:border-purple-400/50 hover:scale-105 backdrop-blur-sm;
        }
        
        .skill-checkbox input:checked + .skill-card {
          @apply bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-purple-400 shadow-lg shadow-purple-400/20;
        }
        
        .skill-icon {
          @apply relative mr-4;
        }
        
        .skill-check {
          @apply w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300;
        }
        
        .skill-checkbox input:checked + .skill-card .skill-check {
          @apply bg-gradient-to-r from-purple-500 to-pink-500 border-transparent;
        }
        
        .skill-checkbox input:not(:checked) + .skill-card .skill-check svg {
          @apply opacity-0;
        }
        
        .skill-text {
          @apply text-gray-100 font-semibold text-lg;
        }
        
        .skill-glow {
          @apply absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-pink-400/0 opacity-0 transition-opacity duration-300 pointer-events-none;
        }
        
        .skill-checkbox:hover .skill-glow {
          @apply opacity-100;
          animation: glow 1.5s ease-in-out infinite;
        }
        
        .submit-button {
          @apply relative w-full py-6 rounded-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 active:scale-95;
        }
        
        .submit-button-bg {
          @apply absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 transition-all duration-300;
        }
        
        .submit-button:hover .submit-button-bg {
          @apply bg-gradient-to-r from-purple-500 via-pink-500 to-red-500;
          animation: glow 1s ease-in-out infinite;
        }
        
        .submit-button-content {
          @apply relative z-10 text-white font-bold text-xl;
        }
        
        .success-message {
          @apply mt-8 p-8 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/40 backdrop-blur-sm;
        }
        
        .error-message {
          @apply mt-8 p-8 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-400/40 backdrop-blur-sm;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
}
