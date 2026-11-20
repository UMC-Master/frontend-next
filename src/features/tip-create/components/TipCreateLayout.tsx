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
    <main className="flex flex-col gap-6 pt-4 pb-6">
      <fieldset
        className="flex min-w-0 flex-col gap-6"
        disabled={mutation.isPending || mutation.isSuccess}
      >
        <div className="flex flex-col gap-3">
          <TitleSection />
          <ContentSection />
        </div>
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
