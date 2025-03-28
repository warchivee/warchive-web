import { Text, Title } from '@components/CommonComponents/text';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/joy';

export default function About() {
  return (
    <div className="about about-box">
      <div className="col">
        <div className="row item-col-center">
          <img src="/images/logo/sh-logo.png" alt="와카이브 로고" width={300} />
          <Title type="h2" color="blue-violet">
            여성서사 아카이브 프로젝트{' '}
          </Title>
        </div>
      </div>
      <div className="title col puple-box">
        <div className="row item-col-center">
          <Title type="h2" color="blue-violet">
            Womyn + archive
          </Title>
          <div className="text-center">
            <Text>
              지금까지 SNS, 구글 시트, 커뮤니티 게시글 등 다양한 방식으로
              여성서사에 대한 추천과 공유가 이루어져 왔지만,
              <br />
              플랫폼의 한계로 인해 데이터를 축적하기 어려운 환경에서 많은 정보가
              소실되고 있습니다.
              <br />
              이에 여성서사의 계보를 기록하고 보존하기 위해 와카이브 프로젝트를
              시작하게 되었습니다.
            </Text>
          </div>
        </div>
      </div>
      <div className="col mobile">
        <div className="row width-half">
          <Title type="h3" color="blue-violet">
            와카이브의 지향점
          </Title>
          <Text>
            단순히 데이터를 취합하거나 축적하는 데 그치지 않고, 체계적인 분류와
            키워드 기반 탐색 기능을 통해 사용자가 원하는 여성서사 콘텐츠에 보다
            손쉽게 접근할 수 있도록 설계되어 있습니다.
          </Text>
          <Text>
            또한, 추천작 제보를 통해 다양한 작품들을 함께 기록함으로써 보다
            폭넓고 다양한 여성서사 세계를 함께 만들어갑니다.
          </Text>
        </div>
        <div className="row width-half">
          <Title type="h3" color="blue-violet">
            와카이브의 목표
          </Title>
          <Text>
            {`와카이브는 궁극적으로 '여성서사 콘텐츠'가 중심이 되는 미래를 지향하며, 여성서사의 계보와 보존을 위해 노력합니다.`}
          </Text>
          <Text>
            이에 관심을 가지고 함께 기록에 동참해 주시는 모든 분의 노력이 곧
            여성서사의 새로운 역사로 이어질 것입니다.
          </Text>
          <Text>
            여성서사를 향유하시는 여러분의 적극적인 제보와 많은 이용을
            부탁드립니다.
          </Text>
        </div>
      </div>
      <div className="col puple-box mobile">
        <div className="row width-half item-center">
          <Title type="h3" color="blue-violet">
            와카이브에서 제보받는 여성서사의 기준
          </Title>
          <Text>
            {`와카이브는 수많은 여성의 이야기를 기록하는 것을 목표로 하며, 기록의 방향성과 운영의 일관성을 위해 '여성서사'에 대한 최소한의 합의와 가이드라인이 필요합니다.`}
          </Text>
          <Text>
            이는 콘텐츠의 등급을 나누거나 서열을 매기기 위한 것이 아닌 사이트의
            원활한 운영을 위한 기준입니다.
          </Text>
          <Text>
            또한 저작권 문제로 인해 정식으로 출판되었거나 출시된 콘텐츠만
            등록하고 있습니다.
          </Text>
        </div>
        <div className="row anythinglisting4  width-half">
          <ul className="p puble-color">
            <li>
              <Text>여성이 주연일 것</Text>
            </li>
            <li>
              <Text>조연급 여성이 다수 등장할 것</Text>
            </li>
            <li>
              <Text>
                대상화된 여성이 아니거나, 기존에 자주 등장하지 않은 다양한
                형태의 여성일 것
              </Text>
            </li>
            <li>
              <Text>비여성 캐릭터의 비중이나 로맨스가 부각되지 않을 것</Text>
            </li>
            <li>
              <Text>여성의 도구화 또는 불행 포르노가 중심이 되지 않을 것</Text>
            </li>
          </ul>
        </div>
      </div>

      <IconButton
        sx={{ gap: '0.2rem' }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <FontAwesomeIcon icon={faAnglesUp} />
        맨위로
      </IconButton>
    </div>
  );
}
