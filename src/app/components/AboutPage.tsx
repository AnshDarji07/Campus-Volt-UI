import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import {
  Target,
  Users,
  Zap,
  Award,
  TrendingUp,
  Shield,
  Globe,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Empowering individuals and businesses to make informed energy decisions and reduce their carbon footprint through accessible monitoring tools.",
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Designed for home users, small businesses, and students who want to understand and optimize their electricity consumption.",
    },
    {
      icon: Shield,
      title: "Data Privacy",
      description: "Your energy data is stored securely and privately. We prioritize your privacy and data protection.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Supporting global efforts for energy efficiency and environmental conservation, aligned with Bureau of Energy Efficiency initiatives.",
    },
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging technology to make energy tracking simple and accessible",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Providing accurate, reliable data and insights you can trust",
    },
    {
      icon: TrendingUp,
      title: "Impact",
      description: "Helping users achieve real savings and reduce environmental impact",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building a community of energy-conscious individuals",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "₹2M+", label: "Total Savings" },
    { value: "50,000+", label: "Reports Generated" },
    { value: "35%", label: "Avg. Reduction" },
  ];

  return (
    <div className="pt-16 bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Smart Energy Tracker
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A professional energy monitoring platform dedicated to helping you understand, 
              track, and optimize your electricity consumption for a sustainable future.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg">
                        <feature.icon className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
                  <value.icon className="size-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built with Modern Technology
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Smart Energy Tracker is built using cutting-edge web technologies to provide 
                you with a fast, reliable, and intuitive experience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="size-2 bg-blue-600 rounded-full"></div>
                  <span>React & TypeScript for robust performance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-2 bg-green-600 rounded-full"></div>
                  <span>Recharts for beautiful data visualization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-2 bg-purple-600 rounded-full"></div>
                  <span>Local-first data storage for privacy</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-2 bg-orange-600 rounded-full"></div>
                  <span>Responsive design for all devices</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwY2hhcnRzfGVufDF8fHx8MTc3MTcwOTkwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Technology Dashboard"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bureau of Energy Efficiency */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="size-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Supporting Energy Efficiency
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              This platform is built in support of the Bureau of Energy Efficiency's mission 
              to promote energy conservation and efficiency awareness across India. Together, 
              we can make a difference in creating a sustainable future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-lg">
                <div className="font-bold text-2xl">2026</div>
                <div className="text-sm text-blue-100">Building a Greener Future</div>
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-lg">
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm text-blue-100">Committed to Sustainability</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
