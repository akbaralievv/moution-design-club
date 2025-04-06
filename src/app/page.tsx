import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';
import HeroReel from '@/components/hero-reel';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2] bg-center [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_10%,transparent_70%)]" />

        <div className="container relative pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-32 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col space-y-6">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight
    text-transparent bg-clip-text bg-gradient-to-r
    from-purple-800 via-pink-500 to-sky-400
    animate-[pulseGradient_5s_ease-in-out_infinite]">
                Master Motion Design <span className="text-primary">Fundamentals</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-prose">
                Learn animation, motion graphics, 3D, and visual effects with hands-on courses
                taught by industry experts.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                Join over 10,000 motion designers who've improved their skills with us
              </div>
            </div>

            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <HeroReel />
            </div>
          </div>
        </div>
      </section>

      {/* Brands/Logos Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-xl font-medium text-center mb-8">
            Our students work at leading companies worldwide
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-80">
            <Image
              src="/logos/netflix.svg"
              alt="Netflix"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/logos/adobe.svg"
              alt="Adobe"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/logos/google.png"
              alt="Google"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/logos/figma.png"
              alt="Disney"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/logos/facebook.png"
              alt="Apple"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">
                Start your motion design journey with our most popular courses
              </p>
            </div>
            <Link href="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>

          {/* Course Cards Grid - This would normally be fetched from your API */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* These would be actual courses from your API */}
            <div className="group rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/images/courses/animation-fundamentals.jpg"
                  alt="Animation Fundamentals"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    Animation
                  </span>
                  <span className="text-sm text-muted-foreground">12 lessons</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Animation Fundamentals</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  Master the 12 principles of animation and build a solid foundation for your motion
                  design career.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$99.00</span>
                  <Link href="/courses/animation-fundamentals">
                    <Button variant="secondary" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="group rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/images/courses/motion-graphics-essentials.jpg"
                  alt="Motion Graphics Essentials"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    Motion Graphics
                  </span>
                  <span className="text-sm text-muted-foreground">15 lessons</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Motion Graphics Essentials</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  Create professional motion graphics for video, social media, and web with
                  industry-standard techniques.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$149.00</span>
                  <Link href="/courses/motion-graphics-essentials">
                    <Button variant="secondary" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="group rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/images/courses/3d-for-motion-designers.jpg"
                  alt="3D for Motion Designers"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    3D
                  </span>
                  <span className="text-sm text-muted-foreground">18 lessons</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">3D for Motion Designers</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  Learn how to incorporate 3D elements into your motion design projects with this
                  comprehensive course.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$199.00</span>
                  <Link href="/courses/3d-for-motion-designers">
                    <Button variant="secondary" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Learn With {siteConfig.name}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to provide you with the best possible learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary">
                  <path d="M17 6H8a5 5 0 0 0 0 10h9" />
                  <path d="M17 16v-4" />
                  <path d="M13 16v-2" />
                  <path d="M9 16v-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn at Your Own Pace</h3>
              <p className="text-muted-foreground">
                All courses are self-paced, allowing you to learn when it's convenient for you.
                Access content anytime, anywhere.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary">
                  <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
                  <path d="M2 20h20" />
                  <path d="M14 12v.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with years of experience in motion design,
                animation, and visual effects.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Project-Based Learning</h3>
              <p className="text-muted-foreground">
                Apply what you learn through hands-on projects that help you build a professional
                portfolio while mastering new skills.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary">
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Join our community of motion designers, get feedback on your work, and connect with
                like-minded creatives.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lifetime Access</h3>
              <p className="text-muted-foreground">
                Purchase a course once and get lifetime access, including all future updates and
                improvements to the content.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-background rounded-xl shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">New Content Monthly</h3>
              <p className="text-muted-foreground">
                We regularly add new courses, tutorials, and resources to keep you updated with the
                latest trends and techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-small-white/5 bg-center [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_10%,transparent_70%)]" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Motion Design Journey?
              </h2>
              <p className="text-lg md:text-xl mb-8">
                Join thousands of students who are mastering motion design skills and launching
                successful careers.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg" className="w-full">
                    Browse Courses
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="w-full">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
