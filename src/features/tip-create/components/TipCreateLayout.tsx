'use client';

import TitleSection from './TitleSection/TitleSection';
import ContentSection from './ContentSection/ContentSection';
import ImageSection from './ImageSection/ImageSection';
import CategorySection from './CategorySection/CategorySection';
import SubmitFooter from './SubmitFooter/SubmitFooter';
import { useTipWrite } from '../hooks/useTipCreateForm';

export default function TipCreateLayout() {
  const { submit, mutation, errorMessage } = useTipWrite();
  return (
    <main className="pb-10">
      <fieldset disabled={mutation.isPending || mutation.isSuccess}>
        <TitleSection />
        <ContentSection />
        <ImageSection />
        <CategorySection />
      </fieldset>
      <SubmitFooter
        onSubmit={submit}
        pending={mutation.isPending}
        createdTipId={mutation.data?.tips_id}
        errorMessage={errorMessage}
      />
    </main>
  );
}
