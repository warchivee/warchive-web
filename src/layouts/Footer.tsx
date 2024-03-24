import Button from '@components/CommonComponents/button';
import { Text } from '@components/CommonComponents/text';

export default function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="info">
          <div>
            <Text color="gray">연락처</Text>
            <Text color="gray">team.warchive@gmail.com</Text>
          </div>

          <div>
            <Text color="gray">후원계좌</Text>
            <Text color="gray">신한은행 110-428-228720 ㅇㅈㅇ</Text>
          </div>
        </div>

        <div className="info contact">
          <div>
            <Text color="gray">팀 와카이브</Text>
            <a
              href="https://womynarchive.notion.site/ae89f36ef66b498a80e5b5dca798cc9a?pvs=4"
              target="_blank"
              rel="noreferrer"
            >
              <Text color="gray">와카이브 팀원 소개 페이지 바로가기</Text>
            </a>
          </div>
          <div className="sns">
            <a
              href="https://twitter.com/Womynarchive"
              target="_blank"
              aria-label="트위터로 이동"
              rel="noreferrer"
            >
              <Button icon="twitter" iconColor="gray" size="bigger" />
            </a>
            <a
              href="https://www.instagram.com/womynarchive/"
              target="_blank"
              aria-label="인스타그램으로 이동"
              rel="noreferrer"
            >
              <Button icon="instagram" iconColor="gray" size="bigger" />
            </a>
            <a
              href="https://article.womynarchive.com/"
              target="_blank"
              aria-label="와카이브-아티클로 이동"
              rel="noreferrer"
            >
              <Button icon="news" iconColor="gray" size="bigger" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
