import React, { useState, useEffect, useMemo, useRef } from 'react';

const Icon = ({ name, className = "w-4 h-4", ...props }) => {
  const icons = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    order: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    approval: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    vendor: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    price: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />,
    po: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />,
    receiving: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    bast: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
    invoice: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />,
    payment: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    reports: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    audit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    master: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    ai: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />,
    chevronRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />,
    send: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    eye: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ),
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
    arrowLeft: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />,
    camera: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
  };
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      {icons[name] || icons.dashboard}
    </svg>
  );
};

const formatRp = (num) => {
  if (num === null || num === undefined) return "Rp 0";
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
};

const getStatusBadge = (status) => {
  const styles = {
    'Draft': 'bg-gray-100 text-gray-700 border-gray-300',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Waiting Approval': 'bg-amber-50 text-amber-700 border-amber-300 animate-pulse',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-300',
    'Rejected': 'bg-rose-50 text-rose-700 border-rose-300',
    'Returned': 'bg-orange-50 text-orange-700 border-orange-300',
    'PO Created': 'bg-indigo-50 text-indigo-700 border-indigo-300',
    'PO Sent': 'bg-purple-50 text-purple-700 border-purple-300',
    'Confirmed': 'bg-cyan-50 text-cyan-700 border-cyan-300',
    'Partially Received': 'bg-yellow-50 text-yellow-800 border-yellow-300',
    'Received': 'bg-teal-50 text-teal-700 border-teal-300',
    'BAST Submitted': 'bg-blue-50 text-blue-800 border-blue-300',
    'BAST Verified': 'bg-emerald-50 text-emerald-800 border-emerald-400',
    'Invoice Received': 'bg-purple-50 text-purple-800 border-purple-300',
    'Payment Pending': 'bg-amber-100 text-amber-900 border-amber-400',
    'Paid': 'bg-emerald-100 text-emerald-900 border-emerald-500 font-semibold',
    'Completed': 'bg-emerald-600 text-white border-emerald-700 font-bold',
    'Cancelled': 'bg-gray-200 text-gray-800 border-gray-400'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status}
    </span>
  );
};

const INITIAL_USERS = [
  { id: 'usr-1', name: 'Andi Pratama', role: 'FIELD / REQUESTER', email: 'andi@project-alpha.co.id', dept: 'Sipil & Konstruksi' },
  { id: 'usr-2', name: 'Budi Santoso', role: 'PROCUREMENT', email: 'budi.proc@enterprise.co.id', dept: 'Procurement' },
  { id: 'usr-3', name: 'Citra Dewi', role: 'APPROVER', email: 'citra.pm@enterprise.co.id', dept: 'Project Management' },
  { id: 'usr-4', name: 'Dedi Kurniawan', role: 'FIELD RECEIVER', email: 'dedi.site@project-alpha.co.id', dept: 'Logistik Lapangan' },
  { id: 'usr-5', name: 'Eka Rahmawati', role: 'FINANCE', email: 'eka.finance@enterprise.co.id', dept: 'Finance & Treasury' },
  { id: 'usr-6', name: 'Ferry Gunawan', role: 'MANAGEMENT', email: 'ferry.dir@enterprise.co.id', dept: 'Board of Directors' },
  { id: 'usr-7', name: 'Admin IT', role: 'ADMIN', email: 'admin@enterprise.co.id', dept: 'Information Technology' },
];

const INITIAL_PROJECTS = [
  { id: 'PRJ-01', name: 'Project Alpha (Menara Nusantara)', location: 'IKN Nusantara, Kaltim', manager: 'Citra Dewi', status: 'ACTIVE' },
  { id: 'PRJ-02', name: 'Project Beta (Tol Trans Jawa Pkt 4)', location: 'Semarang - Demak', manager: 'Herman Wijaya', status: 'ACTIVE' },
  { id: 'PRJ-03', name: 'Project Gamma (Data Center Tier 4)', location: 'Cikarang, Bekasi', manager: 'Rudi Hartono', status: 'ACTIVE' }
];

const INITIAL_DEPARTMENTS = [
  { id: 'DEP-01', name: 'Sipil & Struktur', manager: 'Andi Wijaya' },
  { id: 'DEP-02', name: 'MEP & Elektrikal', manager: 'Surya Kencana' },
  { id: 'DEP-03', name: 'Logistik & Gudang', manager: 'Dedi Kurniawan' },
  { id: 'DEP-04', name: 'Finansial & Akuntansi', manager: 'Eka Rahmawati' }
];

const INITIAL_ITEMS = [
  { code: 'ITM-001', name: 'Semen Portland Komposit 50kg', category: 'Material Semen', spec: 'Tipe PCC SNI 2049', unit: 'Sak', estPrice: 58000 },
  { code: 'ITM-002', name: 'Besi Beton Ulir 10mm x 12m', category: 'Material Baja', spec: 'BJTS 420B SNI', unit: 'Batang', estPrice: 85000 },
  { code: 'ITM-003', name: 'Besi Beton Ulir 12mm x 12m', category: 'Material Baja', spec: 'BJTS 420B SNI', unit: 'Batang', estPrice: 122000 },
  { code: 'ITM-004', name: 'Kabel Listrik NYY 4 x 10 mm2', category: 'Elektrikal', spec: 'Tembaga Cu/PVC/PVC 0.6/1kV', unit: 'Meter', estPrice: 65000 },
  { code: 'ITM-005', name: 'Cat Tembok Weatherproof 25kg', category: 'Finishing', spec: 'Eksterior Acrylic White', unit: 'Pail', estPrice: 850000 },
  { code: 'ITM-006', name: 'Pipa PVC AW 4 inch (4 meter)', category: 'Plumbing', spec: 'Tekanan 10kg/cm2 SNI', unit: 'Batang', estPrice: 195000 },
  { code: 'ITM-007', name: 'Batu Split Cor 1-2', category: 'Agregat', spec: 'Batu pecah hitam keras', unit: 'm3', estPrice: 280000 },
  { code: 'ITM-008', name: 'Pasir Cor Extra Bersih', category: 'Agregat', spec: 'Kadar lumpur < 5%', unit: 'm3', estPrice: 320000 },
  { code: 'ITM-009', name: 'Baut Baja Grade 8.8 M16x60mm', category: 'Fastener', spec: 'Hot Dip Galvanized + Nut', unit: 'Set', estPrice: 18500 },
  { code: 'ITM-010', name: 'Lampu Highbay Industrial LED 100W', category: 'Elektrikal', spec: 'IP65 Waterproof 6500K', unit: 'Unit', estPrice: 480000 }
];

const INITIAL_VENDORS = [
  { id: 'VND-001', code: 'VND-MJ', name: 'PT Maju Jaya Makmur', legal: 'PT Maju Jaya Makmur Tbk', category: 'Material Bangunan & Semen', contact: 'Irwan Setiadi', phone: '0812-3344-5566', email: 'sales@majujaya.co.id', address: 'Kawasan Industri Pulogadung, Jakarta Timur', bankName: 'Bank Mandiri', bankAcc: '123-00-998877-1', taxId: '01.234.567.8-031.000', status: 'ACTIVE', rating: 4.8 },
  { id: 'VND-002', code: 'VND-SM', name: 'CV Sumber Makmur Abadi', legal: 'CV Sumber Makmur Abadi', category: 'Material Bangunan & Besi', contact: 'Hendra Kusuma', phone: '0813-8899-1122', email: 'hendra@sumbermakmur.com', address: 'Jl. Raya Narogong Km 14, Bekasi', bankName: 'BCA', bankAcc: '887-019-2231', taxId: '02.443.112.5-412.000', status: 'ACTIVE', rating: 4.5 },
  { id: 'VND-003', code: 'VND-KN', name: 'PT Karya Nusantara Teknik', legal: 'PT Karya Nusantara Teknik', category: 'Elektrikal & Mekanikal', contact: 'Lina Marlina', phone: '0811-9988-7744', email: 'order@karyanusantara.co.id', address: 'Ruko Mega Grosir Cempaka Mas, Jakarta Pusat', bankName: 'BNI', bankAcc: '021-998-334', taxId: '01.888.777.6-021.000', status: 'ACTIVE', rating: 4.9 },
  { id: 'VND-004', code: 'VND-SA', name: 'PT Sentosa Abadi Material', legal: 'PT Sentosa Abadi Material', category: 'Material Bangunan & Agregat', contact: 'Wahyu Hidayat', phone: '0815-6677-8899', email: 'wahyu@sentosaabadi.co.id', address: 'Jl. Raya Cilegon Km 12, Serang, Banten', bankName: 'BRI', bankAcc: '0112-01-002233-50-1', taxId: '03.119.228.4-401.000', status: 'ACTIVE', rating: 4.2 },
  { id: 'VND-005', code: 'VND-PT', name: 'CV Prima Teknik Solusi', legal: 'CV Prima Teknik Solusi', category: 'Plumbing & Hardware', contact: 'Agus Salim', phone: '0818-0992-1212', email: 'agus@primateknik.biz', address: 'Komp. Pergudangan Daan Mogot, Jakarta Barat', bankName: 'BCA', bankAcc: '554-099-1123', taxId: '04.991.223.1-014.000', status: 'ACTIVE', rating: 4.6 },
];

