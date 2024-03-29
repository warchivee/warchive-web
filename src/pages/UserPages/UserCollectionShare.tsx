import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import wataListState from 'src/atoms/wata.atom';
import { Title } from '@components/CommonComponents/text';
import WataCardList from '@components/UserComponents/wata/list';
import { getSharedCollectionToUrl } from '@utils/shareUrlShroter.util';

export default function ShareCollections() {
  const { watas } = useRecoilValue(wataListState);
  const [searchParams] = useSearchParams();

  const sharedCollection = getSharedCollectionToUrl(
    watas,
    searchParams.get('p') || '',
  );

  return (
    <div className="share-collections">
      <Title type="h1">{sharedCollection.title}</Title>
      <WataCardList watas={sharedCollection.items} />
    </div>
  );
}
