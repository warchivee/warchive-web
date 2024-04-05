import { Text } from '@components/CommonComponents/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="info">
          <div>
            <Text color="gray">팀 와카이브</Text>
            <Text color="gray">team.warchive@gmail.com</Text>
            <a
              href="https://womynarchive.notion.site/ae89f36ef66b498a80e5b5dca798cc9a?pvs=4"
              target="_blank"
              rel="noreferrer"
            >
              <Text color="gray">와카이브 팀원 소개 페이지 바로가기</Text>
            </a>
          </div>

          <div>
            <Text color="gray">후원계좌</Text>
            <Text color="gray">신한은행 110-428-228720 ㅇㅈㅇ</Text>
          </div>

          <a
            href="https://article.womynarchive.com/"
            target="_blank"
            aria-label="와카이브-아티클로 이동"
            rel="noreferrer"
          >
            와카이브 아티클
          </a>
        </div>

        <div className="info sns">
          <a
            href="https://twitter.com/Womynarchive"
            target="_blank"
            aria-label="트위터로 이동"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a
            href="https://www.instagram.com/womynarchive/"
            target="_blank"
            aria-label="인스타그램으로 이동"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
}
