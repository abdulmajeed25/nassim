import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Plus, Edit, Trash2, Move, ChevronDown, ChevronRight, Menu as MenuIcon } from 'lucide-react';
import type { Menu, MenuItem } from '../../types';

const Menus: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: '1',
      name: 'القائمة الرئيسية',
      location: 'header',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: '1',
          title: 'الرئيسية',
          type: 'internal',
          label: 'الرئيسية',
          url: '/',
          order: 1,
          children: [],
          isActive: true
        },
        {
          id: '2',
          title: 'خدماتنا',
          type: 'internal',
          label: 'خدماتنا',
          url: '/services',
          order: 2,
          isActive: true,
          children: [
            {
              id: '3',
              title: 'صيانة المكيفات',
              type: 'internal',
              label: 'صيانة المكيفات',
              url: '/services/maintenance',
              order: 1,
              children: [],
              isActive: true
            },
            {
              id: '4',
              title: 'تنظيف المكيفات',
              type: 'internal',
              label: 'تنظيف المكيفات',
              url: '/services/cleaning',
              order: 2,
              children: [],
              isActive: true
            }
          ]
        },
        {
          id: '5',
          title: 'اتصل بنا',
          type: 'internal',
          label: 'اتصل بنا',
          url: '/contact',
          order: 3,
          children: [],
          isActive: true
        }
      ]
    },
    {
      id: '2',
      name: 'قائمة التذييل',
      location: 'footer',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: '6',
          title: 'سياسة الخصوصية',
          type: 'internal',
          label: 'سياسة الخصوصية',
          url: '/privacy',
          order: 1,
          children: [],
          isActive: true
        },
        {
          id: '7',
          title: 'شروط الاستخدام',
          type: 'internal',
          label: 'شروط الاستخدام',
          url: '/terms',
          order: 2,
          children: [],
          isActive: true
        }
      ]
    }
  ]);
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const currentMenu = menus.find(menu => menu.id === selectedMenu);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      setMenus(menus.map(menu => {
        if (menu.id === selectedMenu) {
          return {
            ...menu,
            items: removeItemRecursively(menu.items, itemId)
          };
        }
        return menu;
      }));
    }
  };

  const removeItemRecursively = (items: MenuItem[], itemId: string): MenuItem[] => {
    return items.filter(item => item.id !== itemId).map(item => ({
      ...item,
      children: item.children ? removeItemRecursively(item.children, itemId) : []
    }));
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isEditing = editingItem === item.id;

    return (
      <div key={item.id} className="border-b border-gray-100 last:border-b-0">
        <div 
          className={`flex items-center gap-3 p-3 hover:bg-gray-50 ${
            level > 0 ? `mr-${level * 6}` : ''
          }`}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {!hasChildren && level > 0 && (
            <div className="w-4 h-4" />
          )}

          <div className="flex-1">
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={item.label}
                  className="flex-1"
                  onChange={(value: string) => console.log(value)}

                />
                <Input
                  type="text"
                  value={item.url}
                  className="flex-1"
                  placeholder="الرابط"
                  onChange={(value: string) => console.log(value)}
                />
              </div>
            ) : (
              <div>
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.url}</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingItem(isEditing ? null : item.id)}
              className="flex items-center gap-1"
            >
              <Edit className="w-3 h-3" />
              {isEditing ? 'حفظ' : 'تحرير'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
              onClick={() => handleDeleteItem(item.id)}
            >
              <Trash2 className="w-3 h-3" />
              حذف
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 cursor-move"
            >
              <Move className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="bg-gray-25">
            {item.children?.map((child: MenuItem) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const getLocationText = (location: string) => {
    switch (location) {
      case 'header': return 'الرأس';
      case 'footer': return 'التذييل';
      case 'sidebar': return 'الشريط الجانبي';
      default: return location;
    }
  };

  return (
    <Layout>
      <div className="admin-panel">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة القوائم</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              عنصر جديد
            </Button>
            <Button className="flex items-center gap-2">
              <MenuIcon className="w-4 h-4" />
              قائمة جديدة
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menu Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">القوائم المتاحة</h3>
              </div>
              <div className="p-2">
                {menus.map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setSelectedMenu(menu.id)}
                    className={`w-full text-right p-3 rounded-md transition-colors ${
                      selectedMenu === menu.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{menu.name}</div>
                    <div className="text-sm opacity-75">
                      {getLocationText(menu.location)} • {menu.items.length} عنصر
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {currentMenu?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      موقع العرض: {getLocationText(currentMenu?.location || '')}
                    </p>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة عنصر
                  </Button>
                </div>
              </div>

              <div className="min-h-96">
                {currentMenu?.items.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="mb-4">
                      <MenuIcon className="w-12 h-12 mx-auto text-gray-300" />
                    </div>
                    <p>لا توجد عناصر في هذه القائمة</p>
                    <Button className="mt-4 flex items-center gap-2 mx-auto">
                      <Plus className="w-4 h-4" />
                      إضافة أول عنصر
                    </Button>
                  </div>
                ) : (
                  <div>
                    {currentMenu?.items.map((item: MenuItem) => renderMenuItem(item))}
                  </div>
                )}
              </div>
            </div>

            {/* Menu Settings */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">إعدادات القائمة</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم القائمة
                  </label>
                  <Input
                    type="text"
                    value={currentMenu?.name || ''}
                    placeholder="اسم القائمة"
                    onChange={(value: string) => console.log(value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موقع العرض
                  </label>
                  <select
                    value={currentMenu?.location || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="header">الرأس</option>
                    <option value="footer">التذييل</option>
                    <option value="sidebar">الشريط الجانبي</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">إلغاء</Button>
                  <Button>حفظ التغييرات</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Menus;