import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  HelpCircle,
  Bug,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@smartenergytracker.com",
      link: "mailto:support@smartenergytracker.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 1800-XXX-XXXX",
      link: "tel:+911800XXXXXX",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Energy Efficiency Center, New Delhi, India",
      link: null,
    },
  ];

  const supportCategories = [
    {
      icon: HelpCircle,
      title: "General Support",
      description: "Questions about features and usage",
    },
    {
      icon: Bug,
      title: "Report a Bug",
      description: "Found an issue? Let us know",
    },
    {
      icon: Lightbulb,
      title: "Feature Request",
      description: "Suggest new features",
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your experience",
    },
  ];

  return (
    <div className="pt-16 bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. 
              Our team is here to help you make the most of Smart Energy Tracker.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
                      <info.icon className="size-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="size-5 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      <Send className="size-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Categories & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Support Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>How can we help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {supportCategories.map((category) => (
                      <div
                        key={category.title}
                        className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                      >
                        <category.icon className="size-8 text-blue-600 mb-2" />
                        <h4 className="font-semibold text-sm mb-1">
                          {category.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
                    <h4 className="font-semibold mb-2">How do I track my energy usage?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Simply add your electricity readings through the dashboard, and our 
                      system will automatically calculate usage, costs, and trends.
                    </p>
                  </div>
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
                    <h4 className="font-semibold mb-2">Is my data secure?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Yes! All data is stored locally in your browser. We don't collect 
                      or transmit your personal energy data to any external servers.
                    </p>
                  </div>
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
                    <h4 className="font-semibold mb-2">Can I export my reports?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Absolutely! You can export your energy reports in both PDF and 
                      Excel formats from the dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">How are bills calculated?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bills are estimated based on your usage and the electricity rate 
                      you set. You can customize rates in the bill estimator section.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Help */}
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border-blue-200 dark:border-blue-900">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <HelpCircle className="size-5 text-blue-600" />
                    Need immediate help?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Check out our documentation or reach out via email for quick support.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Docs
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.location.href = "mailto:support@smartenergytracker.com"}
                    >
                      Email Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map/Location Section (Mock) */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Visit Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our office is located in the heart of New Delhi, promoting energy efficiency nationwide
            </p>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="size-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map would be embedded here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
