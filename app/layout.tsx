import { ThemeProvider } from "@/src/presentation/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Haqq Vault | คลังคำตอบชุบฮาต",
  description: "แหล่งรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม โดยใช้หลักฐานจากอัลกุรอาน หะดีษ และความเห็นของบรรดานักวิชาการ",
  keywords: ["อิสลาม", "คำตอบ", "ชุบฮาต", "อัลกุรอาน", "หะดีษ", "BurhanQA"],
  openGraph: {
    title: "Haqq Vault | คลังคำตอบชุบฮาต",
    description: "แหล่งรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
