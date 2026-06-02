import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { ProductDemoPlaceholder } from "@/components/ProductDemoPlaceholder";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoPlaceholder />
        <ProductDemoPlaceholder />
      </main>
      <Footer />
    </div>
  );
}
