import Button from '@components/button';
import { Text, Title } from '@components/text';

const card = () => (
  <div className="card-container">
    <div className="card">
      <div className="header">
        <div className="left">
          <Button border="round" labelColor="ebony">
            검수중
          </Button>
        </div>
        <div className="right">
          <Button background="selago" border="round">
            삭제
          </Button>
          <Button background="selago" border="round">
            수정
          </Button>
        </div>
      </div>
      <div className="body">
        <div className="left">
          <div className="thumbnail">
            <img src="https://i.ibb.co/ZfMrDxy/127817656.jpg" alt="썸네일" />
          </div>
        </div>
        <div className="right">
          <div className="info">
            <Text color="gray">{`서적 > 소설`}</Text>
            <Text color="gray">게르드 브란튼베르크</Text>
          </div>
          <div className="title">
            <Title type="h4">
              나는 내 파이를 구할 뿐 인류를 구하러 온 게 아니라고
            </Title>
          </div>
          <div className="keyword">
            <Text color="gray">키워드</Text>
            <ol>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
            </ol>
          </div>
          <div className="keyword">
            <Text color="gray">주의키워드</Text>
            <ol>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
            </ol>
          </div>
          <div className="keyword">
            <Text color="gray">플랫폼</Text>
            <ol>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
              <li>
                <Text>졸라긴키워드입</Text>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div className="memo">
      <div className="header">
        <Title type="h4">MEMO</Title>
        <Button icon="write" border="round" labelColor="ebony" />
      </div>
      <Text>
        어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고
        어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
        어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고 어쩌고저쩌고
        어쩌고저쩌고
      </Text>
    </div>
  </div>
);

export default function AdminHome() {
  return (
    <div className="data-manage">
      <Title type="h1">데이터 관리</Title>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => card())}
    </div>
  );
}
