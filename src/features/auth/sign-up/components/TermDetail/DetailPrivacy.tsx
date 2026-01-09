const DetailPrivacy = () => {
  return (
    <div className="flex flex-col text-gray-900 mt-4">
      <div className="text-title3 mb-2">{`(선택) 제 3자 정보 제공 동의`}</div>
      <div className="whitespace-pre-line text-caption1 mb-4">
        {`이벤트를 위한 개인 정보를 수집합니다. “개인정보”는 생존하는 개인에 관한 정보에 포함된 설명, 주민등록번호 등의 사항으로 해당 개인을 식별할 수 있는 정보 (해당 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 쉽게 결합하여 식별할 수 있는 것을 포함)를 말합니다.

사이트가 고객의 개인정보를 수집 이용하는 목적은 다음과 같습니다.

- 필수 수집항목 : 이름, 연락처
- 이용 목적 : 가입, 서비스 이용 시 상담, 공지사항 전달
- 보유 기간 : 회원 탈퇴시 즉시 삭제, 회원인 경우 5년간 보관`}
      </div>
    </div>
  );
};

export default DetailPrivacy;
