import React, { useState } from 'react';
import type { BookingData } from '../src/types';
import { SERVICES } from '../constants.tsx';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0]?.title || '',
    date: '',
    time: '',
    notes: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: BookingData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: SERVICES[0]?.title || '', date: '', time: '', notes: '' });
      setTimeout(() => setStatus('idle'), 5000); // Reset form status after 5 seconds
    }, 2000);
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">احجز موعدك الآن</h2>
            <p className="mt-4 text-lg text-slate-600">املأ النموذج وسنتواصل معك في أقرب وقت لتأكيد حجزك.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-2xl shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm" placeholder="مثال: محمد عبدالله" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">رقم الجوال</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm" placeholder="05xxxxxxxx" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm" placeholder="example@email.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-bold text-slate-700 mb-2">نوع الخدمة</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm bg-white">
                  {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-bold text-slate-700 mb-2">التاريخ المفضل</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="time" className="block text-sm font-bold text-slate-700 mb-2">الوقت المفضل</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm" />
              </div>
              <div></div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-bold text-slate-700 mb-2">ملاحظات إضافية (اختياري)</label>
              <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 shadow-sm" placeholder="صف المشكلة أو أي تفاصيل أخرى..."></textarea>
            </div>
            <div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-cyan-600 text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed">
                {status === 'loading' ? 'جاري الإرسال...' : 'تأكيد الحجز'}
              </button>
            </div>
            {status === 'success' && <p className="text-center text-green-600 bg-green-100 p-3 rounded-lg">تم استلام طلبك بنجاح! سنتواصل معك قريبًا.</p>}
            {status === 'error' && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">الرجاء تعبئة جميع الحقول المطلوبة (الاسم، الجوال، العنوان).</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;