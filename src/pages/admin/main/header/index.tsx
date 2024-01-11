import Button from '@components/button';
import { Title } from '@components/text';

export default function AdminHeader({
  openDrawer,
}: {
  openDrawer: () => void;
}) {
  return (
    <div className="header">
      <div className="body">
        <div className="left">
          <Button onClick={() => openDrawer()} labelColor="white" size="big">
            메뉴
          </Button>
        </div>

        <div className="right">
          <Button
            onClick={() => openDrawer()}
            labelColor="ebony"
            size="big"
            icon="plus"
            iconColor="ebony"
            background="selago"
            border="round"
          >
            데이터 추가
          </Button>
          <Title type="h3" color="selago">
            닉네임
          </Title>
        </div>
      </div>
    </div>
  );
}
