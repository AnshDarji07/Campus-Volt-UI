import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Zap,
  TrendingDown,
  BarChart3,
  FileText,
  Moon,
  Bell,
  Download,
  Shield,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Live Usage Tracking",
      description: "Monitor your electricity consumption in real-time with interactive meters and displays",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: TrendingDown,
      title: "Bill Estimation",
      description: "Accurate cost predictions based on your usage patterns and electricity rates",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Analytics & Charts",
      description: "Visualize your energy consumption with beautiful, interactive charts and graphs",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FileText,
      title: "PDF & Excel Reports",
      description: "Export detailed reports in PDF or Excel format for record-keeping",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified when your usage exceeds 80% threshold to avoid surprises",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Easy on the eyes with a beautiful dark mode interface option",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "₹2M+", label: "Savings Tracked" },
    { value: "50K+", label: "Reports Generated" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-950 rounded-full mb-6">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  ⚡ Powered by Bureau of Energy Efficiency
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Monitor. Save. Control
                </span>
                <br />
                Your Electricity.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
                Professional energy tracking platform for homes, businesses, and students. 
                Track usage, estimate bills, and improve energy efficiency with powerful analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8"
                  >
                    Get Started
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-lg px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1756542713155-94f62d47d1b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGVuZXJneSUyMHN1c3RhaW5hYmxlJTIwaG9tZXxlbnwxfHx8fDE3NzE3ODI2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Smart Energy Monitoring"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
                    <TrendingDown className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">32%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Savings</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Energy Management
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to monitor, analyze, and optimize your electricity consumption
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-blue-200 dark:hover:border-blue-800">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="size-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Leaf className="size-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Saving Energy Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already saving money and reducing their carbon footprint
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
              >
                Launch Dashboard
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="size-6 text-blue-500" />
                <span className="font-bold text-white">Campus Volt</span>
              </div>
              <p className="text-sm">
                Professional energy monitoring platform promoting awareness and efficiency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <p className="text-sm">
                Built in support of Bureau of Energy Efficiency initiatives for a sustainable future.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2026 Smart Energy Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
