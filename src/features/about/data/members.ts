export interface TeamMember {
  id: string;
  role: string;
  nameKo: string;
  nameEn: string;
  university: string;
  department: string;
  imageSrc?: string;
  qna: {
    question: string;
    answer: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'aera-hwang',
    role: 'PM',
    nameKo: '황애라',
    nameEn: 'Aera Hwang',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      {
        question: '자기소개',
        answer:
          '안녕하세요! HOME MASTER의 PM 황애라입니다.\n저희 TEAM HM 모두가 열심히 준비한 서비스를 드디어 선보일 수 있게 되어 기쁩니다!',
      },
      {
        question: 'HOMEMASTER 기획 계기',
        answer:
          '제 주변에 자취생들이 생각보다 많아 평상시 대화에서 자취생들의 불편한 점들을 듣게 되었습니다. 얘기를 들으면서 이런 불편한 점들을 조금이나마 해결할 수 있는 서비스가 있으면 좋겠다는 생각에 기획하게 되었습니다!',
      },
      {
        question: 'HOMEMASTER에서 주목할 만한 기능',
        answer:
          "아무래도 '저장한 꿀팁' 기능과 '챌린지' 기능 이렇게 크게 두 가지 기능일 것 같습니다. '저장한 꿀팁'의 경우 꿀팁들을 모아서 언제든 볼 수 있다는 점에서 특히 자취 초보 유저들이 유용하게 사용할 것 같습니다. 그리고 '챌린지'는 자취 습관이 잘 잡혀있지 않은 유저들을 위한 기능으로 혼자가 아닌 함께 진행한다는 점에서 서로에게 좋은 자극을 받을 수 있다는 점이 주목할 만한 것 같습니다!",
      },
      {
        question: 'HOMEMASTER 유저들에게 한 마디',
        answer:
          'TEAM HM가 열심히 준비한 서비스를 드디어 선보일 수 있어서 기쁘고 설레는 마음입니다. 앞으로 더 기능들을 추가하면서 디벨롭될 예정이지만 현재 부족한 부분도 많습니다. 다양한 의견, 피드백 모두 환영이니 언제든 편하게 의견 주시면 더 개선된 서비스를 만들기 위해 최선을 다하겠습니다! 저희 서비스 많은 관심 부탁드립니다! 감사합니다!',
      },
    ],
  },
  {
    id: 'sungeun-kim',
    role: 'DE',
    nameKo: '김성은',
    nameEn: 'Sungeun Kim',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
  {
    id: 'minji-kim',
    role: 'FE',
    nameKo: '김민지',
    nameEn: 'Minji Kim',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
  {
    id: 'heesu-ra',
    role: 'FE',
    nameKo: '라희수',
    nameEn: 'Heesu Ra',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
  {
    id: 'gihoon-son',
    role: 'FE',
    nameKo: '손기훈',
    nameEn: 'Gihoon Son',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
  {
    id: 'mijin-kim',
    role: 'BE',
    nameKo: '김미진',
    nameEn: 'Mijin Kim',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
  {
    id: 'chaewon-kim',
    role: 'BE',
    nameKo: '김채원',
    nameEn: 'Chaewon Kim',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
  {
    id: 'haeseung-lee',
    role: 'BE',
    nameKo: '이해승',
    nameEn: 'Haeseung Lee',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    qna: [
      { question: '자기소개', answer: '' },
      { question: 'HOMEMASTER 기획 계기', answer: '' },
      { question: 'HOMEMASTER에서 주목할 만한 기능', answer: '' },
      { question: 'HOMEMASTER 유저들에게 한 마디', answer: '' },
    ],
  },
];

export const getMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find((member) => member.id === id);
};
