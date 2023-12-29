import Button from '@components/button';
import { Text, Title } from '@components/text';

export default function About() {
  return (
    <div className="about-box">
      <div className="col">
        <div className="row item-col-center">
          <img
            src="./images/logo/sh-logo.png"
            alt="와카이브 로고"
            width={300}
          />
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
          <Text>
            지금까지 트위터, 구글시트, 게시글 등 다양한 방식으로 여성서사들에
            대한 추천과 공유가 이루어졌으나
          </Text>
          <Text>
            플랫폼의 한계로 데이터의 축척이 어려운 환경에서 소실되는 정보가
            많음을 고려,
          </Text>
          <Text>여성서사의 계보를 기록하기 위해 발족한 프로젝트 입니다.</Text>
        </div>
      </div>
      <div className="col mobile">
        <div className="row width-half">
          <Title type="h3" color="blue-violet">
            와카이브의 지향점
          </Title>
          <Text>
            단순한 데이터 취합 혹은 축적에서 멈추는 것이 아닌, 분류와 키워드
            기능을 통해 원하는 여성서사 컨텐츠들에 대한 접근성을 높입니다.
          </Text>
          <Text>
            추천작 제보를 통한 다수의 협력으로 다양한 분야의 여성서사를 기록할
            수 있게 되어 여성서사에 대한 시야를 넓힐 수 있습니다.
          </Text>
        </div>
        <div className="row width-half">
          <Title type="h3" color="blue-violet">
            와카이브의 목표
          </Title>
          <Text>
            {`와카이브는 궁극적으로 '여성서사 컨텐츠'가 주가 될 수 있는 미래를
            지향하며 여성서사의 계보, 보존을 위해 노력합니다.`}
          </Text>
          <Text>
            이에 관심을 기울여주시고 함께 기록에 동참해 주시는 모든 사람의
            노력이 곧 새로운 여성서사의 역사로 이어질 것입니다.
          </Text>
          <Text>
            따라서 여성서사를 향유하는 여러분들의 적극적인 제보와 많은 이용을
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
            {`와카이브는 여성서사 계보의 유지를 목표로 하여 수많은 여성의 이야기를
            기록하자는 지향점을 가지고 있으나, 불특정 다수의 제보를 받아
            기록함에 있어서 최소한의 '여성서사' 에 대한 합의 및 가이드라인이
            필요합니다. 따라서 와카이브 내 제보받는 여성서사에 대한 기준이
            있습니다.`}
          </Text>
          <Text>
            이는 여성서사의 급을 나눈다거나 컨텐츠의 서열을 매기는 것이 아닌,
            사이트의 원활한 운영을 위한 사람들 간의 최소한의 합의라 여겨 주시길
            바랍니다.
          </Text>
          <Text>
            또한 저작권 문제로 인해 정식 출판, 출시된 컨텐츠만 등록하였습니다.
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
                대상화 된 여성이 아니거나, 기존에 많이 등장한 적이 없는 다양한
                형태의 여성일 것
              </Text>
            </li>
            <li>
              <Text>비여성의 비중, 혹은 로맨스가 부각되지 않을 것</Text>
            </li>
            <li>
              <Text>여성의 도구화 혹은 불행포르노가 주가 되지 않을 것</Text>
            </li>
          </ul>
        </div>
      </div>

      <Button
        icon="angles-up"
        iconColor="blue-violet"
        labelColor="blue-violet"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        맨위로
      </Button>
    </div>
  );
}
