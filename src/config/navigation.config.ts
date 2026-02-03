export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'หน้าแรก', icon: '🏠' },
  { href: '/topics', label: 'คำตอบทั้งหมด', icon: '📚' },
  { href: '/categories', label: 'หมวดหมู่', icon: '📂' },
  { href: '/search', label: 'ค้นหา', icon: '🔍' },
];

export const FOOTER_SECTIONS = {
  browse: {
    title: 'ค้นหาคำตอบ',
    links: [
      { href: '/topics', label: 'คำตอบทั้งหมด' },
      { href: '/categories', label: 'หมวดหมู่' },
      { href: '/search', label: 'ค้นหา' },
      { href: '/popular', label: 'ยอดนิยม' },
    ],
  },
  categories: {
    title: 'หมวดหมู่หลัก',
    links: [
      { href: '/categories/quran', label: 'อัลกุรอาน' },
      { href: '/categories/prophet', label: 'ศาสดามุฮัมมัด ﷺ' },
      { href: '/categories/women', label: 'สตรีในอิสลาม' },
      { href: '/categories/science', label: 'วิทยาศาสตร์' },
    ],
  },
  about: {
    title: 'เกี่ยวกับเรา',
    links: [
      { href: '/about', label: 'เกี่ยวกับ Haqq Vault' },
      { href: '/scholars', label: 'ทีมนักวิชาการ' },
      { href: '/methodology', label: 'หลักการตอบคำถาม' },
      { href: '/contact', label: 'ติดต่อเรา' },
    ],
  },
} as const;
