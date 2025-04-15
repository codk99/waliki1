import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';



[
  {
    name: 'Banff Townsite',
    image: '/banff.jpg',
    description: 'A charming town surrounded by mountains.',
  },
  {
    name: 'Lake Louise',
    image: '/louise.jpg',
    description: 'Iconic turquoise lake and glacier views.',
  },
  {
    name: 'Moraine Lake',
    image: '/moraine.jpg',
    description: 'Stunning lake with Valley of the Ten Peaks.',
  },
];

const activities = [
  {
    name: 'Hiking',
    image: '/hiking.jpg',
    description: 'Explore trails with breathtaking views.',
  },
  {
    name: 'Canoeing',
    image: '/canoeing.jpg',
    description: 'Paddle on pristine mountain lakes.',
  },
  {
    name: 'Wildlife Viewing',
    image: '/wildlife.jpg',
    description: 'Spot elk, bears, and other wildlife.',
  },
];
const deals = [
  {
    name: 'Summer Escape Package',
    image: '/summer.jpg',
    description: 'Discounted hotel and activity bundle.',
  },
  {
    name: 'Winter Wonderland Offer',
    image: '/winter.jpg',
    description: 'Ski packages and cozy hotel deals.',
  },
];

interface ImageSlide {
  url: string;
  text: string;
}



const slidesData: ImageSlide[] = [
  {
    url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    text: 'Discover the magic of new places',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1697729872733-24e9e8186a47',
    text: 'Explore hidden wonders',
  },
  {
    url: 'https://images.unsplash.com/photo-1577587230708-187fdbef4d91',
    text: 'Your journey awaits',
  },  
  {
    url: 'https://plus.unsplash.com/premium_photo-1697729872733-24e9e8186a47',
    text: 'Explore hidden wonders',
  },
  {
    url: 'https://images.unsplash.com/photo-1577587230708-187fdbef4d91',
    text: 'Your journey awaits',
  },
  {
    url: 'https://images.unsplash.com/photo-1526926076776-50d6dd9e39e6',
    text: 'Unforgettable adventures',
  },
];

  
  const useImageSlider = (slides: ImageSlide[]) => {  
    return null
  }; 
  
  interface HoverEffectProps {
  
    onHoverChange: (direction: 'left' | 'right' | null) => void;   
  } 
  
  const loadImages = (): ImageSlide[] => {
   return slidesData;
  };

  const testSupabaseConnection = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
      const supabase = createClient(supabaseUrl, supabaseKey);
  
      const { data, error } = await supabase.from('cities').select('*');
      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        console.log('Data from Supabase:', data);
      }
    } catch (error) {
      console.error('An error occurred while testing Supabase connection:', error);
    }
  };


const HomePage: React.FC = () => {  return (
    <div className="font-sans ">
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">

          <a href="#" className="text-xl font-bold" >
            Banff Lake Louise
          </a>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                Destinations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Activities
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Deals
              </a>
            </li> 

           
          </ul>          
          <button onClick={testSupabaseConnection}>Test Supabase</button>
          
        </div>
      </nav>

      <HeroSlider />

      <main className="container mx-auto p-4">
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-6">Popular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activities.map((activity, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                <img src={activity.image} alt={activity.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
                  <p className="text-gray-700">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-6">Special Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deals?.map((deal, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                <img src={deal.image} alt={deal.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{deal.name}</h3>
                  <p className="text-gray-700">{deal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Banff Lake Louise Tourism</p>
      </footer>
    </div>
  );
};

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useImageSlider(slidesData);
  const [loadedSlides, setLoadedSlides] = useState<ImageSlide[] | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverDirection, setHoverDirection] = useState<'left' | 'right' | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    

  useEffect(() => {
    setLoadedSlides(loadImages());
  }, []);

    useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (loadedSlides) {
          setCurrentSlide((prev) => (prev + 1) % loadedSlides.length);
        }
      }, 7000); 
    }
    return () => clearInterval(interval);
  }, [loadedSlides, isPlaying,isHovering]);

    if (!loadedSlides || loadedSlides.length === 0) {
    return <div className="h-screen bg-gray-200 animate-pulse" />;
  }


  const handleSlideClick = (direction: 'left' | 'right') => {
    setIsPlaying(false);
    if (direction === 'left') {
      setCurrentSlide((prev) => (prev === 0 ? loadedSlides.length - 1 : prev - 1));
    } else {
      setCurrentSlide((prev) => (prev + 1) % loadedSlides.length);
    }

  };
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsPlaying(false);    
      setIsHovering(true);

      setMousePosition({ x: event.clientX, y: event.clientY });

      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;    
      const middle = rect.width / 2;      

      if (mouseX < middle) {

            setHoverDirection('left');
        } else {
      setHoverDirection('right');
    }
  };

    const getCursorStyle = () => {
      if (!isHovering) {
          return 'default';
      }
      if (hoverDirection === 'left') {
          return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='20' fill='white'/%3E%3Cpath d='M28 16l-8 8 8 8' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20 24h10' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 24 24, auto`;
      }
      if (hoverDirection === 'right') {
          return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='20' fill='white'/%3E%3Cpath d='M20 16l8 8-8 8' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M28 24H18' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 24 24, auto`;
      }
  
          return 'default';
    };

    const handleMouseLeave = () => {
    setIsPlaying(true);
    setIsHovering(false);
    setHoverDirection(null);
  };
  
    const imageOffset = isHovering && hoverDirection ? (hoverDirection === 'left' ? '-translate-x-9' : 'translate-x-9') : ''; 

  return (
        <div className={`relative w-[90%] h-screen mx-auto overflow-hidden rounded-[24px]`}>
            {loadedSlides?.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div
                        className={`w-full h-full flex items-center justify-center relative`}
                    >
                        <div
                            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300 ${imageOffset}`}
                            style={{
                                backgroundImage: `url(${slide.url})`,
                                cursor: getCursorStyle(),
                            }}                            
                           onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
              onClick={isHovering && hoverDirection ? () => handleSlideClick(hoverDirection) : undefined}></div>
                    </div>
        </div>
      ))}
          <h1 className={`text-white text-6xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
              {loadedSlides[currentSlide].text}
            </h1>
          </div>


    );
}; 
export default HomePage;
