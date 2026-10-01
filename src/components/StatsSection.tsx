import { Users, Award, Star, MessageCircle } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Award, label: 'Properties Sold', value: '1,200+' },
    { icon: Star, label: 'Client Satisfaction', value: '98%' },
    { icon: MessageCircle, label: 'Client Interactions', value: '2000+' }
  ];

  return (
    <section className="py-16 sm:py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center animate-slide-up">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4"
                  style={{ background: "var(--gradient-luxury)" }}
                >
                  <Icon
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    stroke="currentColor"
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
