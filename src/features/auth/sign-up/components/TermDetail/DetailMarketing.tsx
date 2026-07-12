import TermDetailLayout from './TermDetailLayout';

const DetailMarketing = () => {
  return (
    <TermDetailLayout>
      <div className="text-title3 mb-2 text-gray-1000">
        {`(선택) 마케팅 활용 동의`}
      </div>
      <div className="whitespace-pre-line text-caption1 text-gray-900 tracking-tight">
        {`E-mail, SMS 수신에 동의합니다. `}
      </div>
    </TermDetailLayout>
  );
};

export default DetailMarketing;
