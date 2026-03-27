'use client';

import ImageGrid from './ImageGrid/ImageGrid';
import TipHeader from './TipHeader/TipHeader';
import TipContent from './TipContent/TipContent';
import TagList from './TagList/TagList';
import TipActionBar from './TipActionBar/TipActionBar';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { useTipDetail } from '../hooks/useTipDetail';

interface Props {
  tipId: string;
}

export default function TipDetailLayout({ tipId }: Props) {
  const { tip, isDeleteOpen, openDelete, closeDelete } = useTipDetail(tipId);

  return (
    <main className="pb-10">
      <ImageGrid images={tip.images} />
      <TipHeader
        title={tip.title}
        author={tip.author}
        createdAt={tip.createdAt}
      />
      <div className="mx-5 mt-6 h-[1px] bg-gray-200/60" />
      <TipContent content={tip.content} />
      <TagList tags={tip.tags} />
      <TipActionBar stats={tip.stats} onDelete={openDelete} />
      {isDeleteOpen && (
        <ModalWrapper onClose={closeDelete}>
          <ConfirmModal
            title="삭제하시겠습니까?"
            confirmText="삭제하기"
            onConfirm={() => {
              // delete api
              closeDelete();
            }}
            onCancel={closeDelete}
          />
        </ModalWrapper>
      )}
    </main>
  );
}
