import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Save, Settings, GripVertical, Trash2, Wand2, Smartphone, Tablet, Monitor } from 'lucide-react';
import Layout from '../shared/Layout';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Block } from '../../types';
import { usePageStore, useUIStore } from '../../store';
import { BlockRenderer } from '../../renderer/BlockRenderer';
import { availableBlocks, blockTemplates } from '../../components/blocks';
import { v4 as uuidv4 } from 'uuid';

interface SortableBlockProps {
  block: Block;
  onEdit: () => void;
  onDelete: (blockId: string) => void;
}

const SortableBlock: React.FC<SortableBlockProps> = ({ block, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getBlockIcon = (type: string) => {
    const blockType = availableBlocks.find(b => b.type === type);
    return blockType?.icon || '📦';
  };

  const getBlockTitle = (type: string) => {
    const blockType = availableBlocks.find(b => b.type === type);
    return blockType?.label || type;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3 group hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="text-lg">{getBlockIcon(block.type)}</div>
          <div>
            <div className="font-medium text-gray-900">{getBlockTitle(block.type)}</div>
            <div className="text-sm text-gray-500">كتلة {block.type}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="تحرير"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PageBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentPage,
    // setCurrentPage,
    addPage,
    updatePage,
    addBlock,
    // updateBlock,
    deleteBlock,
    reorderBlocks
  } = usePageStore();
  
  const {
    pageBuilderMode,
    selectedBlockId,
    // setPageBuilderMode,
    setSelectedBlockId,
    addNotification
  } = useUIStore();

  const [pageTitle, setPageTitle] = useState('صفحة جديدة');
  const [pageSlug, setPageSlug] = useState('new-page');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showBlockLibrary, setShowBlockLibrary] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize with a new page if none is selected
  useEffect(() => {
    if (!currentPage && id === 'new') {
      const newPage = {
        title: pageTitle,
        slug: pageSlug,
        blocks: [],
        status: 'draft' as const,
        content: '',
        author: 'admin',
      };
      addPage(newPage);
    }
  }, [currentPage, addPage, pageTitle, pageSlug, id]);

  // Update page title and slug when changed
  useEffect(() => {
    if (currentPage) {
      setPageTitle(currentPage.title);
      setPageSlug(currentPage.slug);
    }
  }, [currentPage]);

  const blockTypes = availableBlocks;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && currentPage) {
      const oldIndex = currentPage.blocks.findIndex((item) => item.id === active.id);
      const newIndex = currentPage.blocks.findIndex((item) => item.id === over?.id);

      reorderBlocks(currentPage.id, oldIndex, newIndex);
    }
  };

  const handleAddBlock = (type: string) => {
    if (!currentPage) return;
    
    const template = blockTemplates[type as keyof typeof blockTemplates];
    if (!template) return;

    const newBlock: any = {
      ...template,
      id: uuidv4(),
      order: currentPage.blocks.length,
      data: (template as any).data || {},
    };

    addBlock(currentPage.id, newBlock);
    setSelectedBlockId(newBlock.id);
    setShowBlockLibrary(false);
    
    addNotification({
      type: 'success',
      title: 'تم إضافة الكتلة',
      message: `تم إضافة كتلة ${getBlockTitle(type)} بنجاح`,
      duration: 3000,
      createdAt: new Date(),
    });
  };

  // const handleUpdateBlock = (blockId: string, content: any) => {
  //   if (!currentPage) return;
  //   updateBlock(currentPage.id, blockId, { data: { content } });
  // };

  const handleDeleteBlock = (blockId: string) => {
    if (!currentPage) return;
    deleteBlock(currentPage.id, blockId);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    
    addNotification({
      type: 'success',
      title: 'تم حذف الكتلة',
      message: 'تم حذف الكتلة بنجاح',
      duration: 3000,
      createdAt: new Date(),
    });
  };

  // const handleDuplicateBlock = (blockId: string) => {
  //   if (!currentPage) return;
    
  //   const blockToDuplicate = currentPage.blocks.find(block => block.id === blockId);
  //   if (!blockToDuplicate) return;

  //   const newBlock: Block = {
  //     ...blockToDuplicate,
  //     id: uuidv4(),
  //     order: currentPage.blocks.length,
  //   };

  //   addBlock(currentPage.id, newBlock);
    
  //   addNotification({
  //     type: 'success',
  //     title: 'تم نسخ الكتلة',
  //     message: 'تم نسخ الكتلة بنجاح',
  //     duration: 3000,
  //     createdAt: new Date(),
  //   });
  // };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add a hero block based on the prompt
      handleAddBlock('hero');
      
      addNotification({
        type: 'success',
        title: 'تم إنشاء المحتوى',
        message: 'تم إنشاء المحتوى بواسطة الذكاء الاصطناعي',
        duration: 3000,
        createdAt: new Date(),
      });
      
      setAiPrompt('');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'خطأ في الإنشاء',
        message: 'حدث خطأ أثناء إنشاء المحتوى',
        duration: 5000,
        createdAt: new Date(),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const savePage = () => {
    if (!currentPage) return;
    
    updatePage(currentPage.id, {
      title: pageTitle,
      slug: pageSlug,
      status: 'published',
    });
    
    addNotification({
      type: 'success',
      title: 'تم حفظ الصفحة',
      message: 'تم حفظ الصفحة ونشرها بنجاح',
      duration: 3000,
      createdAt: new Date(),
    });
    
    navigate('/admin/pages');
  };

  const getViewportClasses = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-full';
    }
  };

  const getBlockTitle = (type: string) => {
    const block = availableBlocks.find(b => b.type === type);
    return block?.label || type;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">بناء الصفحة</h1>
            <p className="text-gray-600 mt-1">قم بإنشاء وتخصيص صفحتك باستخدام أدوات البناء المتقدمة</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/admin/pages')}
            >
              إلغاء
            </Button>
            <Button
              onClick={savePage}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              حفظ ونشر
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Page Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">إعدادات الصفحة</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الصفحة
                  </label>
                  <Input
                    value={pageTitle}
                    onChange={(value: string) => setPageTitle(value)}
                    placeholder="أدخل عنوان الصفحة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط الصفحة
                  </label>
                  <Input
                    value={pageSlug}
                    onChange={(value: string) => setPageSlug(value)}
                    placeholder="page-url"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان SEO
                  </label>
                  <Input
                    value={metaTitle}
                    onChange={(value: string) => setMetaTitle(value)}
                    placeholder="عنوان محركات البحث"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف SEO
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="وصف الصفحة لمحركات البحث"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">مساعد الذكاء الاصطناعي</h2>
              <div className="space-y-4">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="اكتب وصفاً لما تريد إنشاؤه..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <Button
                  onClick={generateWithAI}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2"
                  variant="secondary"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'جاري الإنشاء...' : 'إنشاء بالذكاء الاصطناعي'}
                </Button>
              </div>
            </div>

            {/* Block Library */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">مكتبة العناصر</h2>
              <div className="grid grid-cols-1 gap-2">
                {blockTypes.map((blockType) => (
                  <button
                    key={blockType.type}
                    onClick={() => handleAddBlock(blockType.type)}
                    className="flex items-center p-3 text-right border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                  >
                    <span className="text-lg ml-3">{blockType.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{blockType.label}</div>
                      <div className="text-sm text-gray-500">{blockType.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Viewport Controls */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">عرض:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                    viewportMode === 'desktop'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Monitor size={16} />
                  سطح المكتب
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                    viewportMode === 'tablet'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Tablet size={16} />
                  الجهاز اللوحي
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                    viewportMode === 'mobile'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Smartphone size={16} />
                  الهاتف
                </button>
              </div>
            </div>

            {/* Page Builder */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">بناء الصفحة</h2>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowBlockLibrary(!showBlockLibrary)}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة عنصر
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {!currentPage || currentPage.blocks.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-gray-400 mb-4">
                      <Plus className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">ابدأ ببناء صفحتك</h3>
                    <p className="text-gray-600 mb-4">اختر عنصراً من المكتبة لإضافته إلى صفحتك</p>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={currentPage.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                      {currentPage.blocks.map((block) => (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          onEdit={() => setSelectedBlockId(block.id)}
                          onDelete={handleDeleteBlock}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>

            {/* Page Preview */}
            <div className={`bg-white border rounded-lg overflow-hidden mt-6 ${getViewportClasses()}`}>
              <div className="bg-gray-50 px-4 py-2 border-b">
                <div className="text-sm text-gray-600">معاينة الصفحة</div>
              </div>
              <div className="p-6">
                {currentPage && currentPage.blocks.length > 0 ? (
                  <div className="space-y-4">
                    {currentPage.blocks.map((block) => (
                      <BlockRenderer
                        key={block.id}
                        block={block}
                        isEditing={pageBuilderMode === 'edit'}
                        // isSelected={selectedBlockId === block.id}
                        // onSelect={() => setSelectedBlockId(block.id)}
                        // onUpdate={(content) => handleUpdateBlock(block.id, content)}
                        // onDelete={() => handleDeleteBlock(block.id)}
                        // onDuplicate={() => handleDuplicateBlock(block.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📄</div>
                    <p>لا توجد كتل في هذه الصفحة</p>
                    <p className="text-sm mt-2">ابدأ بإضافة كتلة من المكتبة</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PageBuilder;