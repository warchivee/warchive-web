import Input from '@components/input';
import Icon from '@components/icon';
import Button from '@components/button';
import { Text } from '@components/text';
import { useState } from 'react';
import classNames from 'classnames';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReportData {
  name: string;
  contact: string;
  content: string;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [reportType, setReportType] = useState<string>('report');
  const [content1, setContent1] = useState<string>(
    '제목: \n키워드: \n플랫폼: \n간단소개:',
  );
  const [content2, setContent2] = useState<string>('');

  const resetReportForm = () => {
    setName('');
    setContact('');
    setReportType('report');
    setContent1('제목: \n키워드: \n플랫폼: \n간단소개:');
    setContent2('');
    onClose();
  };

  const handleTypeChange = (selectedType: string) => {
    setReportType(selectedType);
  };

  const handleSendReport = () => {
    let content;
    if (reportType === 'report') {
      content = content1;
    } else {
      content = content2;
    }

    if (!name || !contact || !content) {
      alert('빈칸을 모두 작성해 주세요.');
      return;
    }

    const confirmation = window.confirm('보내시겠습니까?');
    if (confirmation) {
      const reportData: ReportData = { name, contact, content };
      sendReport(reportData);
    } else {
      alert('전송을 취소하였습니다.');
    }
  };

  const sendReport = async (reportData: ReportData) => {
    try {
      console.log('Successed to send mail'); // DEBUG
      alert('전송에 성공하였습니다.');
      resetReportForm();
    } catch (error) {
      console.log('Failed to send mail: ', error); // DEBUG
      alert('전송에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={classNames('report', { close: !isOpen })}>
      <div className="inner">
        <div className="header">
          <div className="title">
            <Icon color="purple" size="big" type="mail" />
            <Text size="big">추천작 제보/문의</Text>
          </div>
          <Button icon="xmark" size="big" onClick={onClose} />
        </div>

        <div className="body">
          <div className="reporter">
            <Text color="purple">문의자 정보</Text>
            <Input placeholder="이름" value={name} onChange={setName}></Input>
            <Input
              placeholder="이메일, 트위터 계정, 그 밖의 다른 연락처"
              value={contact}
              onChange={setContact}
            ></Input>
          </div>

          <div className="content">
            <Text color="purple">문의 내용</Text>

            <div className="toggle">
              <button
                className={classNames('toggle-button', 'left', {
                  selected: reportType === 'report',
                })}
                onClick={() => handleTypeChange('report')}
              >
                추천작 제보
              </button>

              <button
                className={classNames('toggle-button', 'right', {
                  selected: reportType !== 'report',
                })}
                onClick={() => handleTypeChange('etc')}
              >
                기타 문의
              </button>
            </div>
            <div className="textbox">
              {reportType === 'report' ? (
                <textarea
                  className="content"
                  placeholder=""
                  value={content1}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setContent1(e.target.value);
                  }}
                />
              ) : (
                <textarea
                  className="content"
                  placeholder="오류 제보 및 기타 문의사항을 적어주세요."
                  value={content2}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setContent2(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          <Button
            background="purple"
            labelColor="white"
            width="full"
            onClick={handleSendReport}
          >
            보내기
          </Button>
        </div>
      </div>
    </div>
  );
}
