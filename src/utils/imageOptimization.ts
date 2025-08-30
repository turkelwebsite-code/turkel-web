// Image optimization utilities
export interface OptimizedImage {
  src: string;
  webp?: string;
  placeholder: string;
  width: number;
  height: number;
}

export function generateImageSizes(basePath: string, sizes: number[] = [400, 800, 1200]): string[] {
  return sizes.map(size => `${basePath}?w=${size}&q=80`);
}

export function generateWebPVersion(imagePath: string): string {
  return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

export function generatePlaceholder(width: number = 400, height: number = 300): string {
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#999" font-family="sans-serif" font-size="14">
        Yükleniyor...
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function createImageLoader(): string {
  return `
    // Progressive image loading
    function loadImage(img) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = img.dataset.src;
      });
    }

    // Lazy loading with intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          try {
            // Add loading class
            img.classList.add('loading');
            
            // Load the image
            await loadImage(img);
            
            // Update src and remove loading
            img.src = img.dataset.src;
            img.classList.remove('loading', 'lazy');
            img.classList.add('loaded');
            
            observer.unobserve(img);
          } catch (error) {
            console.error('Image loading failed:', error);
            img.classList.add('error');
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Initialize lazy loading
    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  `;
}
