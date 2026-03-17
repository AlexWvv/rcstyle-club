'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Trophy, Users, Zap } from 'lucide-react';

interface EventSlide {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
  badge?: string;
  gradient: string;
  image: string; // 新增图片字段
}

interface EventCarouselProps {
  className?: string;
}

// 赛事数据（可替换为实际数据）
const eventSlides: EventSlide[] = [
  {
    id: 1,
    title: '2026 RC 竞速锦标赛',
    subtitle: '春季总决赛',
    date: '2026年4月15-17日',
    location: '上海国际赛车场 RC 专区',
    description: '全国顶级RC竞速盛会，汇聚各路高手同场竞技，争夺年度总冠军荣耀！',
    highlights: ['1/8 电动越野组', '1/10 房车改装组', '迷你Z 竞速组'],
    ctaText: '立即报名',
    ctaLink: '#event-1',
    badge: '报名中',
    gradient: 'from-orange-600 via-red-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'RC 攀爬挑战赛',
    subtitle: '极限地形征服',
    date: '2026年5月20-21日',
    location: '北京怀柔山地赛道',
    description: '挑战极限地形，展现攀爬车的真正实力！专业赛道设计，等你来战！',
    highlights: ['岩石攀爬', '泥地穿越', '障碍计时'],
    ctaText: '了解详情',
    ctaLink: '#event-2',
    badge: '即将开始',
    gradient: 'from-blue-600 via-purple-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop'
  }
];

export function EventCarousel({ className = '' }: EventCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
      setImageLoaded(false);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // 切换幻灯片时重置图片加载状态
  useEffect(() => {
    setImageLoaded(false);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setImageLoaded(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + eventSlides.length) % eventSlides.length);
    setIsAutoPlaying(false);
    setImageLoaded(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
    setIsAutoPlaying(false);
    setImageLoaded(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const slide = eventSlides[currentSlide];

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl min-h-[400px] md:min-h-[450px] ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <img 
          src={slide.image} 
          alt={slide.title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* 渐变遮罩层 */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
        {/* 暗色遮罩增强文字可读性 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 内容区域 */}
      <div className="relative px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 min-h-[400px] md:min-h-[450px] flex items-center">
        <div className="w-full">
          {/* 徽章 */}
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1 backdrop-blur-sm">
              <Trophy className="w-4 h-4 mr-1" />
              {slide.badge}
            </Badge>
            <span className="text-white/60 text-sm">赛事 {currentSlide + 1} / {eventSlides.length}</span>
          </div>

          {/* 标题 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {slide.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow">{slide.subtitle}</p>

          {/* 时间地点 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{slide.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{slide.location}</span>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-white/90 text-lg mb-6 max-w-xl drop-shadow">
            {slide.description}
          </p>

          {/* 亮点标签 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {slide.highlights.map((highlight, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-white/10 text-white border-white/30 text-sm px-3 py-1 backdrop-blur-sm"
              >
                <Zap className="w-3 h-3 mr-1" />
                {highlight}
              </Badge>
            ))}
          </div>

          {/* CTA按钮 */}
          <div className="flex flex-wrap gap-4">
            <a href={slide.ctaLink}>
              <Button 
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6 font-bold shadow-xl shadow-black/20"
              >
                {slide.ctaText}
              </Button>
            </a>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white text-lg px-8 py-6 backdrop-blur-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              查看参赛选手
            </Button>
          </div>
        </div>
      </div>

      {/* 导航按钮 */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
        aria-label="上一张"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
        aria-label="下一张"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 底部指示器 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {eventSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`切换到第 ${index + 1} 张`}
          />
        ))}
      </div>

      {/* 进度条 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100"
          style={{ 
            width: `${((currentSlide + 1) / eventSlides.length) * 100}%`,
            transition: isAutoPlaying ? 'width 6s linear' : 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
}
