'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Trophy, Users, Flag } from 'lucide-react';

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
  image: string;
}

interface EventCarouselProps {
  className?: string;
}

// 赛事数据
const eventSlides: EventSlide[] = [
  {
    id: 1,
    title: 'RC 竞速锦标赛',
    subtitle: '2026 春季总决赛',
    date: '2026年4月15-17日',
    location: '上海国际赛车场 RC 专区',
    description: '全国顶级RC竞速盛会，汇聚各路高手同场竞技，争夺年度总冠军荣耀！',
    highlights: ['1/8 电动越野', '1/10 房车改装', '迷你Z 竞速'],
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
      className={`relative overflow-hidden rounded-2xl min-h-[320px] md:min-h-[380px] ${className}`}
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
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-85`} />
        {/* 暗色遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* 内容区域 */}
      <div className="relative px-6 py-8 md:px-10 md:py-10 lg:px-14 min-h-[320px] md:min-h-[380px] flex items-center">
        <div className="w-full max-w-2xl">
          {/* 顶部：徽章 + 计数 */}
          <div className="flex items-center gap-3 mb-5">
            <Badge className="bg-white/15 text-white border border-white/20 text-xs px-2.5 py-1 backdrop-blur-sm font-medium">
              {slide.badge}
            </Badge>
            <span className="text-white/50 text-xs font-medium">赛事 {currentSlide + 1}/{eventSlides.length}</span>
          </div>

          {/* 标题区 */}
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1.5 tracking-tight drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-white/80 font-medium">{slide.subtitle}</p>
          </div>

          {/* 信息区：时间 + 地点 */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-4 text-sm">
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="w-4 h-4 text-white/70" />
              <span>{slide.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4 text-white/70" />
              <span>{slide.location}</span>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-white/75 text-sm md:text-base mb-5 max-w-lg leading-relaxed">
            {slide.description}
          </p>

          {/* 项目标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {slide.highlights.map((highlight, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <Flag className="w-3 h-3 text-white/60" />
                {highlight}
              </span>
            ))}
          </div>

          {/* 按钮区 */}
          <div className="flex flex-wrap items-center gap-3">
            <a href={slide.ctaLink}>
              <Button 
                size="default"
                className="bg-white text-gray-900 hover:bg-white/95 font-semibold px-6 h-10 shadow-lg shadow-black/20"
              >
                {slide.ctaText}
              </Button>
            </a>
            <Button 
              size="default"
              variant="outline"
              className="bg-white/10 text-white border-white/25 hover:bg-white/20 hover:text-white hover:border-white/40 font-medium px-5 h-10 backdrop-blur-sm"
            >
              <Users className="w-4 h-4 mr-1.5" />
              查看参赛选手
            </Button>
          </div>
        </div>
      </div>

      {/* 导航按钮 */}
      <button
        onClick={goToPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/25 hover:bg-black/45 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10"
        aria-label="上一张"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/25 hover:bg-black/45 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10"
        aria-label="下一张"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 底部指示器 */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {eventSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-6 h-2 bg-white' 
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`切换到第 ${index + 1} 张`}
          />
        ))}
      </div>

      {/* 进度条 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div 
          className="h-full bg-white/60 transition-all duration-100"
          style={{ 
            width: `${((currentSlide + 1) / eventSlides.length) * 100}%`,
            transition: isAutoPlaying ? 'width 6s linear' : 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
}
