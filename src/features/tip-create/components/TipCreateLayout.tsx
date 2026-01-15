'use client';

import TitleSection from './TitleSection/TitleSection';
import ContentSection from './ContentSection/ContentSection';
import ImageSection from './ImageSection/ImageSection';
import CategorySection from './CategorySection/CategorySection';
import SubmitFooter from './SubmitFooter/SubmitFooter';

export default function TipCreateLayout() {
  return (
    <main className="pb-10">
      <TitleSection />
      <ContentSection />
      <ImageSection />
      <CategorySection />
      <SubmitFooter />
    </main>
  );
}
