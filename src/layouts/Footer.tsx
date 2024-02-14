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
            <Text color="gray">우리 1002 343 024735 ㅇㅈㅇ</Text>
          </div>
        </div>

        <div className="connect">
          <a
            href="https://twitter.com/Womynarchive"
            target="_blank"
            aria-label="트위터로 이동"
            rel="noreferrer"
          >
            <Button
              icon="twitter"
              iconColor="ebony"
              background="twitter-blue"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
