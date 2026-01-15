import { useTipWriteStore } from '../stores/tipWriteStore';
import { tipWriteSchema } from '../schema/tipWrite.schema';

export function useTipWrite() {
  const store = useTipWriteStore();

  const submit = () => {
    const result = tipWriteSchema.safeParse({
      title: store.title,
      content: store.content,
      categories: store.categories,
    });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    store.openModal();
  };

  return {
    ...store,
    submit,
  };
}
