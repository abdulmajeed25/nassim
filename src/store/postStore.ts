import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '../types';

export interface PostStore {
  posts: Post[];
  currentPost: Post | null;
  setPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  duplicatePost: (id: string) => void;
  getPostsByStatus: (status: string) => Post[];
  getPostsByCategory: (category: string) => Post[];
  searchPosts: (query: string) => Post[];
}

const realPosts: Post[] = [
  {
    id: '1',
    title: 'دليل شامل لصيانة المكيفات قبل فصل الصيف',
    slug: 'summer-ac-maintenance-guide',
    content: '<h2>لماذا الصيانة الدورية مهمة؟</h2><p>مع اقتراب فصل الصيف في المملكة، تزداد أهمية التأكد من جاهزية أنظمة التكييف. الصيانة الدورية ليست مجرد إجراء وقائي، بل استثمار ذكي يوفر عليك تكاليف الإصلاحات الطارئة.</p><h3>خطوات الصيانة الأساسية:</h3><ul><li><strong>تنظيف الفلاتر:</strong> يجب تنظيف فلاتر المكيف كل شهر لضمان تدفق الهواء بكفاءة</li><li><strong>فحص مستوى الفريون:</strong> التأكد من عدم وجود تسريبات وأن مستوى الغاز مناسب</li><li><strong>تنظيف الوحدة الخارجية:</strong> إزالة الأتربة والأوراق من حول الوحدة الخارجية</li><li><strong>فحص الأسلاك والتوصيلات:</strong> التأكد من سلامة جميع التوصيلات الكهربائية</li></ul><h3>علامات تدل على حاجة المكيف للصيانة:</h3><ul><li>ضعف في التبريد</li><li>أصوات غريبة أثناء التشغيل</li><li>ارتفاع فاتورة الكهرباء</li><li>تسريب المياه من الوحدة الداخلية</li></ul><p>في شركة نسيم، نقدم خدمات صيانة شاملة مع ضمان 6 أشهر على جميع الأعمال.</p>',
    excerpt: 'كل ما تحتاج معرفته لتجهيز مكيفك لفصل الصيف وتجنب الأعطال المكلفة مع خبراء شركة نسيم',
    status: 'published',
    category: 'صيانة',
    tags: ['صيانة دورية', 'فصل الصيف', 'نصائح مهمة'],
    featuredImage: '/images/summer-maintenance-guide.jpg',
    author: 'م. أحمد النسيم - مدير فني شركة نسيم',
    seo: {
      metaTitle: 'دليل شامل لصيانة المكيفات قبل فصل الصيف - شركة نسيم',
      metaDescription: 'كل ما تحتاج معرفته لتجهيز مكيفك لفصل الصيف وتجنب الأعطال المكلفة مع خبراء شركة نسيم للصيانة',
      keywords: ['صيانة مكيفات الصيف', 'تجهيز المكيفات', 'شركة نسيم', 'صيانة دورية'],
    },
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '2',
    title: '10 طرق لتوفير 40% من فاتورة الكهرباء مع المكيفات',
    slug: 'energy-saving-tips-ac',
    content: '<h2>الطرق الأكثر فعالية لتوفير الطاقة</h2><p>مع ارتفاع أسعار الكهرباء، أصبح توفير الطاقة ضرورة وليس مجرد خيار. إليك أهم الطرق المجربة من خبراء شركة نسيم:</p><h3>1. ضبط درجة الحرارة المثلى</h3><p>ضبط المكيف على 24-25 درجة مئوية يحقق توازناً مثالياً بين الراحة والتوفير. كل درجة أقل تزيد الاستهلاك بنسبة 6-8%.</p><h3>2. استخدام المؤقت الذكي</h3><p>برمجة المكيف للعمل فقط عند الحاجة يوفر حتى 30% من الاستهلاك.</p><h3>3. تحسين العزل الحراري</h3><p>العزل الجيد للنوافذ والأبواب يقلل الحمل على المكيف بشكل كبير.</p><h3>4. الصيانة الدورية</h3><p>المكيف النظيف يستهلك طاقة أقل بنسبة تصل إلى 15%.</p><h3>5. استخدام المراوح المساعدة</h3><p>المراوح تساعد على توزيع الهواء البارد بكفاءة أكبر.</p>',
    excerpt: 'نصائح عملية ومجربة من خبراء شركة نسيم لتقليل استهلاك الكهرباء دون التضحية بالراحة',
    status: 'published',
    category: 'توفير الطاقة',
    tags: ['توفير الكهرباء', 'كفاءة الطاقة', 'نصائح عملية'],
    featuredImage: '/images/energy-saving-tips.jpg',
    author: 'أ. سارة المطيري - مستشارة كفاءة الطاقة',
    seo: {
      metaTitle: '10 طرق لتوفير 40% من فاتورة الكهرباء مع المكيفات - شركة نسيم',
      metaDescription: 'نصائح عملية ومجربة من خبراء شركة نسيم لتقليل استهلاك الكهرباء دون التضحية بالراحة',
      keywords: ['توفير الكهرباء', 'كفاءة الطاقة', 'تقليل فاتورة الكهرباء', 'شركة نسيم'],
    },
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-18'),
  },
  {
    id: '3',
    title: 'حلول سريعة لأشهر مشاكل المكيفات',
    slug: 'quick-ac-troubleshooting',
    content: '<h2>المشاكل الشائعة وحلولها</h2><p>كثير من مشاكل المكيفات يمكن حلها بخطوات بسيطة قبل استدعاء الفني. إليك أشهر المشاكل وحلولها من خبراء شركة نسيم:</p><h3>المكيف لا يبرد جيداً</h3><ul><li>تأكد من نظافة الفلتر</li><li>افحص الوحدة الخارجية من الأتربة</li><li>تأكد من إغلاق النوافذ والأبواب</li><li>فحص مستوى الفريون</li></ul><h3>المكيف يصدر أصواتاً غريبة</h3><ul><li>تنظيف المروحة من الأتربة</li><li>فحص البراغي والمسامير</li><li>التأكد من استقرار الوحدة</li></ul><h3>تسريب المياه من المكيف</h3><ul><li>تنظيف مجرى التصريف</li><li>فحص مضخة التصريف</li><li>التأكد من ميل الوحدة الصحيح</li></ul><h3>المكيف لا يعمل نهائياً</h3><ul><li>فحص الكهرباء والفيوزات</li><li>التأكد من بطاريات الريموت</li><li>فحص قاطع الدائرة</li></ul><p><strong>تنبيه:</strong> إذا لم تنجح هذه الحلول، اتصل بشركة نسيم فوراً لتجنب تفاقم المشكلة.</p>',
    excerpt: 'دليل عملي لحل المشاكل الشائعة للمكيفات بنفسك قبل استدعاء الفني من خبراء شركة نسيم',
    status: 'published',
    category: 'حلول تقنية',
    tags: ['مشاكل المكيفات', 'حلول سريعة', 'صيانة ذاتية'],
    featuredImage: '/images/ac-troubleshooting.jpg',
    author: 'أ. محمد الفني - كبير الفنيين بشركة نسيم',
    seo: {
      metaTitle: 'حلول سريعة لأشهر مشاكل المكيفات - شركة نسيم',
      metaDescription: 'دليل عملي لحل المشاكل الشائعة للمكيفات بنفسك قبل استدعاء الفني من خبراء شركة نسيم',
      keywords: ['مشاكل المكيفات', 'إصلاح المكيفات', 'حلول سريعة', 'شركة نسيم'],
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-12'),
  },
  {
    id: '4',
    title: 'أفضل أنواع المكيفات للمنازل السعودية 2024',
    slug: 'best-ac-types-saudi-homes-2024',
    content: '<h2>دليل اختيار المكيف المناسب للمناخ السعودي</h2><p>اختيار المكيف المناسب في المملكة يتطلب فهماً عميقاً للمناخ المحلي والاحتياجات الخاصة. خبراء شركة نسيم يقدمون لك هذا الدليل الشامل:</p><h3>المكيفات الاسبليت (Split AC)</h3><p><strong>المميزات:</strong></p><ul><li>كفاءة عالية في الطاقة</li><li>هدوء في التشغيل</li><li>سهولة التحكم</li><li>مناسب للغرف المتوسطة والكبيرة</li></ul><p><strong>الأسعار:</strong> من 1,200 إلى 3,500 ريال</p><h3>المكيفات الشباك (Window AC)</h3><p><strong>المميزات:</strong></p><ul><li>سعر اقتصادي</li><li>سهولة التركيب</li><li>مناسب للغرف الصغيرة</li></ul><p><strong>العيوب:</strong> استهلاك أعلى للطاقة، ضوضاء أكثر</p><h3>المكيفات المركزية (Central AC)</h3><p><strong>مناسب للفلل والمباني الكبيرة</strong></p><ul><li>توزيع متساوي للهواء</li><li>كفاءة عالية للمساحات الكبيرة</li><li>تحكم مركزي</li></ul><h3>نصائح الاختيار من شركة نسيم:</h3><ol><li>احسب المساحة بدقة (BTU مطلوب = المساحة × 25)</li><li>اختر علامة تجارية موثوقة</li><li>تأكد من توفر قطع الغيار</li><li>اهتم بتقييم كفاءة الطاقة</li></ol>',
    excerpt: 'دليل شامل لاختيار أفضل أنواع المكيفات المناسبة للمناخ السعودي مع توصيات خبراء شركة نسيم',
    status: 'published',
    category: 'دليل الشراء',
    tags: ['أنواع المكيفات', 'دليل الشراء', 'مكيفات 2024'],
    featuredImage: '/images/best-ac-types-2024.jpg',
    author: 'م. عبدالرحمن السعد - مستشار المبيعات التقنية',
    seo: {
      metaTitle: 'أفضل أنواع المكيفات للمنازل السعودية 2024 - شركة نسيم',
      metaDescription: 'دليل شامل لاختيار أفضل أنواع المكيفات المناسبة للمناخ السعودي مع توصيات خبراء شركة نسيم',
      keywords: ['أفضل مكيفات 2024', 'مكيفات السعودية', 'دليل شراء المكيفات', 'شركة نسيم'],
    },
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-05'),
  },
];

export const createPostSlice: StateCreator<PostStore> = (set, get) => ({
  posts: realPosts,
  currentPost: null,

  setPosts: (posts) => set({ posts }),

  setCurrentPost: (post) => set({ currentPost: post }),

  addPost: (postData) => {
    const newPost: Post = {
      ...postData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      posts: [...state.posts, newPost],
      currentPost: newPost,
    }));
  },

  updatePost: (id, updates) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === id
          ? { ...post, ...updates, updatedAt: new Date() }
          : post
      );
      
      const updatedCurrentPost = state.currentPost?.id === id
        ? { ...state.currentPost, ...updates, updatedAt: new Date() }
        : state.currentPost;

      return {
        posts: updatedPosts,
        currentPost: updatedCurrentPost,
      };
    });
  },

  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      currentPost: state.currentPost?.id === id ? null : state.currentPost,
    }));
  },

  duplicatePost: (id) => {
    const { posts } = get();
    const originalPost = posts.find((post) => post.id === id);
    
    if (originalPost) {
      const duplicatedPost: Post = {
        ...originalPost,
        id: uuidv4(),
        title: `${originalPost.title} - نسخة`,
        slug: `${originalPost.slug}-copy`,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      set((state) => ({
        posts: [...state.posts, duplicatedPost],
      }));
    }
  },

  getPostsByStatus: (status) => {
    const { posts } = get();
    return posts.filter((post) => post.status === status);
  },

  getPostsByCategory: (category) => {
    const { posts } = get();
    return posts.filter((post) => post.category === category);
  },

  searchPosts: (query) => {
    const { posts } = get();
    const lowercaseQuery = query.toLowerCase();
    
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  },
});