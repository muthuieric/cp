"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Market Insights',
    'Property Investment',
    'Buying Guide',
    'Selling Tips',
    'Rental Market',
    'Legal & Finance',
    'Lifestyle'
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'Nairobi Real Estate Market Outlook 2024',
      excerpt: 'Comprehensive analysis of property trends, price movements, and investment opportunities in Nairobi\'s luxury real estate market.',
      category: 'Market Insights',
      author: 'David Kimani',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '/images/architectural-1.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'Investment Guide: Karen vs Lavington Properties',
      excerpt: 'Detailed comparison of investment potential between two of Nairobi\'s most prestigious neighborhoods.',
      category: 'Property Investment',
      author: 'Sarah Wanjiku',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '/images/architectural-2.jpg',
      featured: true
    },
    {
      id: '3',
      title: 'First-Time Buyer\'s Complete Guide to Kilimani',
      excerpt: 'Everything you need to know about purchasing your first property in one of Nairobi\'s most sought-after areas.',
      category: 'Buying Guide',
      author: 'Michael Ochieng',
      date: '2024-01-08',
      readTime: '10 min read',
      image: '/images/architectural-commercial.jpg'
    },
    {
      id: '4',
      title: 'Maximizing Rental Yields in Westlands',
      excerpt: 'Strategic tips for property investors looking to optimize returns from rental properties in Westlands.',
      category: 'Property Investment',
      author: 'Sarah Wanjiku',
      date: '2024-01-05',
      readTime: '7 min read',
      image: '/images/architectural-1.jpg'
    },
    {
      id: '5',
      title: 'Legal Considerations for Foreign Property Buyers',
      excerpt: 'Understanding the legal framework and requirements for international clients investing in Kenyan real estate.',
      category: 'Legal & Finance',
      author: 'David Kimani',
      date: '2024-01-03',
      readTime: '12 min read',
      image: '/images/architectural-2.jpg'
    },
    {
      id: '6',
      title: 'Kileleshwa: The Rising Star of Nairobi Real Estate',
      excerpt: 'Exploring why Kileleshwa has become one of the most attractive locations for both residents and investors.',
      category: 'Market Insights',
      author: 'Michael Ochieng',
      date: '2024-01-01',
      readTime: '5 min read',
      image: '/images/architectural-commercial.jpg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Real Estate Insights
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {" Stay informed with the latest market trends, investment insights, and expert advice from Nairobi's real estate leaders."}
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="bg-background shadow-luxury max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Posts */}
        {!searchTerm && selectedCategory === 'All Categories' && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="w-6 h-6 text-[#0A0A0A] mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="shadow-luxury overflow-hidden group cursor-pointer">
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative">
                      <Image
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="w-full h-64 object-cover group-hover:scale-105 transition-luxury"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#0A0A0A] text-primary">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 text-xs">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#0A0A0A] transition-luxury">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {searchTerm || (selectedCategory && selectedCategory !== 'All Categories') ? 'Search Results' : 'Latest Articles'} ({filteredPosts.length})
            </h2>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="shadow-card overflow-hidden group cursor-pointer">
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="w-full h-48 object-cover group-hover:scale-105 transition-luxury"
                      />
                      {post.featured && (
                        <Badge className="absolute top-3 right-3 bg-[#0A0A0A] text-primary text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 text-xs">
                        {post.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-[#0A0A0A] transition-luxury">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        <ArrowRight className="w-4 h-4 text-[#0A0A0A] opacity-0 group-hover:opacity-100 transition-luxury" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4"></div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Articles Found</h3>
              <p className="text-muted-foreground mb-6">
                No articles match your search criteria. Try adjusting your filters.
              </p>
              <Button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); }} 
                className="bg-gradient-luxury hover:opacity-90"
              >
                View All Articles
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Newsletter CTA */}
      {/* <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              Stay Informed
            </h2>
            <p className="text-primary-foreground/90">
              Subscribe to our newsletter and never miss the latest real estate insights, market updates, and investment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 bg-primary-foreground/10 border-[#0A0A0A]/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="bg-gradient-luxury hover:opacity-90"
                     style={{ background: "var(--gradient-luxury)" }} // gradient background

              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Blog;