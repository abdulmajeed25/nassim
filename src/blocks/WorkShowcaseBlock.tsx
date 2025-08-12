import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface WorkShowcaseBlockProps {
  title?: string;
  subtitle?: string;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    location?: string;
    date?: string;
    services: string[];
    client?: string;
    duration?: string;
  }>;
  layout?: 'grid' | 'masonry' | 'carousel';
  showBeforeAfter?: boolean;
  showDetails?: boolean;
  isEditing?: boolean;
  onUpdate?: (data: any) => void;
  isPreview?: boolean;
  customizationLevel?: 'basic' | 'advanced';
}

export const WorkShowcaseBlock: React.FC<WorkShowcaseBlockProps> = ({
  title = 'أعمالنا',
  subtitle,
  projects,
  layout = 'grid',
  showBeforeAfter = true,
  showDetails = true,

}) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [activeImageStates, setActiveImageStates] = useState<{[key: string]: 'before' | 'after'}>({});

  const toggleImage = (projectId: string) => {
    setActiveImageStates(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 'after' ? 'before' : 'after'
    }));
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const BeforeAfterImage = ({ project }: { project: any }) => {
    const activeImage = activeImageStates[project.id] || 'before';
    
    return (
      <div className="relative group cursor-pointer" onClick={() => toggleImage(project.id)}>
        <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
          <img
            src={activeImage === 'before' ? project.beforeImage : project.afterImage}
            alt={`${project.title} - ${activeImage === 'before' ? 'قبل' : 'بعد'}`}
            className="w-full h-64 object-cover transition-all duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
                انقر للتبديل
              </div>
            </div>
          </div>
        </div>
        
        {/* Before/After Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            activeImage === 'before' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {activeImage === 'before' ? 'قبل' : 'بعد'}
          </div>
        </div>
        
        {/* Toggle Button */}
        <div className="absolute bottom-4 left-4">
          <button className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {showBeforeAfter ? (
        <BeforeAfterImage project={project} />
      ) : (
        <div className="aspect-w-16 aspect-h-12">
          <img
            src={project.beforeImage}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}
      
      {showDetails && (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {project.description}
          </p>
          
          {/* Project Details */}
          <div className="space-y-2 mb-4">
            {project.location && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 ml-2" />
                {project.location}
              </div>
            )}
            {project.date && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 ml-2" />
                {new Date(project.date).toLocaleDateString('ar-SA')}
              </div>
            )}
            {project.duration && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 ml-2" />
                {project.duration}
              </div>
            )}
            {project.client && (
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 ml-2" />
                {project.client}
              </div>
            )}
          </div>
          
          {/* Services */}
          {project.services && project.services.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">الخدمات المقدمة:</h4>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service: string, serviceIndex: number) => (
                  <span
                    key={serviceIndex}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Layout Rendering */}
        {layout === 'carousel' ? (
          /* Carousel Layout */
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${currentProject * -100}%)` }}
              >
                {projects.map((project: any) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                      <ProjectCard project={project} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevProject}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={nextProject}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
              {projects.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentProject ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : layout === 'masonry' ? (
          /* Masonry Layout */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {projects.map((project: any) => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              هل تريد نتائج مماثلة لمكيفك؟
            </h3>
            <p className="text-gray-600 mb-6">
              احجز موعد صيانة الآن واحصل على خدمة احترافية بأعلى جودة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966501234567"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                احجز موعد صيانة
              </a>
              <a
                href="https://wa.me/966501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};