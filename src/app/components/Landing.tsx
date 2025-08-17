import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Brain, Users, BarChart3, Zap, Clock, Target, Star, ThumbsUp, ThumbsDown, Crown, Rocket, Check } from 'lucide-react';
import Link from 'next/link';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Pricing Plans Data
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals getting started",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-slate-600 to-slate-700",
      borderGradient: "from-slate-500/50 to-slate-600/50",
      popular: false,
      features: [
        "Basic task management",
        "Notes and reminders",
      ]
    },
    {
      name: "Professional",
      price: "$10",
      description: "Ideal for professionals",
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-emerald-500 to-blue-600",
      borderGradient: "from-emerald-400/50 to-blue-500/50",
      popular: true,
      features: [
        "Advanced AI insights",
        "Priority support",
        "Advanced analytics",
        "Custom workflows",
        "AI suggestions and recommendations"
      ]
    },
   
  ];

  const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 overflow-hidden ">
      {/* Animated Background Elements */}
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto text-center overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80 text-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
               <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                />
              </svg>
                            </motion.div>
              <span>AI-Powered Task Management</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-emerald-200 bg-clip-text text-transparent leading-tight tracking-tight"
            >
              Work  <span className="text-emerald-400">Smarter</span>
              <br />
              <motion.span 
                className="text-5xl md:text-7xl bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Not Harder
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Streamline your workflow with intelligent task management. Our AI helps you prioritize, organize, and complete tasks more efficiently than ever before.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button 
                className="cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full text-white font-semibold text-lg overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href="/register"> 
                <motion.span 
                  className="relative z-10"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Get Started Free
                </motion.span>
                </Link>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-700"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.button>
              
              <motion.button 
                className="cursor-pointer   px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

    
      </motion.div>

      {/* Features Section */}
      <AnimatedSection className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            >
              Powerful Features
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Our platform combines powerful task management with AI assistance to help you stay organized and productive.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Smart Task Prioritization",
                description: "Let AI analyze your tasks and automatically sort them by priority, so you always know what to work on next.",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "AI suggestions and  recommendations",
                description: " AI can help you make better decisions by providing insights and recommendations based on your data.",
                gradient: "from-emerald-500 to-green-600",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Smart Insights",
                description: "Get valuable insights into your productivity patterns and receive personalized recommendations to improve your workflow.",
                gradient: "from-emerald-500 to-cyan-800",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ opacity: 1 }}
                />
                
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {feature.icon}
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-white/70 leading-relaxed"
                  whileHover={{ x: 5 }}
                >
                  {feature.description}
                </motion.p>

                <motion.div 
                  className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* AI Enhanced Section */}
      <AnimatedSection className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            >
              AI-Enhanced Productivity
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/70 max-w-3xl mx-auto"
            >
              Our AI works in the background to help you work smarter, not harder.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Task Scheduling",
                description: "Our AI analyzes your workload and suggests the optimal time to tackle each task.",
                icon: <Clock className="w-6 h-6" />
              },
              {
                title: "Predictive Task Analysis",
                description: "Anticipate potential roadblocks before they happen with our predictive analytics.",
                icon: <Brain className="w-6 h-6" />
              },
              {
                title: "Smart Notifications",
                description: "Receive intelligent reminders and alerts to keep you on track without being overwhelmed.",
                icon: <Zap className="w-6 h-6" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-blue-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.1, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </motion.div>
                  {/* Floating particles inside cards */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.2, 0.8, 0.2],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 3
                      }}
                    />
                  ))}
                </div>
                
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/70 leading-relaxed"
                    whileHover={{ x: 5 }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black text-center mb-20 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          >
            What Our Users Say
          </motion.h2>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full"></div>
            
            <div className="flex items-start gap-6 mb-6">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex-shrink-0 relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="absolute inset-2 bg-white/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              <div className="flex-1">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  whileHover={{ x: 5 }}
                >
                  Sophia Carter
                </motion.h3>
                <motion.p 
                  className="text-white/60 mb-4"
                  whileHover={{ x: 5 }}
                >
                  Product Manager • September 15, 2023
                </motion.p>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.blockquote 
              className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              "This task management system has completely transformed how our team operates. The AI insights have helped us increase productivity by 40%!"
            </motion.blockquote>

            <div className="flex gap-6 text-white/60">
              <motion.button 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>12</span>
              </motion.button>
              <motion.button 
                className="flex items-center gap-2 hover:text-red-400 transition-colors duration-300"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThumbsDown className="w-5 h-5" />
                <span>2</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent"
            >
              Choose Your Plan
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 cursor-pointer ${
                  plan.popular 
                    ? 'border-emerald-400/50 shadow-2xl shadow-emerald-500/10 lg:scale-105' 
                    : 'border-white/10'
                }`}
                style={{ perspective: "1000px" }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </motion.div>
                )}

                {/* Gradient Border Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}
                  whileHover={{ opacity: 1 }}
                />

                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 text-white`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {plan.icon}
                </motion.div>

                {/* Plan Details */}
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {plan.name}
                </motion.h3>
                
                <motion.p 
                  className="text-white/60 mb-6"
                  whileHover={{ x: 5 }}
                >
                  {plan.description}
                </motion.p>

                {/* Price */}
                <div className="mb-8">
                  <motion.span 
                    className="text-5xl font-black text-white"
                  >
                    {plan.price}
                  </motion.span>
                  {plan.price !== "Free" && (
                    <span className="text-white/60 text-lg">/month</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                      <span className="text-white/80 leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={"/register"} >
                <motion.button 
                  className={`cursor-pointer w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white'
                    : 'bg-white/10 text-white border border-white/20'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                    boxShadow: plan.popular 
                    ? "0 20px 40px rgba(16, 185, 129, 0.3)"
                    : "0 10px 20px rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                </motion.button>
                  </Link>

                {/* Floating decoration */}
                <motion.div 
                  className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent"
          >
            Ready to Transform Your Workflow?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/70 mb-12 leading-relaxed"
          >
              Get started with our powerful features and take your workflow to the next level.
          </motion.p>
          <motion.button 
            variants={itemVariants}
            className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-white font-bold text-xl overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.span 
              className="relative z-10  cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}

            >
              Start Your Free Trial
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-700"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.button>
        </div>
      </AnimatedSection>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-20 mt-24 px-4 md:px-0"
      >
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="bg-gradient-to-r from-emerald-400 to-blue-500 p-2 rounded-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white">
                <path d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" />
              </svg>
            </motion.div>
            <span className="text-white/80 font-semibold text-lg tracking-wide select-none">Tasks Master</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white/60 text-sm">
            <span>&copy; {new Date().getFullYear()} Tasks Master. All rights reserved.</span>
            <span className="hidden md:inline-block mx-2">|</span>
            <a href="https://github.com/01Malek01" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-medium flex items-center gap-1">
              <svg width="16" height="16" fill="currentColor" className="inline-block"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              Made by Malek Mostafa
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;