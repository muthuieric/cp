import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["Riverside Square, Riverside drive Nairobi, Kenya"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+254 768 096 084", "+254 769 90 91 90"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["contact.pmconsult@gmail.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Contact Information
        </h2>
        <p className="text-muted-foreground">
          Get in touch with us through any of the following channels.
        </p>
      </div>

      {contactInfo.map((info, index) => (
        <Card
          key={index}
          className="shadow-card hover:shadow-lg transition rounded-xl"
        >
          <CardContent className="p-6 flex items-start space-x-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--gradient-luxury)" }}
            >
              <info.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p
                  key={idx}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  {detail}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactInfo;