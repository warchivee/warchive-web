import IndexedDBUtil, {
  SCRAPBOOK_STORE,
} from '@utils/indexedDB/indexedDB.util';
import fetchScrapbooks from '@utils/indexedDB/fetchScrapbookFromIndexedDB.util';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  UpdateScrapbookItemParam,
  createScrapbookApi,
  deleteScrapbookApi,
  updateScrapbookApi,
  updateScrapbookItemApi,
} from 'src/services/scrapbook.api';
import { scrapbookAtom } from 'src/stores/scrapbook.atom';
import wataAtom from 'src/stores/wata.atom';
import RecoverableError from 'src/types/error/RecoverableError';
import {
  isIncludeBlockedWords,
  isUrl,
  validInputText,
} from '@utils/stringValid.util';
import {
  SCRAPBOOKS_LIMMIT_COUNT,
  SCRAPBOOK_COMMENT_LIMIT_LENGTH,
  SCRAPBOOK_ITEMS_LIMIT_COUNT,
  SCRAPBOOK_TITLE_LIMIT_LENGTH,
} from '@utils/consts/scrapbooks.const';
import { WataType } from 'src/types/wata.type';

const indexedDB = IndexedDBUtil.getInstance();

export const useScrapbook = () => {
  const watas = useRecoilValue(wataAtom);
  const [scrapbookState, setScrapbookState] = useRecoilState(scrapbookAtom);

  const initScrapbookState = async () => {
    const scrapbooks = await fetchScrapbooks();

    setScrapbookState({
      selectedIndex: 0,
      scrapbooks,
    });
  };

  const refreshScrapbookState = async () => {
    await initScrapbookState();
  };

  const getSelectScrapbookIndex = () => scrapbookState.selectedIndex;

  const getScrapbooks = () => scrapbookState.scrapbooks;

  const getScrapbook = () => getScrapbooks()[getSelectScrapbookIndex()] ?? [];

  const isScrapbooksEmpty = () =>
    !getScrapbooks() || getScrapbooks()?.length <= 0;

  const getScrapbookItems = (): WataType[] => {
    const scrapbook = getScrapbook();

    if (!scrapbook || !scrapbook?.items || scrapbook?.items?.length === 0) {
      return [];
    }

    const result: WataType[] = scrapbook?.items
      ?.map((item) => watas?.find((w) => w.id === item))
      ?.filter((si): si is WataType => si !== undefined);

    return result;
  };

  const hasScrapbook = (wataId: number) =>
    getScrapbooks().some((s) => s.items.includes(wataId));

  const selectScrapbook = (index: number) => {
    setScrapbookState({ ...scrapbookState, selectedIndex: index });
  };

  const updateScrapbook = async (params: { title: string; note: string }) => {
    if (
      getScrapbook()?.title === params.title &&
      getScrapbook()?.note === params.note
    ) {
      return;
    }

    if (params.title?.replace(' ', '')?.length < 2) {
      throw new RecoverableError('스크랩북 이름은 두 글자 이상이어야 합니다.');
    }

    if (isUrl(params.title) || isUrl(params.note)) {
      throw new RecoverableError(
        '스크랩북 이름과 코멘트에는 url를 입력할 수 없습니다.',
      );
    }

    if (
      isIncludeBlockedWords(params.title) ||
      isIncludeBlockedWords(params.note)
    ) {
      throw new RecoverableError(
        '스크랩북 이름과 코멘트에 입력할 수 없는 단어가 있습니다.',
      );
    }

    if (
      (params.title?.length ?? 0) > SCRAPBOOK_TITLE_LIMIT_LENGTH ||
      (params.note?.length ?? 0) > SCRAPBOOK_COMMENT_LIMIT_LENGTH
    ) {
      throw new RecoverableError(
        `스크랩북 이름은 ${SCRAPBOOK_TITLE_LIMIT_LENGTH}자, 코멘트는 ${SCRAPBOOK_COMMENT_LIMIT_LENGTH}자까지만 입력할 수 있습니다.`,
      );
    }

    const result = await updateScrapbookApi(getScrapbook()?.id, params);

    await indexedDB.updateItem(SCRAPBOOK_STORE, {
      ...getScrapbook(),
      title: result.title,
      note: result.note,
    });

    setScrapbookState({
      ...scrapbookState,
      scrapbooks: await fetchScrapbooks(),
    });
  };

  const addScrapbook = async (title: string) => {
    if (getScrapbooks()?.length >= SCRAPBOOKS_LIMMIT_COUNT) {
      throw new RecoverableError(
        `스크랩북은 ${SCRAPBOOKS_LIMMIT_COUNT}개만 생성할 수 있습니다.`,
      );
    }

    if (isIncludeBlockedWords(title)) {
      throw new RecoverableError(
        '스크랩북 이름에 입력할 수 없는 단어가 있습니다.',
      );
    }

    if (title?.replace(' ', '')?.length < 2) {
      throw new RecoverableError('스크랩북 이름은 두 글자 이상이어야 합니다.');
    }

    if (title.length > SCRAPBOOK_TITLE_LIMIT_LENGTH) {
      throw new RecoverableError(
        `스크랩북 이름은 ${SCRAPBOOK_TITLE_LIMIT_LENGTH}자까지만 입력할 수 있습니다.`,
      );
    }

    if (validInputText(title)) {
      throw new RecoverableError('스크랩북 이름에는 url를 입력할 수 없습니다.');
    }

    const result = await createScrapbookApi({
      title,
      note: '',
    });

    await indexedDB.addItem(SCRAPBOOK_STORE, result);

    setScrapbookState({
      ...scrapbookState,
      selectedIndex: getScrapbooks().length,
      scrapbooks: await fetchScrapbooks(),
    });
  };

  const deleteScrapbook = async () => {
    const { id } = getScrapbook();

    await deleteScrapbookApi(id);

    await indexedDB.deleteItem(SCRAPBOOK_STORE, id);

    setScrapbookState({
      ...scrapbookState,
      selectedIndex: getSelectScrapbookIndex() - 1,
      scrapbooks: await fetchScrapbooks(),
    });
  };

  const findIndexByScrapbookId = (scrapbookId: number) =>
    getScrapbooks()?.findIndex((scrapbook) => scrapbook.id === scrapbookId);

  const updateScrapbookItems = async (
    updateItems: UpdateScrapbookItemParam[],
  ) => {
    let addCount: Record<number, number> = {};

    updateItems.forEach((item) => {
      if (item.action === 'ADD') {
        let count = 0;

        if (!addCount[item.scrapbook_id]) {
          const index = findIndexByScrapbookId(item.scrapbook_id);
          count = getScrapbooks()[index]?.items?.length ?? 0 + 1;
        } else {
          count = addCount[item.scrapbook_id] + 1;
        }

        if (count > SCRAPBOOK_ITEMS_LIMIT_COUNT) {
          throw new RecoverableError(
            `한 스크랩북에는 작품을 ${SCRAPBOOK_ITEMS_LIMIT_COUNT} 까지만 추가할 수 있습니다.`,
          );
        }

        addCount = { ...addCount, [item.scrapbook_id]: count };
      }
    });

    await updateScrapbookItemApi(updateItems);

    updateItems?.forEach(async (updateItem) => {
      const index = findIndexByScrapbookId(updateItem.scrapbook_id);
      const scrapbook = getScrapbooks()[index];
      const items = scrapbook.items ?? [];

      if (updateItem.action === 'ADD') {
        const updated = {
          ...scrapbook,
          items: items.concat(updateItem.wata_id),
        };

        await indexedDB.updateItem(SCRAPBOOK_STORE, updated);
      } else if (updateItem.action === 'DELETE') {
        const updated = {
          ...scrapbook,
          items: items?.filter((item) => item !== updateItem.wata_id),
        };

        await indexedDB.updateItem(SCRAPBOOK_STORE, updated);
      }
    });

    setScrapbookState({
      ...scrapbookState,
      scrapbooks: await fetchScrapbooks(),
    });
  };

  return {
    refreshScrapbookState,
    isScrapbooksEmpty,
    hasScrapbook,
    getSelectScrapbookIndex,
    getScrapbook,
    getScrapbooks,
    getScrapbookItems,
    selectScrapbook,
    updateScrapbook,
    addScrapbook,
    deleteScrapbook,
    updateScrapbookItems,
  };
};

export default useScrapbook;
