import { useTipWriteStore } from '../stores/tipWriteStore';
import { tipWriteSchema } from '../schema/tipWrite.schema';
import { useTipCreate } from '@/api/tip/useTipCreate';
import { useRef, useState } from 'react';

export function useTipWrite() {
  const store = useTipWriteStore();
  const mutation = useTipCreate();
  const inFlight = useRef(false);
  const [validationError, setValidationError] = useState('');

  const submit = async () => {
    if (inFlight.current || mutation.isSuccess) return;
    const result = tipWriteSchema.safeParse({
      title: store.title,
      content: store.content,
      categories: store.categories,
    });

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError('');
    inFlight.current = true;
    try {
      await mutation.mutateAsync({
        title: result.data.title,
        content: result.data.content,
        hashtags: result.data.categories,
        imageUrls: [...store.images],
      });
    } catch {
      // The mutation error is rendered beside the submit button; retain the draft.
    } finally {
      inFlight.current = false;
    }
  };

  return {
    ...store,
    submit,
    mutation,
    errorMessage: validationError || mutation.error?.message,
  };
}
