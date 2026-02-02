'use client';

/**
 * TermsView
 * Terms of Service page
 */

import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function TermsView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const contentSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 200,
  });

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="md" color="gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              📜 เงื่อนไขการใช้งาน
            </h1>
            <p className="text-muted">
              อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </animated.div>

          {/* Content */}
          <animated.div style={contentSpring} className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">1. การยอมรับเงื่อนไข</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  การใช้งานเว็บไซต์ Haqq Vault ถือว่าคุณได้ยอมรับเงื่อนไขการใช้งานเหล่านี้ทั้งหมด 
                  หากคุณไม่ยอมรับเงื่อนไขใดๆ กรุณาหยุดใช้งานเว็บไซต์
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">2. วัตถุประสงค์ของเว็บไซต์</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                  Haqq Vault มีวัตถุประสงค์เพื่อ:
                </p>
                <ul className="space-y-2 text-muted-dark dark:text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ให้ความรู้และคำตอบเกี่ยวกับอิสลาม</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ตอบข้อกล่าวหาและข้อสงสัยด้วยหลักฐานทางวิชาการ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>เผยแพร่ความเข้าใจที่ถูกต้องเกี่ยวกับอิสลาม</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">3. ลิขสิทธิ์เนื้อหา</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                  เนื้อหาบนเว็บไซต์นี้เป็นลิขสิทธิ์ของ Haqq Vault ยกเว้นที่ระบุไว้เป็นอย่างอื่น 
                  คุณสามารถ:
                </p>
                <ul className="space-y-2 text-muted-dark dark:text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>อ่านและศึกษาเนื้อหาเพื่อการศึกษาส่วนตัว</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>แชร์ลิงก์ไปยังเนื้อหาบนเว็บไซต์</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>อ้างอิงเนื้อหาโดยระบุแหล่งที่มา</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>คัดลอกเนื้อหาจำนวนมากโดยไม่ได้รับอนุญาต</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>ใช้เนื้อหาเพื่อวัตถุประสงค์เชิงพาณิชย์โดยไม่ได้รับอนุญาต</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">4. ความถูกต้องของเนื้อหา</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  เราพยายามอย่างสุดความสามารถเพื่อให้แน่ใจว่าเนื้อหาถูกต้องและเป็นปัจจุบัน 
                  อย่างไรก็ตาม เราไม่รับประกันความถูกต้อง 100% หากพบข้อผิดพลาด กรุณาแจ้งให้เราทราบ
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">5. การใช้งานที่ห้าม</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                  คุณตกลงที่จะไม่:
                </p>
                <ul className="space-y-2 text-muted-dark dark:text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>ใช้เว็บไซต์เพื่อวัตถุประสงค์ที่ผิดกฎหมาย</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>พยายามเข้าถึงระบบหรือข้อมูลโดยไม่ได้รับอนุญาต</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>ส่งข้อมูลเท็จหรือหลอกลวง</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>ทำการโจมตีระบบหรือรบกวนการให้บริการ</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">6. การจำกัดความรับผิด</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  Haqq Vault ไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการใช้หรือไม่สามารถใช้เว็บไซต์ได้ 
                  รวมถึงความเสียหายจากข้อมูลที่อาจไม่ถูกต้อง
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">7. การเปลี่ยนแปลงเงื่อนไข</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขการใช้งานได้ตลอดเวลาโดยไม่ต้องแจ้งล่วงหน้า 
                  การใช้งานเว็บไซต์ต่อหลังจากการเปลี่ยนแปลงถือว่าคุณยอมรับเงื่อนไขใหม่
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">8. ติดต่อเรา</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  หากมีคำถามเกี่ยวกับเงื่อนไขการใช้งาน สามารถติดต่อได้ที่{' '}
                  <a href="mailto:legal@haqqvault.com" className="text-primary hover:underline">
                    legal@haqqvault.com
                  </a>
                </p>
              </section>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