const INITIAL_PRICE_HISTORY = [
  { id: 'PH-01', itemCode: 'ITM-001', vendorId: 'VND-001', vendorName: 'PT Maju Jaya Makmur', unitPrice: 59000, poNo: 'PO-2026-088', date: '2026-07-10', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-02', itemCode: 'ITM-001', vendorId: 'VND-002', vendorName: 'CV Sumber Makmur Abadi', unitPrice: 56000, poNo: 'PO-2026-092', date: '2026-07-28', project: 'Project Beta', location: 'Semarang' },
  { id: 'PH-03', itemCode: 'ITM-001', vendorId: 'VND-004', vendorName: 'PT Sentosa Abadi Material', unitPrice: 57500, poNo: 'PO-2026-104', date: '2026-08-15', project: 'Project Gamma', location: 'Cikarang' },
  { id: 'PH-04', itemCode: 'ITM-002', vendorId: 'VND-002', vendorName: 'CV Sumber Makmur Abadi', unitPrice: 83000, poNo: 'PO-2026-071', date: '2026-06-20', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-05', itemCode: 'ITM-002', vendorId: 'VND-001', vendorName: 'PT Maju Jaya Makmur', unitPrice: 87000, poNo: 'PO-2026-085', date: '2026-07-05', project: 'Project Gamma', location: 'Cikarang' },
  { id: 'PH-06', itemCode: 'ITM-003', vendorId: 'VND-002', vendorName: 'CV Sumber Makmur Abadi', unitPrice: 120000, poNo: 'PO-2026-090', date: '2026-07-15', project: 'Project Beta', location: 'Semarang' },
  { id: 'PH-07', itemCode: 'ITM-003', vendorId: 'VND-001', vendorName: 'PT Maju Jaya Makmur', unitPrice: 125000, poNo: 'PO-2026-098', date: '2026-08-01', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-08', itemCode: 'ITM-004', vendorId: 'VND-003', vendorName: 'PT Karya Nusantara Teknik', unitPrice: 63000, poNo: 'PO-2026-065', date: '2026-06-11', project: 'Project Gamma', location: 'Cikarang' },
  { id: 'PH-09', itemCode: 'ITM-004', vendorId: 'VND-005', vendorName: 'CV Prima Teknik Solusi', unitPrice: 67000, poNo: 'PO-2026-077', date: '2026-07-01', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-10', itemCode: 'ITM-005', vendorId: 'VND-001', vendorName: 'PT Maju Jaya Makmur', unitPrice: 840000, poNo: 'PO-2026-080', date: '2026-07-08', project: 'Project Beta', location: 'Semarang' },
  { id: 'PH-11', itemCode: 'ITM-006', vendorId: 'VND-005', vendorName: 'CV Prima Teknik Solusi', unitPrice: 190000, poNo: 'PO-2026-084', date: '2026-07-14', project: 'Project Gamma', location: 'Cikarang' },
  { id: 'PH-12', itemCode: 'ITM-006', vendorId: 'VND-002', vendorName: 'CV Sumber Makmur Abadi', unitPrice: 198000, poNo: 'PO-2026-095', date: '2026-08-03', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-13', itemCode: 'ITM-007', vendorId: 'VND-004', vendorName: 'PT Sentosa Abadi Material', unitPrice: 275000, poNo: 'PO-2026-070', date: '2026-06-18', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-14', itemCode: 'ITM-008', vendorId: 'VND-004', vendorName: 'PT Sentosa Abadi Material', unitPrice: 310000, poNo: 'PO-2026-072', date: '2026-06-25', project: 'Project Alpha', location: 'IKN' },
  { id: 'PH-15', itemCode: 'ITM-009', vendorId: 'VND-005', vendorName: 'CV Prima Teknik Solusi', unitPrice: 17500, poNo: 'PO-2026-089', date: '2026-07-12', project: 'Project Gamma', location: 'Cikarang' },
  { id: 'PH-16', itemCode: 'ITM-010', vendorId: 'VND-003', vendorName: 'PT Karya Nusantara Teknik', unitPrice: 470000, poNo: 'PO-2026-099', date: '2026-08-05', project: 'Project Gamma', location: 'Cikarang' },
];

const INITIAL_APPROVAL_CONFIG = [
  { level: 1, minAmount: 0, maxAmount: 10000000, approverRole: 'Supervisor / Project Manager', description: 'Otorisasi Lapangan / Supervisor' },
  { level: 2, minAmount: 10000001, maxAmount: 50000000, approverRole: 'Procurement Manager', description: 'Verifikasi Komersial & Anggaran' },
  { level: 3, minAmount: 50000001, maxAmount: 999999999999, approverRole: 'Management / Director', description: 'Persetujuan Direksi / Dewan Manajemen' }
];

const INITIAL_ORDERS = [
  {
    orderNo: 'ORD-2026-0001',
    date: '2026-09-07',
    projectId: 'PRJ-01',
    projectName: 'Project Alpha (Menara Nusantara)',
    location: 'IKN Nusantara, Kaltim',
    department: 'Sipil & Struktur',
    requester: 'Andi Pratama',
    priority: 'HIGH',
    requiredDate: '2026-09-18',
    notes: 'Kebutuhan mendesak pengecoran lantai 8 & grounding zone barat.',
    status: 'Waiting Approval',
    currentApprovalLevel: 2,
    totalEstimated: 31700000,
    items: [
      { id: 'it-1', itemCode: 'ITM-001', name: 'Semen Portland Komposit 50kg', spec: 'Tipe PCC SNI 2049', qty: 150, unit: 'Sak', estPrice: 58000, total: 8700000, selectedVendorId: 'VND-002', selectedVendorName: 'CV Sumber Makmur Abadi', selectedPrice: 56000, justification: '' },
      { id: 'it-2', itemCode: 'ITM-002', name: 'Besi Beton Ulir 10mm x 12m', spec: 'BJTS 420B SNI', qty: 100, unit: 'Batang', estPrice: 85000, total: 8500000, selectedVendorId: 'VND-002', selectedVendorName: 'CV Sumber Makmur Abadi', selectedPrice: 83000, justification: '' },
      { id: 'it-3', itemCode: 'ITM-004', name: 'Kabel Listrik NYY 4 x 10 mm2', spec: 'Cu/PVC 0.6/1kV', qty: 200, unit: 'Meter', estPrice: 72500, total: 14500000, selectedVendorId: 'VND-003', selectedVendorName: 'PT Karya Nusantara Teknik', selectedPrice: 63000, justification: '' },
    ],
    approvalTimeline: [
      { level: 1, approver: 'Citra Dewi (PM)', role: 'Supervisor / Project Manager', status: 'Approved', timestamp: '2026-09-08 10:15 WITA', comment: 'Kebutuhan valid sesuai jadwal cor zona barat.' },
      { level: 2, approver: 'Budi Santoso (Procurement Mgr)', role: 'Procurement Manager', status: 'Pending', timestamp: null, comment: '' }
    ]
  },
  {
    orderNo: 'ORD-2026-0002',
    date: '2026-09-05',
    projectId: 'PRJ-02',
    projectName: 'Project Beta (Tol Trans Jawa Pkt 4)',
    location: 'Semarang - Demak',
    department: 'Sipil & Struktur',
    requester: 'Andi Pratama',
    priority: 'MEDIUM',
    requiredDate: '2026-09-22',
    notes: 'Pemasangan gorong-gorong dan drainase primer.',
    status: 'Approved',
    currentApprovalLevel: 3,
    totalEstimated: 58200000,
    items: [
      { id: 'it-4', itemCode: 'ITM-006', name: 'Pipa PVC AW 4 inch (4 meter)', spec: 'Tekanan 10kg/cm2 SNI', qty: 120, unit: 'Batang', estPrice: 195000, total: 23400000, selectedVendorId: 'VND-005', selectedVendorName: 'CV Prima Teknik Solusi', selectedPrice: 190000, justification: 'Vendor terdekat dengan lokasi Semarang.' },
      { id: 'it-5', itemCode: 'ITM-007', name: 'Batu Split Cor 1-2', spec: 'Batu pecah hitam keras', qty: 60, unit: 'm3', estPrice: 280000, total: 16800000, selectedVendorId: 'VND-004', selectedVendorName: 'PT Sentosa Abadi Material', selectedPrice: 275000, justification: '' },
      { id: 'it-6', itemCode: 'ITM-008', name: 'Pasir Cor Extra Bersih', spec: 'Kadar lumpur < 5%', qty: 50, unit: 'm3', estPrice: 360000, total: 18000000, selectedVendorId: 'VND-004', selectedVendorName: 'PT Sentosa Abadi Material', selectedPrice: 350000, justification: 'Harga sedikit di atas histori karena biaya angkut quarry.' },
    ],
    approvalTimeline: [
      { level: 1, approver: 'Citra Dewi', role: 'Supervisor / Project Manager', status: 'Approved', timestamp: '2026-09-05 14:00 WITA', comment: 'Disetujui untuk percepatan timbunan.' },
      { level: 2, approver: 'Budi Santoso', role: 'Procurement Manager', status: 'Approved', timestamp: '2026-09-06 09:30 WITA', comment: 'Spesifikasi teknis lolos verifikasi.' },
      { level: 3, approver: 'Ferry Gunawan', role: 'Management / Director', status: 'Approved', timestamp: '2026-09-06 17:00 WITA', comment: 'OK, eksekusi segera ke vendor terpilih.' }
    ]
  },
  {
    orderNo: 'ORD-2026-0003',
    date: '2026-09-01',
    projectId: 'PRJ-03',
    projectName: 'Project Gamma (Data Center Tier 4)',
    location: 'Cikarang, Bekasi',
    department: 'MEP & Elektrikal',
    requester: 'Andi Pratama',
    priority: 'HIGH',
    requiredDate: '2026-09-12',
    notes: 'Penerangan ruang server dan switchgear.',
    status: 'PO Sent',
    currentApprovalLevel: 2,
    totalEstimated: 24000000,
    items: [
      { id: 'it-7', itemCode: 'ITM-010', name: 'Lampu Highbay Industrial LED 100W', spec: 'IP65 Waterproof 6500K', qty: 50, unit: 'Unit', estPrice: 480000, total: 24000000, selectedVendorId: 'VND-003', selectedVendorName: 'PT Karya Nusantara Teknik', selectedPrice: 470000, justification: '' }
    ],
    approvalTimeline: [
      { level: 1, approver: 'Citra Dewi', role: 'Supervisor / Project Manager', status: 'Approved', timestamp: '2026-09-02 08:30 WIB', comment: 'Approved.' },
      { level: 2, approver: 'Budi Santoso', role: 'Procurement Manager', status: 'Approved', timestamp: '2026-09-02 11:45 WIB', comment: 'Approved vendor PT Karya Nusantara.' }
    ]
  }
];

const INITIAL_PURCHASE_ORDERS = [
  {
    poNo: 'PO-2026-0101',
    orderNo: 'ORD-2026-0003',
    vendorId: 'VND-003',
    vendorName: 'PT Karya Nusantara Teknik',
    vendorEmail: 'order@karyanusantara.co.id',
    vendorAddress: 'Ruko Mega Grosir Cempaka Mas, Jakarta Pusat',
    projectId: 'PRJ-03',
    projectName: 'Project Gamma (Data Center Tier 4)',
    deliveryLocation: 'Kawasan Delta Silicon 6, Cikarang',
    poDate: '2026-09-02',
    expectedDate: '2026-09-10',
    paymentTerms: 'NET 30 Hari Setelah BAST',
    currency: 'IDR',
    buyer: 'Budi Santoso',
    status: 'PO Sent',
    sentTimestamp: '2026-09-02 14:10 WIB',
    items: [
      { itemCode: 'ITM-010', name: 'Lampu Highbay Industrial LED 100W', spec: 'IP65 Waterproof 6500K', qty: 50, unit: 'Unit', unitPrice: 470000, subtotal: 23500000, receivedQty: 50 }
    ],
    subtotal: 23500000,
    tax: 2585000,
    total: 26085000
  },
  {
    poNo: 'PO-2026-0099',
    orderNo: 'ORD-2026-0000',
    vendorId: 'VND-001',
    vendorName: 'PT Maju Jaya Makmur',
    vendorEmail: 'sales@majujaya.co.id',
    vendorAddress: 'Kawasan Industri Pulogadung, Jakarta',
    projectId: 'PRJ-01',
    projectName: 'Project Alpha (Menara Nusantara)',
    deliveryLocation: 'Site Alpha Kaltim',
    poDate: '2026-08-20',
    expectedDate: '2026-08-30',
    paymentTerms: 'NET 14 Hari',
    currency: 'IDR',
    buyer: 'Budi Santoso',
    status: 'Completed',
    sentTimestamp: '2026-08-20 10:00 WITA',
    items: [
      { itemCode: 'ITM-005', name: 'Cat Tembok Weatherproof 25kg', spec: 'Eksterior Acrylic White', qty: 20, unit: 'Pail', unitPrice: 840000, subtotal: 16800000, receivedQty: 20 }
    ],
    subtotal: 16800000,
    tax: 1848000,
    total: 18648000
  }
];

const INITIAL_BASTS = [
  {
    bastNo: 'BAST-2026-0045',
    poNo: 'PO-2026-0099',
    orderNo: 'ORD-2026-0000',
    vendorName: 'PT Maju Jaya Makmur',
    projectName: 'Project Alpha (Menara Nusantara)',
    date: '2026-08-29',
    receiver: 'Dedi Kurniawan',
    vendorRep: 'Slamet Riyadi (Driver Ekspedisi)',
    deliveryNoteNo: 'SJ-MJ-88219',
    status: 'BAST Verified',
    notes: '20 pail cat diterima dalam kondisi tersegel baik tanpa bocor.',
    items: [
      { name: 'Cat Tembok Weatherproof 25kg', orderedQty: 20, receivedQty: 20, unit: 'Pail', condition: 'BAIK' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80'
    ],
    receiverSignature: 'Dedi Kurniawan (Verified Digital Signature)'
  }
];

const INITIAL_INVOICES = [
  {
    invNo: 'INV-MJ-2026-0412',
    date: '2026-09-01',
    dueDate: '2026-09-20',
    vendorId: 'VND-001',
    vendorName: 'PT Maju Jaya Makmur',
    poNo: 'PO-2026-0099',
    bastNo: 'BAST-2026-0045',
    amount: 16800000,
    tax: 1848000,
    total: 18648000,
    status: 'Paid',
    matchStatus: 'MATCHED',
    poAmount: 18648000,
    bastQtyStatus: '100% Sesuai BAST',
    difference: 0,
    notes: '3-Way matching 100% valid dengan PO dan BAST-2026-0045.'
  },
  {
    invNo: 'INV-KN-2026-0891',
    date: '2026-09-08',
    dueDate: '2026-10-08',
    vendorId: 'VND-003',
    vendorName: 'PT Karya Nusantara Teknik',
    poNo: 'PO-2026-0101',
    bastNo: '-',
    amount: 23500000,
    tax: 2585000,
    total: 26085000,
    status: 'Invoice Received',
    matchStatus: 'PENDING_BAST',
    poAmount: 26085000,
    bastQtyStatus: 'Menunggu BAST Lapangan',
    difference: 0,
    notes: 'Invoice diterima lebih awal dari pengiriman fisik.'
  }
];

const INITIAL_PAYMENTS = [
  {
    paymentNo: 'PAY-2026-0028',
    invNo: 'INV-MJ-2026-0412',
    vendorName: 'PT Maju Jaya Makmur',
    bank: 'Bank Mandiri (123-00-998877-1)',
    amount: 18648000,
    date: '2026-09-04',
    method: 'Corporate Internet Banking (BI-FAST)',
    refNo: 'MDR-TRX-20260904-8849',
    status: 'PAID',
    processedBy: 'Eka Rahmawati (Finance)'
  }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'aud-1', timestamp: '2026-09-08 10:15 WITA', user: 'Citra Dewi', role: 'APPROVER', action: 'APPROVE_LEVEL_1', module: 'Approval', recordId: 'ORD-2026-0001', oldVal: 'Waiting Level 1', newVal: 'Waiting Level 2', reason: 'Kebutuhan valid sesuai jadwal cor zona barat.' },
  { id: 'aud-2', timestamp: '2026-09-07 16:30 WITA', user: 'Andi Pratama', role: 'FIELD / REQUESTER', action: 'SUBMIT_ORDER', module: 'Order Lapangan', recordId: 'ORD-2026-0001', oldVal: 'Draft', newVal: 'Waiting Approval', reason: 'Submit kebutuhan material cor.' },
  { id: 'aud-3', timestamp: '2026-09-06 17:00 WITA', user: 'Ferry Gunawan', role: 'MANAGEMENT', action: 'APPROVE_LEVEL_3', module: 'Approval', recordId: 'ORD-2026-0002', oldVal: 'Waiting Level 3', newVal: 'Approved', reason: 'Disetujui direksi untuk percepatan timbunan.' },
  { id: 'aud-4', timestamp: '2026-09-04 11:20 WIB', user: 'Eka Rahmawati', role: 'FINANCE', action: 'EXECUTE_PAYMENT', module: 'Payment', recordId: 'PAY-2026-0028', oldVal: 'Payment Pending', newVal: 'PAID', reason: 'Transfer via Mandiri BI-FAST sukses.' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[1]); // Default Budi (Procurement)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Core Data Stores
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_PURCHASE_ORDERS);
  const [basts, setBasts] = useState(INITIAL_BASTS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [itemsMaster, setItemsMaster] = useState(INITIAL_ITEMS);
  const [priceHistory, setPriceHistory] = useState(INITIAL_PRICE_HISTORY);
  const [approvalConfigs, setApprovalConfigs] = useState(INITIAL_APPROVAL_CONFIG);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Navigation / Modal States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPo, setSelectedPo] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [sendPoModalOpen, setSendPoModalOpen] = useState(false);
  const [bastModalOpen, setBastModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [vendorSelectModalOpen, setVendorSelectModalOpen] = useState(false);

  // Forms / Input Temporary states
  const [approvalActionData, setApprovalActionData] = useState({ order: null, action: 'APPROVE', comment: '' });
  const [newOrderForm, setNewOrderForm] = useState({
    projectId: 'PRJ-01',
    department: 'Sipil & Struktur',
    priority: 'HIGH',
    requiredDate: '2026-09-25',
    notes: '',
    items: [
      { itemCode: 'ITM-001', qty: 100, spec: 'Tipe PCC SNI 2049', estPrice: 58000 }
    ]
  });

  const [bastForm, setBastForm] = useState({
    poNo: '',
    receiver: 'Dedi Kurniawan',
    vendorRep: '',
    deliveryNoteNo: '',
    condition: 'BAIK',
    notes: '',
    receivedQtys: {},
    photos: []
  });

  const [invoiceForm, setInvoiceForm] = useState({
    poNo: '',
    invNo: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '2026-10-15',
    amount: 0,
    tax: 0,
    total: 0,
    notes: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    invNo: '',
    paymentMethod: 'Corporate Internet Banking (BI-FAST)',
    refNo: 'REF-' + Math.floor(100000 + Math.random() * 900000),
    notes: ''
  });

  // AI Assistant Chat State
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: 'Halo! Saya AI Procurement Assistant Anda. Tanyakan riwayat harga, vendor termurah, PO tertunda, atau verifikasi invoice.' }
  ]);
  const [aiInput, setAiInput] = useState('');

  const triggerToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const logAudit = (action, module, recordId, oldVal, newVal, reason = '') => {
    const newEntry = {
      id: 'aud-' + (auditLogs.length + 1),
      timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      user: currentUser.name,
      role: currentUser.role,
      action,
      module,
      recordId,
      oldVal: String(oldVal),
      newVal: String(newVal),
      reason
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const getItemPriceStats = (itemCode) => {
    const history = priceHistory.filter(p => p.itemCode === itemCode);
    if (!history.length) return null;
    const prices = history.map(h => h.unitPrice);
    const lowest = Math.min(...prices);
    const highest = Math.max(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    const last = sorted[0].unitPrice;
    const lowestRecord = history.find(h => h.unitPrice === lowest);

    return {
      history,
      lowest,
      highest,
      avg,
      last,
      count: history.length,
      recommendedVendor: lowestRecord ? lowestRecord.vendorName : 'N/A',
      recommendedVendorId: lowestRecord ? lowestRecord.vendorId : null,
      recommendedPrice: lowest
    };
  };

  const handleCreateOrder = (isSubmit = true) => {
    if (!newOrderForm.items.length) {
      triggerToast('Tambahkan minimal satu item barang!', 'error');
      return;
    }
    const project = INITIAL_PROJECTS.find(p => p.id === newOrderForm.projectId);
    const generatedOrderNo = `ORD-2026-${String(orders.length + 1).padStart(4, '0')}`;

    let totalEst = 0;
    const preparedItems = newOrderForm.items.map((it, idx) => {
      const master = itemsMaster.find(m => m.code === it.itemCode);
      const sub = (it.qty || 1) * (master?.estPrice || it.estPrice || 0);
      totalEst += sub;
      const stats = getItemPriceStats(it.itemCode);
      return {
        id: `it-${Date.now()}-${idx}`,
        itemCode: it.itemCode,
        name: master?.name || it.itemCode,
        spec: it.spec || master?.spec,
        qty: Number(it.qty),
        unit: master?.unit || 'Unit',
        estPrice: master?.estPrice || it.estPrice,
        total: sub,
        selectedVendorId: stats?.recommendedVendorId || 'VND-001',
        selectedVendorName: stats?.recommendedVendor || 'PT Maju Jaya Makmur',
        selectedPrice: stats?.recommendedPrice || master?.estPrice,
        justification: ''
      };
    });

    const newOrder = {
      orderNo: generatedOrderNo,
      date: new Date().toISOString().split('T')[0],
      projectId: newOrderForm.projectId,
      projectName: project?.name || 'Project Lapangan',
      location: project?.location || 'Site Lapangan',
      department: newOrderForm.department,
      requester: currentUser.name,
      priority: newOrderForm.priority,
      requiredDate: newOrderForm.requiredDate,
      notes: newOrderForm.notes,
      status: isSubmit ? 'Waiting Approval' : 'Draft',
      currentApprovalLevel: isSubmit ? 1 : 0,
      totalEstimated: totalEst,
      items: preparedItems,
      approvalTimeline: isSubmit ? [
        { level: 1, approver: 'Citra Dewi (PM)', role: 'Supervisor / Project Manager', status: 'Pending', timestamp: null, comment: '' }
      ] : []
    };

    setOrders(prev => [newOrder, ...prev]);
    logAudit(isSubmit ? 'SUBMIT_ORDER' : 'SAVE_DRAFT_ORDER', 'Order Lapangan', generatedOrderNo, 'None', newOrder.status, newOrder.notes);
    triggerToast(`Order ${generatedOrderNo} berhasil ${isSubmit ? 'disubmit untuk approval' : 'disimpan sebagai draft'}!`);
    setOrderModalOpen(false);
  };

  const handleProcessApproval = (order, action, reason) => {
    if ((action === 'REJECT' || action === 'RETURN') && !reason.trim()) {
      triggerToast('Alasan wajib diisi untuk Penolakan / Pengembalian!', 'error');
      return;
    }

    setOrders(prevOrders => prevOrders.map(ord => {
      if (ord.orderNo !== order.orderNo) return ord;

      const currentLvl = ord.currentApprovalLevel;
      const totalAmount = ord.totalEstimated;

      // Determine required maximum level based on approval config
      let requiredMaxLevel = 1;
      if (totalAmount > 50000000) requiredMaxLevel = 3;
      else if (totalAmount > 10000000) requiredMaxLevel = 2;

      let newStatus = ord.status;
      let nextLvl = currentLvl;
      const updatedTimeline = [...ord.approvalTimeline];

      const currentStepIdx = updatedTimeline.findIndex(t => t.level === currentLvl && t.status === 'Pending');
      if (currentStepIdx !== -1) {
        updatedTimeline[currentStepIdx] = {
          ...updatedTimeline[currentStepIdx],
          approver: currentUser.name,
          status: action === 'APPROVE' ? 'Approved' : (action === 'REJECT' ? 'Rejected' : 'Returned'),
          timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
          comment: reason || 'Disetujui tanpa catatan khusus.'
        };
      }

      if (action === 'APPROVE') {
        if (currentLvl < requiredMaxLevel) {
          nextLvl = currentLvl + 1;
          const nextConfig = approvalConfigs.find(c => c.level === nextLvl);
          updatedTimeline.push({
            level: nextLvl,
            approver: nextConfig?.approverRole || `Approver Level ${nextLvl}`,
            role: nextConfig?.approverRole || `Approver Level ${nextLvl}`,
            status: 'Pending',
            timestamp: null,
            comment: ''
          });
          newStatus = 'Waiting Approval';
        } else {
          newStatus = 'Approved'; // Fully approved!
        }
      } else if (action === 'REJECT') {
        newStatus = 'Rejected';
      } else if (action === 'RETURN') {
        newStatus = 'Returned';
      }

      logAudit(`APPROVAL_${action}`, 'Approval Workflow', ord.orderNo, `Level ${currentLvl}`, newStatus, reason);
      return {
        ...ord,
        status: newStatus,
        currentApprovalLevel: nextLvl,
        approvalTimeline: updatedTimeline
      };
    }));

    triggerToast(`Order ${order.orderNo} berhasil diproses (${action})!`);
    setApprovalModalOpen(false);
  };

  const handleGeneratePOsFromOrder = (order) => {
    // Group selected items by vendor
    const vendorGroups = {};
    for (const item of order.items) {
      const vId = item.selectedVendorId || 'VND-001';
      if (!vendorGroups[vId]) {
        vendorGroups[vId] = [];
      }
      vendorGroups[vId].push(item);
    }

    const createdPOs = [];
    Object.keys(vendorGroups).forEach((vendorId, idx) => {
      const vendorInfo = vendors.find(v => v.id === vendorId) || vendors[0];
      const items = vendorGroups[vendorId];
      const poNum = `PO-2026-${String(purchaseOrders.length + createdPOs.length + 101).padStart(4, '0')}`;

      let subtotal = 0;
      const poItems = items.map(it => {
        const lineTotal = it.qty * (it.selectedPrice || it.estPrice);
        subtotal += lineTotal;
        return {
          itemCode: it.itemCode,
          name: it.name,
          spec: it.spec,
          qty: it.qty,
          unit: it.unit,
          unitPrice: it.selectedPrice || it.estPrice,
          subtotal: lineTotal,
          receivedQty: 0
        };
      });

      const tax = Math.round(subtotal * 0.11);
      const newPo = {
        poNo: poNum,
        orderNo: order.orderNo,
        vendorId: vendorInfo.id,
        vendorName: vendorInfo.name,
        vendorEmail: vendorInfo.email,
        vendorAddress: vendorInfo.address,
        projectId: order.projectId,
        projectName: order.projectName,
        deliveryLocation: order.location,
        poDate: new Date().toISOString().split('T')[0],
        expectedDate: order.requiredDate,
        paymentTerms: 'NET 30 Hari Setelah BAST',
        currency: 'IDR',
        buyer: currentUser.name,
        status: 'PO Created',
        sentTimestamp: null,
        items: poItems,
        subtotal,
        tax,
        total: subtotal + tax
      };
      createdPOs.push(newPo);
      logAudit('CREATE_PO', 'Purchase Order', poNum, 'None', 'PO Created', `Auto-split PO untuk vendor ${vendorInfo.name}`);
    });

    setPurchaseOrders(prev => [...createdPOs, ...prev]);

    // Update order status
    setOrders(prev => prev.map(o => o.orderNo === order.orderNo ? { ...o, status: 'PO Created' } : o));
    triggerToast(`Sukses! Dihasilkan ${createdPOs.length} PO terpisah berdasarkan vendor pilihan.`);
    setVendorSelectModalOpen(false);
  };

  const handleSendPo = (po) => {
    const timestamp = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    setPurchaseOrders(prev => prev.map(p => {
      if (p.poNo === po.poNo) {
        return { ...p, status: 'PO Sent', sentTimestamp: timestamp };
      }
      return p;
    }));

    setOrders(prev => prev.map(o => o.orderNo === po.orderNo ? { ...o, status: 'PO Sent' } : o));
    logAudit('SEND_PO_VENDOR', 'Purchase Order', po.poNo, 'PO Created', 'PO Sent', `Dikirim ke ${po.vendorEmail}`);
    triggerToast(`PO ${po.poNo} berhasil dikirimkan ke email ${po.vendorEmail}!`);
    setSendPoModalOpen(false);
  };

  const handleSubmitBAST = () => {
    if (!bastForm.poNo) {
      triggerToast('Pilih Purchase Order yang akan dibuatkan BAST!', 'error');
      return;
    }
    const targetPo = purchaseOrders.find(p => p.poNo === bastForm.poNo);
    if (!targetPo) return;

    const bastNumber = `BAST-2026-${String(basts.length + 50).padStart(4, '0')}`;
    const bastItems = targetPo.items.map(it => {
      const rec = bastForm.receivedQtys[it.itemCode] !== undefined ? Number(bastForm.receivedQtys[it.itemCode]) : it.qty;
      return {
        name: it.name,
        orderedQty: it.qty,
        receivedQty: rec,
        unit: it.unit,
        condition: bastForm.condition
      };
    });

    const newBast = {
      bastNo: bastNumber,
      poNo: targetPo.poNo,
      orderNo: targetPo.orderNo,
      vendorName: targetPo.vendorName,
      projectName: targetPo.projectName,
      date: new Date().toISOString().split('T')[0],
      receiver: bastForm.receiver || currentUser.name,
      vendorRep: bastForm.vendorRep || 'Perwakilan Ekspedisi',
      deliveryNoteNo: bastForm.deliveryNoteNo || `SJ-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'BAST Verified',
      notes: bastForm.notes || 'Barang diperiksa fisik di lapangan dan sesuai spesifikasi.',
      items: bastItems,
      photos: bastForm.photos.length ? bastForm.photos : [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80'
      ],
      receiverSignature: `${bastForm.receiver || currentUser.name} (Tanda Tangan Digital Tersertifikasi)`
    };

    setBasts(prev => [newBast, ...prev]);

    // Update PO items received count and status
    setPurchaseOrders(prev => prev.map(p => {
      if (p.poNo === targetPo.poNo) {
        const updatedItems = p.items.map(it => ({
          ...it,
          receivedQty: bastForm.receivedQtys[it.itemCode] !== undefined ? Number(bastForm.receivedQtys[it.itemCode]) : it.qty
        }));
        return { ...p, status: 'Received', items: updatedItems };
      }
      return p;
    }));

    setOrders(prev => prev.map(o => o.orderNo === targetPo.orderNo ? { ...o, status: 'BAST Verified' } : o));
    logAudit('CREATE_BAST', 'Penerimaan / BAST', bastNumber, 'Pending BAST', 'BAST Verified', `Verifikasi fisik PO ${targetPo.poNo}`);
    triggerToast(`BAST ${bastNumber} berhasil diterbitkan dan status PO menjadi RECEIVED!`);
    setBastModalOpen(false);
  };

  const handleCreateInvoice = () => {
    const targetPo = purchaseOrders.find(p => p.poNo === invoiceForm.poNo);
    if (!targetPo) {
      triggerToast('Pilih PO yang valid!', 'error');
      return;
    }

    const linkedBast = basts.find(b => b.poNo === targetPo.poNo && b.status === 'BAST Verified');
    if (!linkedBast) {
      triggerToast('Perhatian: Belum ada BAST yang terverifikasi untuk PO ini!', 'error');
    }

    const inputTotal = Number(invoiceForm.total);
    const expectedPoTotal = targetPo.total;
    const isAmountMatch = Math.abs(inputTotal - expectedPoTotal) <= 100;
    const isQtyMatch = linkedBast !== undefined;

    let matchStatus = 'MATCHED';
    let notes = '3-Way matching cocok: PO, BAST, dan Nilai Invoice 100% Valid.';

    if (!isQtyMatch) {
      matchStatus = 'PENDING_BAST';
      notes = 'BAST Lapangan belum lengkap atau belum terverifikasi.';
    } else if (!isAmountMatch) {
      matchStatus = 'AMOUNT_MISMATCH';
      notes = `Selisih Nilai! Invoice: ${formatRp(inputTotal)} vs PO: ${formatRp(expectedPoTotal)}.`;
    }

    const newInv = {
      invNo: invoiceForm.invNo || `INV-${targetPo.poNo.replace('PO-', '')}`,
      date: invoiceForm.date,
      dueDate: invoiceForm.dueDate,
      vendorId: targetPo.vendorId,
      vendorName: targetPo.vendorName,
      poNo: targetPo.poNo,
      bastNo: linkedBast?.bastNo || '-',
      amount: Number(invoiceForm.amount) || targetPo.subtotal,
      tax: Number(invoiceForm.tax) || targetPo.tax,
      total: inputTotal,
      status: matchStatus === 'MATCHED' ? 'Payment Pending' : 'Invoice Received',
      matchStatus,
      poAmount: expectedPoTotal,
      bastQtyStatus: linkedBast ? '100% Fisik Sesuai' : 'Belum Ada BAST',
      difference: inputTotal - expectedPoTotal,
      notes
    };

    setInvoices(prev => [newInv, ...prev]);
    logAudit('SUBMIT_INVOICE', 'Invoice', newInv.invNo, 'None', newInv.status, notes);
    triggerToast(`Invoice ${newInv.invNo} diproses. Hasil 3-Way Match: ${matchStatus}!`);
    setInvoiceModalOpen(false);
  };

  const handleExecutePayment = () => {
    const targetInv = invoices.find(i => i.invNo === paymentForm.invNo);
    if (!targetInv) return;

    const payNumber = `PAY-2026-${String(payments.length + 30).padStart(4, '0')}`;
    const vendor = vendors.find(v => v.id === targetInv.vendorId) || { bankName: 'Bank Mandiri', bankAcc: '123-456' };

    const newPay = {
      paymentNo: payNumber,
      invNo: targetInv.invNo,
      vendorName: targetInv.vendorName,
      bank: `${vendor.bankName} (${vendor.bankAcc})`,
      amount: targetInv.total,
      date: new Date().toISOString().split('T')[0],
      method: paymentForm.paymentMethod,
      refNo: paymentForm.refNo,
      status: 'PAID',
      processedBy: `${currentUser.name} (${currentUser.role})`
    };

    setPayments(prev => [newPay, ...prev]);

    // Set Invoice to PAID
    setInvoices(prev => prev.map(inv => inv.invNo === targetInv.invNo ? { ...inv, status: 'Paid' } : inv));

    // Set PO to Completed
    setPurchaseOrders(prev => prev.map(p => p.poNo === targetInv.poNo ? { ...p, status: 'Completed' } : p));

    // Set Order to Completed
    const targetPo = purchaseOrders.find(p => p.poNo === targetInv.poNo);
    if (targetPo) {
      setOrders(prev => prev.map(o => o.orderNo === targetPo.orderNo ? { ...o, status: 'Completed' } : o));
    }

    logAudit('EXECUTE_PAYMENT', 'Payment', payNumber, 'Payment Pending', 'PAID', `Ref No: ${paymentForm.refNo}`);
    triggerToast(`Pembayaran ${payNumber} sejumlah ${formatRp(targetInv.total)} berhasil dibukukan!`);
    setPaymentModalOpen(false);
  };

  const handleSendAiPrompt = (promptText = null) => {
    const text = promptText || aiInput;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setAiChat(prev => [...prev, userMsg]);
    if (!promptText) setAiInput('');

    // Generate accurate data-grounded response
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes('semen') || lower.includes('harga terakhir')) {
        const stats = getItemPriceStats('ITM-001');
        reply = `Berdasarkan database historis: Semen Portland 50kg memiliki rata-rata ${formatRp(stats.avg)}, harga terendah ${formatRp(stats.lowest)} oleh ${stats.recommendedVendor}. Transaksi terakhir tercatat di angka ${formatRp(stats.last)}.`;
      } else if (lower.includes('vendor termurah') || lower.includes('rekomendasi')) {
        reply = `Rekomendasi vendor harga terendah untuk material utama:
1. Semen Portland: CV Sumber Makmur Abadi (${formatRp(56000)}/sak)
2. Besi Beton 10mm: CV Sumber Makmur Abadi (${formatRp(83000)}/batang)
3. Kabel NYY: PT Karya Nusantara Teknik (${formatRp(63000)}/meter)
Catatan: Jika memilih vendor lain, Procurement wajib mengisi form justifikasi logistik/lead time.`;
      } else if (lower.includes('project') || lower.includes('bulan ini')) {
        const totalPrjAlpha = orders.filter(o => o.projectId === 'PRJ-01').reduce((acc, o) => acc + o.totalEstimated, 0);
        reply = `Total Procurement untuk Project Alpha (Menara Nusantara) saat ini tercatat ${formatRp(totalPrjAlpha)} dari ${orders.filter(o => o.projectId === 'PRJ-01').length} order aktif.`;
      } else if (lower.includes('bast') || lower.includes('belum bast')) {
        const pendingBastPos = purchaseOrders.filter(p => p.status === 'PO Sent');
        reply = pendingBastPos.length 
          ? `Terdapat ${pendingBastPos.length} PO yang telah dikirim tetapi belum memiliki BAST: ${pendingBastPos.map(p => p.poNo).join(', ')}.`
          : `Semua PO yang dikirim telah menerima BAST atau dalam proses penerimaan reguler.`;
      } else if (lower.includes('invoice') || lower.includes('bayar') || lower.includes('siap dibayar')) {
        const pendingPay = invoices.filter(i => i.status === 'Payment Pending');
        reply = pendingPay.length 
          ? `Ada ${pendingPay.length} invoice lolos 3-way matching dan siap dibayar: ${pendingPay.map(i => `${i.invNo} (${formatRp(i.total)})`).join(', ')}.`
          : `Saat ini tidak ada invoice dengan antrean Payment Pending.`;
      } else {
        reply = `Saya menemukan ${orders.length} order lapangan (${orders.filter(o => o.status === 'Waiting Approval').length} menunggu approval), ${purchaseOrders.length} PO aktif, dan ${invoices.filter(i => i.matchStatus === 'MATCHED').length} invoice matched. Anda dapat menanyakan komparasi harga atau status spesifik item.`;
      }

      setAiChat(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 450);
  };

  const metrics = useMemo(() => {
    const totalOrderValue = orders.reduce((sum, o) => sum + (o.totalEstimated || 0), 0);
    const waitingApprovalCount = orders.filter(o => o.status === 'Waiting Approval').length;
    const approvedOrdersCount = orders.filter(o => o.status === 'Approved' || o.status === 'PO Created' || o.status === 'Completed').length;
    const activePoCount = purchaseOrders.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled').length;
    const pendingBastCount = purchaseOrders.filter(p => p.status === 'PO Sent').length;
    const pendingInvoiceMatchCount = invoices.filter(i => i.matchStatus !== 'MATCHED' && i.status !== 'Paid').length;
    const pendingPaymentTotal = invoices.filter(i => i.status === 'Payment Pending').reduce((sum, i) => sum + i.total, 0);
    const paidTotal = payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0);

    return {
      totalOrderValue,
      waitingApprovalCount,
      approvedOrdersCount,
      activePoCount,
      pendingBastCount,
      pendingInvoiceMatchCount,
      pendingPaymentTotal,
      paidTotal
    };
  }, [orders, purchaseOrders, invoices, payments]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-sm font-medium border animate-bounce ${
          toastMessage.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          <Icon name={toastMessage.type === 'error' ? 'alert' : 'check'} className="w-5 h-5 text-current" />
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md font-bold">
              <Icon name="po" className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide leading-tight">PROCUREMENT</h1>
              <p className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation Menus with Scroll */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 text-xs">
          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Utama</div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              <Icon name="dashboard" className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </div>

          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Procurement Workflow</div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="order" className="w-4 h-4" />
                  <span>Order Lapangan</span>
                </div>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono">{orders.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('approvals')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'approvals' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="approval" className="w-4 h-4" />
                  <span>Approval Bertingkat</span>
                </div>
                {metrics.waitingApprovalCount > 0 && (
                  <span className="bg-amber-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{metrics.waitingApprovalCount}</span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('vendorSelection')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'vendorSelection' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="price" className="w-4 h-4" />
                <span>Pemilihan Vendor & Harga</span>
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Purchasing & Site</div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('purchaseOrders')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'purchaseOrders' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="po" className="w-4 h-4" />
                  <span>Purchase Orders (PO)</span>
                </div>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono">{purchaseOrders.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('basts')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'basts' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="bast" className="w-4 h-4" />
                  <span>Penerimaan & BAST</span>
                </div>
                {metrics.pendingBastCount > 0 && (
                  <span className="bg-cyan-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{metrics.pendingBastCount}</span>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Finance & Treasury</div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('invoices')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'invoices' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="invoice" className="w-4 h-4" />
                  <span>Invoice & 3-Way Match</span>
                </div>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono">{invoices.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'payments' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="payment" className="w-4 h-4" />
                <span>Pembayaran Vendor</span>
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Vendor & Intelligence</div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('vendors')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'vendors' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="vendor" className="w-4 h-4" />
                <span>Database Vendor</span>
              </button>
              <button
                onClick={() => setActiveTab('priceHistory')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'priceHistory' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="price" className="w-4 h-4" />
                <span>Histori Harga & Analitik</span>
              </button>
              <button
                onClick={() => setActiveTab('aiAssistant')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'aiAssistant' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name="ai" className="w-4 h-4 text-amber-400" />
                  <span>AI Procurement Agent</span>
                </div>
                <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Live</span>
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sistem & Audit</div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="reports" className="w-4 h-4" />
                <span>Laporan & Export</span>
              </button>
              <button
                onClick={() => setActiveTab('masterData')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'masterData' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="master" className="w-4 h-4" />
                <span>Master Data & Konfig</span>
              </button>
              <button
                onClick={() => setActiveTab('auditTrail')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${activeTab === 'auditTrail' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}
              >
                <Icon name="audit" className="w-4 h-4" />
                <span>Audit Trail</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Demo Quick Role Switcher Banner */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1 flex items-center justify-between">
            <span>Role Switcher (Demo)</span>
            <span className="text-emerald-400 font-mono">Active</span>
          </div>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const selected = INITIAL_USERS.find(u => u.id === e.target.value);
              if (selected) {
                setCurrentUser(selected);
                triggerToast(`Beralih peran sebagai: ${selected.name} (${selected.role})`);
              }
            }}
            className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {INITIAL_USERS.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} — {u.role}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* RIGHT WORKSPACE AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
          {/* Global Search Bar */}
          <div className="relative w-80 max-w-md hidden sm:block">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nomor order, PO, vendor, atau item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Workflow Stage Helper Chips */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="font-semibold text-slate-800">Demo Flow:</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActiveTab('orders')}>1. Order</span>
            <span>→</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActiveTab('approvals')}>2. Approve</span>
            <span>→</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActiveTab('vendorSelection')}>3. Vendor & PO</span>
            <span>→</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActiveTab('basts')}>4. BAST</span>
            <span>→</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActiveTab('invoices')}>5. 3-Way Match</span>
            <span>→</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => setActiveTab('payments')}>6. Bayar</span>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('aiAssistant')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
              title="Tanya AI seputar data procurement"
            >
              <Icon name="ai" className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('auditTrail')}
              className="relative p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              title="Notifikasi & Audit Log"
            >
              <Icon name="bell" className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold ring-2 ring-indigo-500/30">
                {currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight">{currentUser.name}</div>
                <div className="text-[11px] text-indigo-600 font-medium">{currentUser.role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER WITH DYNAMIC ROUTING */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Procurement Dashboard</h2>
                  <p className="text-sm text-slate-500">Pemantauan real-time siklus pengadaan material lapangan hingga penyelesaian invoice.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setNewOrderForm({
                        projectId: 'PRJ-01',
                        department: 'Sipil & Struktur',
                        priority: 'HIGH',
                        requiredDate: '2026-09-25',
                        notes: '',
                        items: [{ itemCode: 'ITM-001', qty: 100, spec: 'Tipe PCC SNI 2049', estPrice: 58000 }]
                      });
                      setOrderModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Icon name="plus" className="w-4 h-4" />
                    <span>Buat Order Lapangan</span>
                  </button>
                </div>
              </div>

              {/* Top Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Nilai Order</span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Icon name="order" className="w-4 h-4" /></div>
                  </div>
                  <div className="mt-3 text-2xl font-bold text-slate-900">{formatRp(metrics.totalOrderValue)}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{orders.length} order</span> dibuat dari 3 site project
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Menunggu Approval</span>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Icon name="approval" className="w-4 h-4" /></div>
                  </div>
                  <div className="mt-3 text-2xl font-bold text-amber-600">{metrics.waitingApprovalCount} Order</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Membutuhkan verifikasi bertingkat
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">PO Aktif / Menunggu BAST</span>
                    <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg"><Icon name="receiving" className="w-4 h-4" /></div>
                  </div>
                  <div className="mt-3 text-2xl font-bold text-slate-900">{metrics.pendingBastCount} PO</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Barang dalam pengiriman ke lapangan
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Siap Bayar (3-Way Match)</span>
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Icon name="payment" className="w-4 h-4" /></div>
                  </div>
                  <div className="mt-3 text-2xl font-bold text-emerald-600">{formatRp(metrics.pendingPaymentTotal)}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Terbayar bulan ini: <span className="font-semibold">{formatRp(metrics.paidTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Critical Workflow Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="alert" className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Action Items Penting</h4>
                      <ul className="mt-2 space-y-1.5 text-xs text-amber-800">
                        {metrics.waitingApprovalCount > 0 && (
                          <li className="flex items-center justify-between">
                            <span>⚠ {metrics.waitingApprovalCount} order menunggu persetujuan Anda</span>
                            <button onClick={() => setActiveTab('approvals')} className="underline font-semibold hover:text-amber-950">Buka Approval</button>
                          </li>
                        )}
                        {metrics.pendingBastCount > 0 && (
                          <li className="flex items-center justify-between">
                            <span>📦 {metrics.pendingBastCount} PO telah dikirim vendor dan siap diperiksa di lapangan</span>
                            <button onClick={() => setActiveTab('basts')} className="underline font-semibold hover:text-amber-950">Buat BAST</button>
                          </li>
                        )}
                        {invoices.some(i => i.matchStatus === 'AMOUNT_MISMATCH') && (
                          <li className="flex items-center justify-between">
                            <span>❗ 1 invoice terdeteksi ketidakcocokan nilai (amount mismatch)</span>
                            <button onClick={() => setActiveTab('invoices')} className="underline font-semibold hover:text-amber-950">Review Invoice</button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <Icon name="ai" className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">AI Procurement Insights</h4>
                      <p className="mt-1 text-xs text-indigo-800 leading-relaxed">
                        Analisis histori menemukan harga material semen di vendor CV Sumber Makmur Abadi 5.1% lebih hemat dibanding rata-rata kuartal lalu.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('aiAssistant');
                        handleSendAiPrompt('Vendor termurah untuk semen siapa?');
                      }}
                      className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded font-medium hover:bg-indigo-700 transition"
                    >
                      Tanya Vendor Termurah
                    </button>
                  </div>
                </div>
              </div>

              {/* Split View: Recent Orders Table & Recent Audit Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Orders Overview (2 cols) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Status Order Lapangan Terkini</h3>
                      <p className="text-xs text-slate-500">Menampilkan status workflow dari permintaan hingga eksekusi</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Lihat Semua</span>
                      <Icon name="chevronRight" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                        <tr>
                          <th className="px-4 py-3">No. Order</th>
                          <th className="px-4 py-3">Project & Lokasi</th>
                          <th className="px-4 py-3">Total Est.</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map(ord => (
                          <tr key={ord.orderNo} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              <div className="font-semibold">{ord.orderNo}</div>
                              <div className="text-[11px] text-slate-400">{ord.date}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-slate-800 font-medium">{ord.projectName}</div>
                              <div className="text-[11px] text-slate-400">{ord.requester} • {ord.department}</div>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900">
                              {formatRp(ord.totalEstimated)}
                            </td>
                            <td className="px-4 py-3">
                              {getStatusBadge(ord.status)}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setActiveTab('orderDetail');
                                }}
                                className="px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded transition"
                              >
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Audit Activity Timeline (1 col) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Aktivitas & Audit Trail</h3>
                    <Icon name="audit" className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
                    {auditLogs.slice(0, 6).map(log => (
                      <div key={log.id} className="relative pl-5 border-l-2 border-slate-200 pb-2">
                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-600"></div>
                        <div className="text-[11px] font-semibold text-slate-800">{log.action.replace(/_/g, ' ')}</div>
                        <div className="text-[10px] text-slate-500">{log.user} ({log.role}) • {log.recordId}</div>
                        {log.reason && (
                          <div className="text-[11px] text-slate-600 mt-0.5 italic">"{log.reason}"</div>
                        )}
                        <div className="text-[9px] text-slate-400 mt-1">{log.timestamp}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('auditTrail')}
                    className="mt-3 text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 py-1.5 bg-slate-50 rounded"
                  >
                    Buka Riwayat Lengkap
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER LAPANGAN LIST */}
          {activeTab === 'orders' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Order Kebutuhan Lapangan</h2>
                  <p className="text-xs text-slate-500">Daftar permintaan material yang diajukan oleh user lapangan.</p>
                </div>
                <button
                  onClick={() => {
                    setNewOrderForm({
                      projectId: 'PRJ-01',
                      department: 'Sipil & Struktur',
                      priority: 'HIGH',
                      requiredDate: '2026-09-25',
                      notes: '',
                      items: [{ itemCode: 'ITM-001', qty: 100, spec: 'Tipe PCC SNI 2049', estPrice: 58000 }]
                    });
                    setOrderModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Buat Order Baru</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
                <span className="text-slate-400 mr-2">Filter:</span>
                {['Semua', 'Waiting Approval', 'Approved', 'PO Created', 'Completed'].map(st => (
                  <button
                    key={st}
                    className="px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200 bg-slate-100"
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Nomor Order</th>
                      <th className="px-4 py-3">Tanggal & Project</th>
                      <th className="px-4 py-3">Requester & Dept</th>
                      <th className="px-4 py-3">Jumlah Item</th>
                      <th className="px-4 py-3">Estimasi Total</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders
                      .filter(o => o.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) || o.projectName.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(ord => (
                        <tr key={ord.orderNo} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-bold text-slate-900">
                            {ord.orderNo}
                            {ord.priority === 'HIGH' && (
                              <span className="ml-2 text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold">URGENT</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-800">{ord.projectName}</div>
                            <div className="text-[11px] text-slate-400">{ord.date} • Tgl Butuh: {ord.requiredDate}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-900">{ord.requester}</div>
                            <div className="text-[11px] text-slate-400">{ord.department}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{ord.items.length} Item</span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {formatRp(ord.totalEstimated)}
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(ord.status)}
                          </td>
                          <td className="px-4 py-3 text-right space-x-1">
                            <button
                              onClick={() => {
                                setSelectedOrder(ord);
                                setActiveTab('orderDetail');
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded"
                            >
                              Detail Workflow
                            </button>
                            {ord.status === 'Approved' && (
                              <button
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setActiveTab('vendorSelection');
                                }}
                                className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded"
                              >
                                Pilih Vendor
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: APPROVAL BERTINGKAT */}
          {activeTab === 'approvals' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Approval Bertingkat (Configurable)</h2>
                  <p className="text-xs text-slate-500">
                    Otorisasi berjenjang berdasarkan nominal: Level 1 (&le;10 Jt), Level 2 (&le;50 Jt), Level 3 (&gt;50 Jt).
                  </p>
                </div>
                <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs text-slate-600 font-medium">
                  Login saat ini: <span className="font-bold text-indigo-600">{currentUser.name} ({currentUser.role})</span>
                </div>
              </div>

              {/* Approval Orders Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Order No & Requester</th>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Total Nominal</th>
                      <th className="px-4 py-3">Level Approval</th>
                      <th className="px-4 py-3">Status Saat Ini</th>
                      <th className="px-4 py-3 text-right">Keputusan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.filter(o => o.status === 'Waiting Approval').map(ord => (
                      <tr key={ord.orderNo} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{ord.orderNo}</div>
                          <div className="text-[11px] text-slate-400">Diajukan oleh: {ord.requester} ({ord.date})</div>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">
                          {ord.projectName}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {formatRp(ord.totalEstimated)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Level {ord.currentApprovalLevel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(ord.status)}
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setApprovalActionData({ order: ord, action: 'APPROVE', comment: '' });
                              setApprovalModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm"
                          >
                            Setujui (Approve)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setApprovalActionData({ order: ord, action: 'REJECT', comment: '' });
                              setApprovalModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold shadow-sm"
                          >
                            Tolak (Reject)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setApprovalActionData({ order: ord, action: 'RETURN', comment: '' });
                              setApprovalModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold shadow-sm"
                          >
                            Kembalikan
                          </button>
                        </td>
                      </tr>
                    ))}
                    {orders.filter(o => o.status === 'Waiting Approval').length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-400">
                          Tidak ada order yang sedang menunggu approval saat ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: VENDOR SELECTION & PRICE RECOMMENDATION MATRIX */}
          {activeTab === 'vendorSelection' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Pemilihan Vendor & Rekomendasi Harga Cerdas</h2>
                  <p className="text-xs text-slate-500">
                    Sistem otomatis menganalisis database harga historis. Memilih vendor non-termurah wajib mencantumkan alasan justifikasi.
                  </p>
                </div>
              </div>

              {/* Active Orders Ready for Vendor Selection */}
              {orders.filter(o => o.status === 'Approved').map(ord => (
                <div key={ord.orderNo} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900">{ord.orderNo}</span>
                        <span className="text-xs text-slate-500">• {ord.projectName}</span>
                        {getStatusBadge(ord.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Total Estimasi: <span className="font-semibold text-slate-800">{formatRp(ord.totalEstimated)}</span></p>
                    </div>
                    <button
                      onClick={() => handleGeneratePOsFromOrder(ord)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-2 self-start sm:self-auto"
                    >
                      <Icon name="po" className="w-4 h-4" />
                      <span>Buat PO Otomatis per Vendor (Auto-Split)</span>
                    </button>
                  </div>

                  {/* Recommendation Matrix Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-3 py-2.5">Item Barang</th>
                          <th className="px-3 py-2.5">Qty</th>
                          <th className="px-3 py-2.5">Histori Harga</th>
                          <th className="px-3 py-2.5">Rekomendasi Terendah</th>
                          <th className="px-3 py-2.5">Vendor Terpilih</th>
                          <th className="px-3 py-2.5">Justifikasi (Jika Bukan Termurah)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {ord.items.map((item, idx) => {
                          const stats = getItemPriceStats(item.itemCode);
                          const isLowest = stats ? item.selectedPrice <= stats.lowest : true;

                          return (
                            <tr key={item.id || idx} className="hover:bg-slate-50">
                              <td className="px-3 py-3">
                                <div className="font-bold text-slate-900">{item.name}</div>
                                <div className="text-[11px] text-slate-400">{item.spec}</div>
                              </td>
                              <td className="px-3 py-3 font-semibold">
                                {item.qty} {item.unit}
                              </td>
                              <td className="px-3 py-3">
                                {stats ? (
                                  <div className="space-y-0.5 text-[11px]">
                                    <div>Rata2: <span className="font-semibold">{formatRp(stats.avg)}</span></div>
                                    <div className="text-slate-400">Terakhir: {formatRp(stats.last)}</div>
                                  </div>
                                ) : (
                                  <span className="text-slate-400">Belum ada data</span>
                                )}
                              </td>
                              <td className="px-3 py-3">
                                {stats ? (
                                  <div className="bg-emerald-50 text-emerald-800 p-1.5 rounded border border-emerald-200 inline-block">
                                    <div className="font-bold">{formatRp(stats.lowest)}</div>
                                    <div className="text-[10px] text-emerald-600">{stats.recommendedVendor}</div>
                                  </div>
                                ) : (
                                  <span className="text-slate-400">-</span>
                                )}
                              </td>
                              <td className="px-3 py-3">
                                <select
                                  value={item.selectedVendorId}
                                  onChange={(e) => {
                                    const vId = e.target.value;
                                    const vInfo = vendors.find(v => v.id === vId);
                                    const vHistory = priceHistory.filter(ph => ph.itemCode === item.itemCode && ph.vendorId === vId);
                                    const newPrice = vHistory.length ? vHistory[0].unitPrice : item.estPrice;

                                    setOrders(prev => prev.map(o => {
                                      if (o.orderNo !== ord.orderNo) return o;
                                      const newItems = o.items.map(it => it.id === item.id ? {
                                        ...it,
                                        selectedVendorId: vId,
                                        selectedVendorName: vInfo ? vInfo.name : 'Unknown',
                                        selectedPrice: newPrice
                                      } : it);
                                      return { ...o, items: newItems };
                                    }));
                                  }}
                                  className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-indigo-500"
                                >
                                  {vendors.map(v => (
                                    <option key={v.id} value={v.id}>{v.name} ({v.category.split('&')[0]})</option>
                                  ))}
                                </select>
                                <div className="mt-1 font-semibold text-slate-800">
                                  Harga: {formatRp(item.selectedPrice || item.estPrice)}
                                </div>
                              </td>
                              <td className="px-3 py-3">
                                {!isLowest ? (
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                                      <Icon name="alert" className="w-3 h-3" />
                                      Harga di atas harga terendah!
                                    </span>
                                    <input
                                      type="text"
                                      placeholder="Wajib masukkan alasan pemilihan..."
                                      value={item.justification || ''}
                                      onChange={(e) => {
                                        const text = e.target.value;
                                        setOrders(prev => prev.map(o => {
                                          if (o.orderNo !== ord.orderNo) return o;
                                          const newItems = o.items.map(it => it.id === item.id ? { ...it, justification: text } : it);
                                          return { ...o, items: newItems };
                                        }));
                                      }}
                                      className="w-full text-xs px-2 py-1 border border-amber-300 bg-amber-50/50 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                                    />
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                                    <Icon name="check" className="w-3.5 h-3.5" />
                                    Vendor harga terendah (Best Price)
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {orders.filter(o => o.status === 'Approved').length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                  Tidak ada order berstatus "Approved" yang menunggu pemilihan vendor.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PURCHASE ORDER (PO) */}
          {activeTab === 'purchaseOrders' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Purchase Orders (PO)</h2>
                  <p className="text-xs text-slate-500">PO resmi yang diterbitkan per vendor dengan klausul pengiriman dan termin pembayaran.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Nomor PO</th>
                      <th className="px-4 py-3">Vendor Penerima</th>
                      <th className="px-4 py-3">Project & Lokasi</th>
                      <th className="px-4 py-3">Total (Inc. PPN)</th>
                      <th className="px-4 py-3">Status PO</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {purchaseOrders
                      .filter(p => p.poNo.toLowerCase().includes(searchQuery.toLowerCase()) || p.vendorName.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(po => (
                        <tr key={po.poNo} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-bold text-slate-900">
                            {po.poNo}
                            <div className="text-[11px] text-slate-400 font-normal">Ref: {po.orderNo}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-800">{po.vendorName}</div>
                            <div className="text-[11px] text-slate-400">{po.vendorEmail}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-slate-800 font-medium">{po.projectName}</div>
                            <div className="text-[11px] text-slate-400">{po.deliveryLocation}</div>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900">
                            {formatRp(po.total)}
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(po.status)}
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
                            {po.status === 'PO Created' && (
                              <button
                                onClick={() => {
                                  setSelectedPo(po);
                                  setSendPoModalOpen(true);
                                }}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-sm"
                              >
                                Kirim ke Vendor
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedPo(po);
                                triggerToast(`Mencetak PO ${po.poNo} (Simulasi PDF Generator)...`);
                              }}
                              className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-medium"
                            >
                              PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PENERIMAAN BARANG & BAST DIGITAL */}
          {activeTab === 'basts' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Penerimaan Barang & BAST Lapangan</h2>
                  <p className="text-xs text-slate-500">Berita Acara Serah Terima (BAST) digital lengkap dengan dokumentasi foto dan verifikasi penerima.</p>
                </div>
                <button
                  onClick={() => {
                    const sentPos = purchaseOrders.filter(p => p.status === 'PO Sent');
                    if (!sentPos.length) {
                      triggerToast('Tidak ada PO yang berstatus "PO Sent" untuk dibuatkan BAST!', 'error');
                      return;
                    }
                    setBastForm({
                      poNo: sentPos[0].poNo,
                      receiver: currentUser.name,
                      vendorRep: 'Slamet Riyadi (Driver Ekspedisi)',
                      deliveryNoteNo: 'SJ-EXP-' + Math.floor(1000 + Math.random() * 9000),
                      condition: 'BAIK',
                      notes: 'Barang diterima dan dihitung di area loading dock site.',
                      receivedQtys: {},
                      photos: [
                        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80'
                      ]
                    });
                    setBastModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Input Penerimaan & BAST Baru</span>
                </button>
              </div>

              {/* BAST List Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basts.map(bast => (
                  <div key={bast.bastNo} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div>
                        <div className="font-bold text-slate-900">{bast.bastNo}</div>
                        <div className="text-[11px] text-slate-400">Ref PO: {bast.poNo}</div>
                      </div>
                      {getStatusBadge(bast.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">Vendor:</span>
                        <div className="font-semibold text-slate-800">{bast.vendorName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Penerima Lapangan:</span>
                        <div className="font-semibold text-slate-800">{bast.receiver}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">No. Surat Jalan:</span>
                        <div className="font-mono text-slate-700">{bast.deliveryNoteNo}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Tanggal Terima:</span>
                        <div className="font-medium text-slate-800">{bast.date}</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2 rounded text-xs">
                      <div className="font-semibold text-slate-700 mb-1">Item Diterima:</div>
                      {bast.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-[11px] text-slate-600">
                          <span>{it.name}</span>
                          <span className="font-mono font-bold text-emerald-700">{it.receivedQty} / {it.orderedQty} {it.unit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Photo attachments */}
                    {bast.photos && bast.photos.length > 0 && (
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1">Foto Bukti Fisik Lapangan:</span>
                        <div className="flex gap-2">
                          {bast.photos.map((ph, idx) => (
                            <img
                              key={idx}
                              src={ph}
                              alt="Bukti fisik"
                              className="w-16 h-16 object-cover rounded border border-slate-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Signature: <strong className="text-slate-700">{bast.receiverSignature}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: INVOICE & 3-WAY MATCHING */}
          {activeTab === 'invoices' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Invoice & 3-Way Matching</h2>
                  <p className="text-xs text-slate-500">
                    Sistem melakukan rekonsiliasi otomatis antara PO, BAST (barang diterima), dan Invoice vendor sebelum proses pembayaran.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const validPos = purchaseOrders.filter(p => p.status === 'Received' || p.status === 'PO Sent');
                    if (!validPos.length) {
                      triggerToast('Belum ada PO yang eligible untuk penagihan invoice!', 'error');
                      return;
                    }
                    const po = validPos[0];
                    setInvoiceForm({
                      poNo: po.poNo,
                      invNo: `INV-${po.vendorId}-${Math.floor(1000 + Math.random() * 9000)}`,
                      date: new Date().toISOString().split('T')[0],
                      dueDate: '2026-10-15',
                      amount: po.subtotal,
                      tax: po.tax,
                      total: po.total,
                      notes: 'Tagihan material lapangan termin 1'
                    });
                    setInvoiceModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Input Invoice Vendor</span>
                </button>
              </div>

              {/* Invoices List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">No. Invoice</th>
                      <th className="px-4 py-3">Vendor & PO Ref</th>
                      <th className="px-4 py-3">Nilai Tagihan</th>
                      <th className="px-4 py-3">3-Way Match Status</th>
                      <th className="px-4 py-3">Status Tagihan</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map(inv => (
                      <tr key={inv.invNo} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {inv.invNo}
                          <div className="text-[11px] text-slate-400 font-normal">Jatuh Tempo: {inv.dueDate}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-800">{inv.vendorName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">PO: {inv.poNo} | BAST: {inv.bastNo}</div>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {formatRp(inv.total)}
                        </td>
                        <td className="px-4 py-3">
                          {inv.matchStatus === 'MATCHED' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                              <Icon name="check" className="w-3.5 h-3.5" />
                              MATCHED (Valid)
                            </span>
                          )}
                          {inv.matchStatus === 'AMOUNT_MISMATCH' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-300">
                              <Icon name="alert" className="w-3.5 h-3.5" />
                              AMOUNT MISMATCH
                            </span>
                          )}
                          {inv.matchStatus === 'PENDING_BAST' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                              <Icon name="alert" className="w-3.5 h-3.5" />
                              MENUNGGU BAST
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(inv.status)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {inv.status === 'Payment Pending' && (
                            <button
                              onClick={() => {
                                setPaymentForm({
                                  invNo: inv.invNo,
                                  paymentMethod: 'Corporate Internet Banking (BI-FAST)',
                                  refNo: 'REF-' + Math.floor(100000 + Math.random() * 900000),
                                  notes: 'Disetujui untuk rilis dana.'
                                });
                                setPaymentModalOpen(true);
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm"
                            >
                              Proses Bayar
                            </button>
                          )}
                          {inv.status === 'Paid' && (
                            <span className="text-xs text-emerald-700 font-semibold">Sudah Dibayar</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: PEMBAYARAN VENDOR */}
          {activeTab === 'payments' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Pembayaran Vendor (Disbursement)</h2>
                  <p className="text-xs text-slate-500">Riwayat pencairan dana treasury yang telah diverifikasi kelengkapan dokumen 3-way match-nya.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Nomor Pembayaran</th>
                      <th className="px-4 py-3">Vendor & Rekening</th>
                      <th className="px-4 py-3">Nominal Bayar</th>
                      <th className="px-4 py-3">Metode & Referensi Bank</th>
                      <th className="px-4 py-3">Tanggal & Otorisator</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map(pay => (
                      <tr key={pay.paymentNo} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {pay.paymentNo}
                          <div className="text-[11px] text-slate-400 font-normal">Inv: {pay.invNo}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-800">{pay.vendorName}</div>
                          <div className="text-[11px] text-slate-400">{pay.bank}</div>
                        </td>
                        <td className="px-4 py-3 font-bold text-emerald-700">
                          {formatRp(pay.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-800">{pay.method}</div>
                          <div className="text-[11px] font-mono text-slate-400">{pay.refNo}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-800">{pay.date}</div>
                          <div className="text-[11px] text-slate-400">{pay.processedBy}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {pay.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: DATABASE VENDOR */}
          {activeTab === 'vendors' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Database Rekanan Vendor</h2>
                  <p className="text-xs text-slate-500">Daftar rekanan terverifikasi lengkap dengan legalitas, rating kinerja, dan kategori material.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendors.map(v => (
                  <div key={v.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-mono text-indigo-600 font-bold">{v.code}</div>
                        <h4 className="text-sm font-bold text-slate-900">{v.name}</h4>
                        <div className="text-[11px] text-slate-400">{v.category}</div>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded font-bold">
                        ★ {v.rating}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                      <div>PIC: <strong className="text-slate-800">{v.contact}</strong> ({v.phone})</div>
                      <div>Email: <span className="text-indigo-600 font-mono">{v.email}</span></div>
                      <div className="truncate">Alamat: {v.address}</div>
                      <div className="text-slate-400">NPWP: {v.taxId}</div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Bank: {v.bankName}</span>
                      <span className="font-mono text-slate-700">•••• {v.bankAcc.slice(-4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: HISTORI HARGA & ANALITIK */}
          {activeTab === 'priceHistory' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Database Histori Harga Pembelian</h2>
                  <p className="text-xs text-slate-500">Pencatatan tren harga transaksi masa lalu untuk mencegah markup dan dasar negosiasi procurement.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Item Material</th>
                      <th className="px-4 py-3">Vendor Rekanan</th>
                      <th className="px-4 py-3">Harga Satuan</th>
                      <th className="px-4 py-3">Ref PO & Tanggal</th>
                      <th className="px-4 py-3">Project & Lokasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {priceHistory.map(ph => {
                      const itemObj = itemsMaster.find(i => i.code === ph.itemCode);
                      return (
                        <tr key={ph.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-900">{itemObj?.name || ph.itemCode}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{ph.itemCode}</div>
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {ph.vendorName}
                          </td>
                          <td className="px-4 py-3 font-bold text-indigo-700">
                            {formatRp(ph.unitPrice)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-mono text-slate-800">{ph.poNo}</div>
                            <div className="text-[11px] text-slate-400">{ph.date}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-slate-800">{ph.project}</div>
                            <div className="text-[11px] text-slate-400">{ph.location}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: AI PROCUREMENT ASSISTANT */}
          {activeTab === 'aiAssistant' && (
            <div className="max-w-4xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-lg text-white">
                    <Icon name="ai" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AI Procurement Assistant</h3>
                    <p className="text-[11px] text-slate-400">Terkoneksi langsung ke basis data harga, vendor, dan status transaksi internal.</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">Real-Time Data Engine</span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
                {aiChat.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm whitespace-pre-line'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Query Chips */}
              <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <span className="text-slate-400 font-medium shrink-0">Contoh Prompt:</span>
                <button
                  onClick={() => handleSendAiPrompt('Berapa harga semen terakhir?')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
                >
                  Harga terakhir semen?
                </button>
                <button
                  onClick={() => handleSendAiPrompt('Vendor termurah untuk item ini siapa?')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
                >
                  Vendor harga terendah?
                </button>
                <button
                  onClick={() => handleSendAiPrompt('PO mana yang belum menerima BAST?')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
                >
                  PO tertunda BAST?
                </button>
                <button
                  onClick={() => handleSendAiPrompt('Invoice mana yang siap dibayar?')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap"
                >
                  Invoice siap dibayar?
                </button>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tanyakan analisis harga, PO, vendor, atau tagihan..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendAiPrompt();
                  }}
                  className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSendAiPrompt()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Kirim</span>
                  <Icon name="send" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 12: DETAIL ORDER WORKFLOW LIFECYCLE VIEW */}
          {activeTab === 'orderDetail' && selectedOrder && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('orders')}
                  className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg"
                >
                  <Icon name="arrowLeft" className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-900">{selectedOrder.orderNo}</h2>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <p className="text-xs text-slate-500">{selectedOrder.projectName} • Diajukan oleh {selectedOrder.requester} pada {selectedOrder.date}</p>
                </div>
              </div>

              {/* Full Lifecycle Visual Timeline */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">Siklus Lifecycle Pengadaan</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="font-bold text-emerald-800">1. Order Lapangan</div>
                    <div className="text-[10px] text-emerald-600">Submitted</div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${selectedOrder.status !== 'Draft' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-800">2. Approval</div>
                    <div className="text-[10px] text-slate-500">{selectedOrder.status.includes('Approval') ? 'Sedang Diproses' : 'Completed'}</div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${selectedOrder.items.some(i => i.selectedVendorId) ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-800">3. Vendor Select</div>
                    <div className="text-[10px] text-slate-500">Price Matrix</div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${purchaseOrders.some(p => p.orderNo === selectedOrder.orderNo) ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-800">4. Purchase Order</div>
                    <div className="text-[10px] text-slate-500">Auto-Split</div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${basts.some(b => b.orderNo === selectedOrder.orderNo) ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-800">5. BAST Site</div>
                    <div className="text-[10px] text-slate-500">Verifikasi Fisik</div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${invoices.some(i => i.poNo.includes(selectedOrder.orderNo.replace('ORD-', ''))) ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-800">6. 3-Way Match</div>
                    <div className="text-[10px] text-slate-500">PO vs BAST vs Inv</div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${selectedOrder.status === 'Completed' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold">7. Paid / Selesai</div>
                    <div className="text-[10px] opacity-80">Treasury</div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">Rincian Item Permintaan</h3>
                  <span className="text-xs text-slate-500">{selectedOrder.items.length} Barang</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="py-2">Item</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2">Vendor Rekomendasi</th>
                      <th className="py-2 text-right">Harga Satuan</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5">
                          <div className="font-semibold text-slate-800">{it.name}</div>
                          <div className="text-[11px] text-slate-400">{it.spec}</div>
                        </td>
                        <td className="py-2.5 font-bold">{it.qty} {it.unit}</td>
                        <td className="py-2.5 text-slate-600">{it.selectedVendorName || 'Belum Dipilih'}</td>
                        <td className="py-2.5 text-right">{formatRp(it.selectedPrice || it.estPrice)}</td>
                        <td className="py-2.5 text-right font-bold text-slate-900">{formatRp(it.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-200 font-bold text-sm">
                      <td colSpan="4" className="py-3 text-right">Total Estimasi:</td>
                      <td className="py-3 text-right text-indigo-600">{formatRp(selectedOrder.totalEstimated)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Approval Timeline Detail */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                <h3 className="font-bold text-sm text-slate-900">Histori Otorisasi Approval</h3>
                <div className="space-y-3">
                  {selectedOrder.approvalTimeline?.map((ap, idx) => (
                    <div key={idx} className="flex items-start justify-between text-xs p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div>
                        <div className="font-bold text-slate-800">Level {ap.level}: {ap.role}</div>
                        <div className="text-slate-500">Oleh: {ap.approver} {ap.timestamp && `(${ap.timestamp})`}</div>
                        {ap.comment && <div className="mt-1 text-slate-600 italic">"{ap.comment}"</div>}
                      </div>
                      <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        ap.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ap.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: MASTER DATA & KONFIGURASI APPROVAL */}
          {activeTab === 'masterData' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Master Data & Konfigurasi Sistem</h2>
                <p className="text-xs text-slate-500">Pengaturan proyek, departemen, katalog master item, dan konfigurasi ambang batas approval bertingkat.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Approval Configuration Matrix */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-sm text-slate-900">Konfigurasi Approval Bertingkat</h3>
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono">Configurable</span>
                  </div>
                  <div className="space-y-2.5">
                    {approvalConfigs.map(cfg => (
                      <div key={cfg.level} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Level {cfg.level}: {cfg.approverRole}</span>
                          <span className="text-indigo-600">{formatRp(cfg.minAmount)} - {cfg.maxAmount > 999999999 ? 'Tak Terbatas' : formatRp(cfg.maxAmount)}</span>
                        </div>
                        <div className="text-slate-500 text-[11px]">{cfg.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Master Items Catalog Preview */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-sm text-slate-900">Katalog Master Barang (SNI)</h3>
                    <span className="text-xs text-slate-500">{itemsMaster.length} Items</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {itemsMaster.map(item => (
                      <div key={item.code} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-800">{item.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{item.code} • {item.spec}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{formatRp(item.estPrice)}</div>
                          <div className="text-[10px] text-slate-400">per {item.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 14: AUDIT TRAIL LENGKAP */}
          {activeTab === 'auditTrail' && (
            <div className="space-y-5 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Audit Trail & Log Keamanan</h2>
                  <p className="text-xs text-slate-500">Pencatatan mutlak dan tidak dapat diubah atas seluruh aktivitas transaksi, approval, dan perubahan harga.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Waktu & Tanggal</th>
                      <th className="px-4 py-3">User & Peran</th>
                      <th className="px-4 py-3">Modul & Aksi</th>
                      <th className="px-4 py-3">Record ID</th>
                      <th className="px-4 py-3">Perubahan / Justifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-slate-600 text-[11px]">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{log.user}</div>
                          <div className="text-[10px] text-slate-400">{log.role}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">
                            {log.action}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-0.5">{log.module}</div>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-800">
                          {log.recordId}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          <div className="text-[11px]">
                            <span className="text-slate-400">{log.oldVal}</span> &rarr; <span className="font-semibold text-slate-800">{log.newVal}</span>
                          </div>
                          {log.reason && <div className="text-[11px] text-slate-500 italic mt-0.5">"{log.reason}"</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 15: LAPORAN & EXPORT */}
          {activeTab === 'reports' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Laporan Pengadaan & Analisis Belanja</h2>
                  <p className="text-xs text-slate-500">Laporan realisasi belanja per proyek, vendor spend distribution, dan ekspor data CSV.</p>
                </div>
                <button
                  onClick={() => triggerToast('Mengekspor laporan procurement dalam format CSV/Excel...')}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
                >
                  <Icon name="download" className="w-4 h-4" />
                  <span>Ekspor Laporan (CSV)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {INITIAL_PROJECTS.map(prj => {
                  const prjOrders = orders.filter(o => o.projectId === prj.id);
                  const total = prjOrders.reduce((acc, o) => acc + o.totalEstimated, 0);
                  return (
                    <div key={prj.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                      <div className="text-xs font-mono font-bold text-indigo-600">{prj.id}</div>
                      <h4 className="text-sm font-bold text-slate-900">{prj.name}</h4>
                      <p className="text-xs text-slate-400">{prj.location}</p>
                      <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                        <span className="text-slate-500">{prjOrders.length} Order Diajukan</span>
                        <span className="font-bold text-slate-900">{formatRp(total)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Buat Order Kebutuhan Lapangan Baru</h3>
                <p className="text-[11px] text-slate-400">Permintaan material proyek konstruksi dan MEP.</p>
              </div>
              <button onClick={() => setOrderModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Project Lokasi</label>
                  <select
                    value={newOrderForm.projectId}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, projectId: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    {INITIAL_PROJECTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Departemen Peminta</label>
                  <select
                    value={newOrderForm.department}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, department: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    {INITIAL_DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Prioritas Kebutuhan</label>
                  <select
                    value={newOrderForm.priority}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, priority: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="HIGH">Tinggi (Mendesak/Pengecoran)</option>
                    <option value="MEDIUM">Sedang (Jadwal Normal)</option>
                    <option value="LOW">Rendah (Stok Lapangan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Dibutuhkan di Site</label>
                  <input
                    type="date"
                    value={newOrderForm.requiredDate}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, requiredDate: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Catatan Kebutuhan</label>
                <textarea
                  rows="2"
                  placeholder="Misal: Pengecoran slab lantai 8 zona barat..."
                  value={newOrderForm.notes}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Items Dynamic List */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800">Daftar Item Material</span>
                  <button
                    onClick={() => {
                      setNewOrderForm({
                        ...newOrderForm,
                        items: [...newOrderForm.items, { itemCode: 'ITM-002', qty: 50, spec: 'SNI BJTS 420B', estPrice: 85000 }]
                      });
                    }}
                    className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Icon name="plus" className="w-3.5 h-3.5" />
                    Tambah Baris
                  </button>
                </div>

                <div className="space-y-2">
                  {newOrderForm.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <select
                        value={it.itemCode}
                        onChange={(e) => {
                          const master = itemsMaster.find(m => m.code === e.target.value);
                          const updated = [...newOrderForm.items];
                          updated[idx] = { ...updated[idx], itemCode: e.target.value, spec: master?.spec, estPrice: master?.estPrice };
                          setNewOrderForm({ ...newOrderForm, items: updated });
                        }}
                        className="flex-1 border border-slate-300 rounded p-1.5 text-xs"
                      >
                        {itemsMaster.map(im => (
                          <option key={im.code} value={im.code}>{im.name} ({im.unit})</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={it.qty}
                        onChange={(e) => {
                          const updated = [...newOrderForm.items];
                          updated[idx].qty = e.target.value;
                          setNewOrderForm({ ...newOrderForm, items: updated });
                        }}
                        className="w-20 border border-slate-300 rounded p-1.5 text-xs text-center"
                      />
                      {newOrderForm.items.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = newOrderForm.items.filter((_, i) => i !== idx);
                            setNewOrderForm({ ...newOrderForm, items: updated });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setOrderModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded font-medium"
              >
                Batal
              </button>
              <button
                onClick={() => handleCreateOrder(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold"
              >
                Simpan Draft
              </button>
              <button
                onClick={() => handleCreateOrder(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold shadow"
              >
                Submit untuk Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {approvalModalOpen && approvalActionData.order && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Konfirmasi Keputusan Approval</h3>
                <p className="text-[11px] text-slate-400">Order No: {approvalActionData.order.orderNo}</p>
              </div>
              <button onClick={() => setApprovalModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div>Project: <strong className="text-slate-800">{approvalActionData.order.projectName}</strong></div>
                <div>Requester: <strong className="text-slate-800">{approvalActionData.order.requester}</strong></div>
                <div>Total Nilai: <strong className="text-indigo-600">{formatRp(approvalActionData.order.totalEstimated)}</strong></div>
                <div>Current Level: <strong className="text-slate-800">Level {approvalActionData.order.currentApprovalLevel}</strong></div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Catatan / Alasan {approvalActionData.action === 'APPROVE' ? '(Opsional)' : '(Wajib Diisi)'}
                </label>
                <textarea
                  rows="3"
                  placeholder={approvalActionData.action === 'APPROVE' ? 'Disetujui untuk pemenuhan material...' : 'Tuliskan alasan penolakan/pengembalian...'}
                  value={approvalActionData.comment}
                  onChange={(e) => setApprovalActionData({ ...approvalActionData, comment: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                ></textarea>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded font-medium"
              >
                Batal
              </button>
              <button
                onClick={() => handleProcessApproval(approvalActionData.order, approvalActionData.action, approvalActionData.comment)}
                className={`px-4 py-2 text-white rounded font-bold shadow ${
                  approvalActionData.action === 'APPROVE'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : (approvalActionData.action === 'REJECT' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-600 hover:bg-amber-700')
                }`}
              >
                Eksekusi {approvalActionData.action}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {sendPoModalOpen && selectedPo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Kirim Purchase Order (PO) ke Rekanan</h3>
                <p className="text-[11px] text-slate-400">Simulasi pengiriman otomatis via Enterprise Mail Engine</p>
              </div>
              <button onClick={() => setSendPoModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <span className="text-slate-500">Penerima (To):</span>
                <div className="font-semibold text-slate-900 font-mono bg-slate-50 p-2 rounded border border-slate-200 mt-1">
                  {selectedPo.vendorEmail} ({selectedPo.vendorName})
                </div>
              </div>
              <div>
                <span className="text-slate-500">Subject:</span>
                <div className="font-semibold text-slate-900 bg-slate-50 p-2 rounded border border-slate-200 mt-1">
                  [OFFICIAL PO] Purchase Order {selectedPo.poNo} - {selectedPo.projectName}
                </div>
              </div>
              <div>
                <span className="text-slate-500">Lampiran Dokumen:</span>
                <div className="flex items-center gap-2 p-2 bg-indigo-50 text-indigo-800 rounded border border-indigo-200 mt-1 font-mono font-medium">
                  <Icon name="po" className="w-4 h-4 text-indigo-600" />
                  <span>{selectedPo.poNo}.pdf ({formatRp(selectedPo.total)})</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 italic">
                *Vendor akan menerima salinan kontrak, spesifikasi teknis, jadwal kirim, dan instruksi penyerahan BAST di lapangan.
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setSendPoModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded font-medium"
              >
                Tutup
              </button>
              <button
                onClick={() => handleSendPo(selectedPo)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold shadow flex items-center gap-1.5"
              >
                <Icon name="send" className="w-3.5 h-3.5" />
                <span>Kirim PO Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {bastModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Penerimaan Barang & Penerbitan BAST Digital</h3>
                <p className="text-[11px] text-slate-400">Verifikasi fisik di lapangan dan pencatatan kondisi barang.</p>
              </div>
              <button onClick={() => setBastModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Pilih PO</label>
                  <select
                    value={bastForm.poNo}
                    onChange={(e) => setBastForm({ ...bastForm, poNo: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 font-mono"
                  >
                    {purchaseOrders.filter(p => p.status === 'PO Sent').map(p => (
                      <option key={p.poNo} value={p.poNo}>{p.poNo} - {p.vendorName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nomor Surat Jalan (Vendor)</label>
                  <input
                    type="text"
                    value={bastForm.deliveryNoteNo}
                    onChange={(e) => setBastForm({ ...bastForm, deliveryNoteNo: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Petugas Penerima Lapangan</label>
                  <input
                    type="text"
                    value={bastForm.receiver}
                    onChange={(e) => setBastForm({ ...bastForm, receiver: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Perwakilan Vendor / Supir</label>
                  <input
                    type="text"
                    value={bastForm.vendorRep}
                    onChange={(e) => setBastForm({ ...bastForm, vendorRep: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kondisi Fisik Barang</label>
                <select
                  value={bastForm.condition}
                  onChange={(e) => setBastForm({ ...bastForm, condition: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="BAIK">Kondisi Baik, Lengkap, dan Segel Utuh</option>
                  <option value="SEBAGIAN_CACAT">Sebagian Cacat / Perlu Retur Parsial</option>
                  <option value="DITOLAK">Ditolak Total (Tidak Sesuai Spek)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Catatan Serah Terima</label>
                <textarea
                  rows="2"
                  value={bastForm.notes}
                  onChange={(e) => setBastForm({ ...bastForm, notes: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Photo Upload Simulation Component */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Upload Bukti Foto Barang & Surat Jalan</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer">
                  <Icon name="camera" className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-slate-600 font-medium">Klik untuk upload foto lapangan / surat jalan</span>
                  <div className="text-[10px] text-slate-400 mt-0.5">Mendukung JPG, PNG hingga 5MB</div>
                </div>
              </div>

              {/* Digital Signature Pad Mock */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-700">Digital Signature Pad (Verified)</span>
                  <span className="text-[10px] text-emerald-600 font-mono">Status: Ready</span>
                </div>
                <div className="h-16 bg-white border border-slate-300 rounded flex items-center justify-center text-slate-400 italic">
                  [Tanda Tangan Digital Terenkripsi: {bastForm.receiver}]
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setBastModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitBAST}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold shadow"
              >
                Terbitkan & Verifikasi BAST
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {invoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Input Invoice & Validasi 3-Way Match</h3>
                <p className="text-[11px] text-slate-400">Pencocokan PO vs BAST vs Tagihan Rekanan.</p>
              </div>
              <button onClick={() => setInvoiceModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nomor PO Terkait</label>
                  <select
                    value={invoiceForm.poNo}
                    onChange={(e) => {
                      const p = purchaseOrders.find(po => po.poNo === e.target.value);
                      if (p) {
                        setInvoiceForm({
                          ...invoiceForm,
                          poNo: p.poNo,
                          amount: p.subtotal,
                          tax: p.tax,
                          total: p.total
                        });
                      }
                    }}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 font-mono"
                  >
                    {purchaseOrders.map(p => (
                      <option key={p.poNo} value={p.poNo}>{p.poNo} - {p.vendorName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Nomor Faktur / Invoice</label>
                  <input
                    type="text"
                    value={invoiceForm.invNo}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, invNo: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Tagihan</label>
                  <input
                    type="date"
                    value={invoiceForm.date}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, date: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Tanggal Jatuh Tempo</label>
                  <input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                    className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-slate-500 mb-1">Subtotal (DPP)</label>
                  <input
                    type="number"
                    value={invoiceForm.amount}
                    onChange={(e) => {
                      const amt = Number(e.target.value);
                      const tax = Math.round(amt * 0.11);
                      setInvoiceForm({ ...invoiceForm, amount: amt, tax, total: amt + tax });
                    }}
                    className="w-full border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">PPN 11%</label>
                  <input
                    type="number"
                    value={invoiceForm.tax}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, tax: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded p-1.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Total Tagihan</label>
                  <input
                    type="number"
                    value={invoiceForm.total}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, total: Number(e.target.value) })}
                    className="w-full border border-indigo-300 bg-indigo-50 font-bold rounded p-1.5 text-indigo-900"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                Sistem akan memverifikasi kesesuaian nilai total invoice dengan total PO serta memastikan kelengkapan dokumen BAST fisik.
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setInvoiceModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold shadow"
              >
                Validasi & Simpan Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Rilis Pembayaran Vendor (Payment Gateway/Bank)</h3>
                <p className="text-[11px] text-slate-400">Otorisasi pencairan dana ke rekening rekanan.</p>
              </div>
              <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Metode Transfer Bank</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Corporate Internet Banking (BI-FAST)">Corporate Internet Banking (BI-FAST)</option>
                  <option value="RTGS (Real Time Gross Settlement)">RTGS (Real Time Gross Settlement)</option>
                  <option value="Virtual Account Treasury">Virtual Account Corporate Treasury</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nomor Referensi Transaksi Bank</label>
                <input
                  type="text"
                  value={paymentForm.refNo}
                  onChange={(e) => setPaymentForm({ ...paymentForm, refNo: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                <div className="font-bold">Konfirmasi Treasury:</div>
                <div className="text-[11px] mt-0.5">
                  Setelah tombol rilis diklik, status invoice otomatis berubah menjadi <strong>PAID</strong> dan status siklus PO menjadi <strong>COMPLETED</strong>.
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleExecutePayment}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold shadow"
              >
                Konfirmasi & Rilis Dana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}