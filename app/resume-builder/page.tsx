'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Modal = dynamic<typeof import('react-modal')['default']>(() => import('react-modal'), { ssr: false });

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    const canvas = await html2canvas(previewRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save('resume.pdf');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-lg mb-4">
        <Link href="/" className="text-blue-700 hover:underline text-sm">&larr; Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Resume Builder</h1>
      <form className="bg-white rounded shadow p-6 flex flex-col gap-4 w-full max-w-lg" onSubmit={handlePreview}>
        <input className="p-2 border rounded" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input className="p-2 border rounded" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="p-2 border rounded" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <textarea className="p-2 border rounded" name="summary" placeholder="Professional Summary" value={form.summary} onChange={handleChange} rows={2} />
        <textarea className="p-2 border rounded" name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} rows={3} />
        <textarea className="p-2 border rounded" name="education" placeholder="Education" value={form.education} onChange={handleChange} rows={2} />
        <textarea className="p-2 border rounded" name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} rows={2} />
        <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-semibold">Preview Resume</button>
      </form>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Resume Preview"
        ariaHideApp={false}
        style={{ overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.5)' }, content: { maxWidth: 600, margin: 'auto', borderRadius: 8 } }}
      >
        <div ref={previewRef} className="bg-white p-6 rounded shadow text-gray-800 min-w-[300px]">
          <h2 className="text-2xl font-bold mb-2">{form.name}</h2>
          <div className="mb-2 text-sm text-gray-600">{form.email} | {form.phone}</div>
          <div className="mb-4"><strong>Summary:</strong> {form.summary}</div>
          <div className="mb-4"><strong>Experience:</strong> <br />{form.experience}</div>
          <div className="mb-4"><strong>Education:</strong> <br />{form.education}</div>
          <div className="mb-4"><strong>Skills:</strong> {form.skills.split(',').map(skill => <span key={skill} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-1 text-xs">{skill.trim()}</span>)}</div>
        </div>
        <div className="flex gap-4 mt-6 justify-end">
          <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold">Export & Download</button>
          <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition font-semibold">Close</button>
        </div>
      </Modal>
    </div>
  );
} 