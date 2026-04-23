import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar, User, Clock, Search, Tag, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  authorImage?: string;
  image?: string;
  category?: string;
  tags?: string[];
  date?: string;
  readTime?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let snapshot;
        try {
          snapshot = await getDocs(query(collection(db, "blog_posts"), orderBy("date", "desc")));
        } catch {
          snapshot = await getDocs(collection(db, "blog_posts"));
        }
        const data: BlogPost[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...(doc.data() as Omit<BlogPost, "id">) });
        });
        setPosts(data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[])),
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  const formatDate = (date?: string) => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Our Blog
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Stories, Insights & Updates
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the latest news, reflections, and stories from our community and the work we do.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-10 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-primary/10 border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No blog posts found.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featuredPost && (
                <Card
                  onClick={() => setSelectedPost(featuredPost)}
                  className="mb-12 overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-border"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-muted">
                      {featuredPost.image ? (
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      )}
                      <Badge className="absolute top-4 left-4">Featured</Badge>
                    </div>
                    <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                      {featuredPost.category && (
                        <Badge variant="secondary" className="w-fit mb-3">
                          {featuredPost.category}
                        </Badge>
                      )}
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {featuredPost.excerpt || featuredPost.content?.slice(0, 200)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        {featuredPost.author && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" /> {featuredPost.author}
                          </span>
                        )}
                        {featuredPost.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {formatDate(featuredPost.date)}
                          </span>
                        )}
                        {featuredPost.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {featuredPost.readTime}
                          </span>
                        )}
                      </div>
                      <Button className="w-fit group/btn">
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Grid */}
              {otherPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <Card
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                        )}
                      </div>
                      <CardContent className="p-6 flex flex-col flex-1">
                        {post.category && (
                          <Badge variant="secondary" className="w-fit mb-3">
                            {post.category}
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                          {post.excerpt || post.content?.slice(0, 150)}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border">
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" /> {post.author}
                            </span>
                          )}
                          {post.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {selectedPost && (
            <div className="flex flex-col">
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="block w-full max-h-[40vh] object-cover rounded-t-lg bg-muted"
                />
              )}
              <div className="px-6 pt-6 pb-2 space-y-4">
              <DialogHeader>
                {selectedPost.category && (
                  <Badge variant="secondary" className="w-fit mb-2">
                    {selectedPost.category}
                  </Badge>
                )}
                <DialogTitle className="text-2xl md:text-3xl">{selectedPost.title}</DialogTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                  {selectedPost.author && (
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {selectedPost.author}
                    </span>
                  )}
                  {selectedPost.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {formatDate(selectedPost.date)}
                    </span>
                  )}
                  {selectedPost.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {selectedPost.readTime}
                    </span>
                  )}
                </div>
              </DialogHeader>

              <article className="prose prose-sm md:prose-base max-w-none text-foreground leading-relaxed prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-primary prose-blockquote:text-muted-foreground prose-blockquote:border-primary prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 pb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {(selectedPost.content || "").replace(/\\n/g, "\n")}
                </ReactMarkdown>
              </article>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-6 pb-6 border-t border-border">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {selectedPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
