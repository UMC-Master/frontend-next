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
    imageSrc: '/creators/aera-hwang-interview.png',
    qna: [
      {
        question: '자기 소개',
        answer:
          '안녕하세요! HOME MASTER의 PM 황애라입니다 🤗\n저희 TEAM HM 모두가 열심히 준비한 서비스를 드디어 선보일 수 있게 되어 기쁩니다!',
      },
      {
        question: 'HOME MASTER 기획 계기',
        answer:
          '제 주변에 자취생들이 생각보다 많아 평상시 대화에서 자취생들의 불편한 점들을 듣게 되었습니다. 얘기를 들으면서 이런 불편한 점들을 조금이나마 해결할 수 있는 서비스가 있으면 좋겠다는 생각에 기획하게 되었습니다!',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          "아무래도 '저장한 꿀팁' 기능과 '챌린지' 기능 이렇게 크게 두 가지 기능일 것 같습니다. '저장한 꿀팁'의 경우 꿀팁들을 모아서 언제든 볼 수 있다는 점에서 특히 자취 초보 유저들이 유용하게 사용할 것 같습니다. 그리고 '챌린지'는 자취 습관이 잘 잡혀있지 않은 유저들을 위한 기능으로 혼자가 아닌 함께 진행한다는 점에서 서로에게 좋은 자극을 받을 수 있다는 점이 주목할 만한 것 같습니다!",
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          'TEAM HM가 열심히 준비한 서비스를 드디어 선보일 수 있어서 기쁘고 설레는 마음입니다. 앞으로 더 기능들을 추가하면서 디벨롭될 예정이지만 현재 부족한 부분도 많습니다. 다양한 의견, 피드백 모두 환영이니 언제든 편하게 의견 주시면 더 개선된 서비스를 만들기 위해 최선을 다하겠습니다! 저희 서비스 많은 관심 부탁드립니다! 감사합니다🥰',
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
    imageSrc: '/creators/sungeun-kim-interview.png',
    qna: [
      {
        question: '자기 소개',
        answer: '안녕하세요! HOME MASTER의 DE 김성은입니다 🤗',
      },
      {
        question: 'HOME MASTER 디자인 합류 계기',
        answer:
          '자취를 고민하던 시점이라, 이런저런 걱정들이 많았는데 자취 커뮤니티 디자인을 통해 얻을 수 있는 점들이 많지 않을까라는 생각 후에 합류를 결정하게 되었습니다. 자취가 걱정된다면 홈마스터와 함께해 보세요!',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          '자취를 하다 보면 놓치는 점들이 많은데 챌린지 기능을 통해서 좋은 습관을 만들어 보길 바라요!',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          '자취를 시작할 때 많은 어려움과 고민이 있을 텐데, HOME MASTER 서비스를 통해 해결하길 바랍니다. 자취에 익숙하신 분들도 저희와 함께 더 편리한 자취 생활이 되길 바라요!',
      },
    ],
  },
  {
    id: 'minji-kim',
    role: 'FE',
    nameKo: '김민지',
    nameEn: 'Minji Kim',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    imageSrc: '/creators/minji-kim-interview.png',
    qna: [
      {
        question: '자기 소개',
        answer:
          '안녕하세요! HOME MASTER의 프론트엔드 개발을 맡은 김민지입니다. 사용자가 서비스를 편하게 이용할 수 있도록 화면 구성과 사용 흐름을 고민하며 개발하고 있습니다.',
      },
      {
        question: 'HOME MASTER 프론트엔드 합류 계기',
        answer:
          '대학생이거나 자취를 해본 사람이라면 HOME MASTER라는 서비스에 자연스럽게 관심이 갈 수밖에 없다고 생각했습니다. 저 역시 같은 사용자로서 해당 서비스를 개발하고 싶어 프론트엔드로 합류하게 되었습니다.',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          '홈마스터에서는 다른 유저들이 직접 작성한 정보를 확인할 수 있다는 점이 가장 인상적이라고 생각합니다. 실제 경험을 바탕으로 한 정보들이 자취를 시작했거나 혼자 생활하면서 고민이 있는 분들에게 도움이 되면서 유익한 참고 자료가 되었으면 좋겠습니다.',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          'HOME MASTER가 자취하는 1인 가구분들에게 실질적으로 도움이 되는 서비스가 되었으면 좋겠습니다. 서비스를 이용하는 과정에서도 불편함보다 편리함을 더 많이 느낄 수 있도록, 좋은 사용자 경험을 만들기 위해 계속 고민하겠습니다.',
      },
    ],
  },
  {
    id: 'heesu-ra',
    role: 'FE',
    nameKo: '라희수',
    nameEn: 'Heesoo Ra',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    imageSrc: '/creators/heesu-ra-interview.png',
    qna: [
      {
        question: '자기 소개',
        answer:
          '안녕하세요! HOME MASTER의 FE 라희수입니다 🤗 자취생들이 더 편하게 서비스를 이용할 수 있도록 모바일 웹 화면과 기능을 개발하고 있습니다.',
      },
      {
        question: 'HOME MASTER 프론트엔드 합류 계기',
        answer:
          '저도 자취생이고, 자취를 오래 해오다 보니 자취 생활에서 필요한 정보나 꿀팁의 중요성을 자주 느껴왔습니다.\n처음 자취를 시작했을 때는 사소한 문제도 혼자 해결하기 어렵게 느껴질 때가 많았고, 다른 자취생들의 경험이나 조언이 큰 도움이 되었습니다. 그래서 HOME MASTER처럼 자취생들이 챌린지에 함께 참여하고, 생활 꿀팁을 나누며 서로 도움을 주고받을 수 있는 서비스를 만드는 일이 의미 있다고 생각했습니다.\n제가 직접 공감할 수 있는 서비스인 만큼, 사용자 입장에서 더 편하고 실용적인 화면을 만들고 싶어 프론트엔드로 합류하게 되었습니다.',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          'HOME MASTER에서 주목할 만한 기능은 챌린지와 꿀팁 작성하기입니다. 챌린지는 자취생들이 혼자 하기 어려운 생활 습관이나 목표를 함께 실천할 수 있도록 도와주는 기능입니다. 자취 생활 속 작은 미션들을 통해 재미있게 참여하고, 다른 유저들과 함께 동기부여를 받을 수 있다는 점이 매력적입니다. 꿀팁 작성하기는 자취를 하며 알게 된 생활 정보나 노하우를 자유롭게 공유할 수 있는 기능입니다. 청소, 요리, 절약, 생활 관리 등 다양한 주제의 꿀팁을 나누며 자취생들이 서로 도움을 주고받을 수 있는 커뮤니티입니다. 두 기능 모두 HOME MASTER가 단순한 정보 제공을 넘어, 자취생들이 함께 소통하고 성장할 수 있는 커뮤니티가 되도록 하는 핵심 기능이라고 생각합니다!',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          'HOME MASTER를 이용해주시는 모든 자취생 유저분들께 감사드립니다.\n자취를 하다 보면 사소하지만 막막한 순간들이 많은데, HOME MASTER가 그런 순간에 편하게 찾아올 수 있는 공간이 되었으면 좋겠습니다. 앞으로도 자취생들이 서로 꿀팁을 나누고, 챌린지에 함께 참여하며 더 즐겁고 편한 자취 생활을 할 수 있도록 계속 고민하고 개선해나가겠습니다.',
      },
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
      {
        question: '자기 소개',
        answer: '안녕하세요! HOME MASTER의 FE 손기훈입니다 🤗',
      },
      {
        question: 'HOME MASTER 프론트엔드 합류 계기',
        answer: '커뮤니티성 웹사이트를 경험해보고자 합류하게 됐습니다!',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          '메인페이지에 하루마다 갱신되는 자취생을 위한 퀴즈가 마련되어 있는데요. 몰랐거나 알았더라도 다시 한 번 상기시킬 수 있는 자취 상식 퀴즈이기에 재밌게 즐겨주셨으면 합니다.',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          '첫 프론트엔드 프로젝트를 해당 프로젝트를 통해 진행했었는데요. 부족한 점이 있을 수 있지만 즐거운 커뮤니티가 되었으면 합니다. 사용하시다가 불편하신 점은 HM 공식 이메일로 피드백 주시면 빠르게 반영해드리겠습니다!',
      },
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
      {
        question: '자기 소개',
        answer:
          '안녕하세요! HOME MASTER의 백엔드 포지션을 맡아 작업하고 있는 개발자 김미진입니다 🤗',
      },
      {
        question: 'HOME MASTER 백엔드 합류 계기',
        answer:
          '주제도 개인적으로 흥미로웠고, 와이어프레임도 백엔드 프론트 팀 꾸려지기 전, 기획 디자인에서 작업이 많이 되어있고 준비가 많이 되어있어서 합류하고 싶은 마음이 컸습니다!',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          '1인 가구 자취생들이 흥미를 가지고 참여할 만한 챌린지 및 꿀팁 공유 커뮤니티와 같이 다양한 콘텐츠가 즐비한 서비스라는 점!',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          '서비스 내에서 많이 활동해주시고 다채로운 콘텐츠를 커뮤니티 내에서 많이 만들어 활발히 소통하고 활동해주시면 감사하겠습니다!',
      },
    ],
  },
  {
    id: 'chaewon-kim',
    role: 'BE',
    nameKo: '김채원',
    nameEn: 'Chaewon Kim',
    university: '숭실대학교',
    department: '글로벌미디어학부',
    imageSrc: '/creators/chaewon-kim-interview.png',
    qna: [
      {
        question: '자기 소개',
        answer:
          '안녕하세요! HOME MASTER의 BE 김채원입니다 🤗 동아리에서 했던 프로젝트를 이렇게 출시까지 하게 되어서 기쁩니다!',
      },
      {
        question: 'HOME MASTER 백엔드 합류 계기',
        answer:
          '팀 프로젝트 모집글 중에서 홈마스터를 보고 꼭 들어가고 싶다고 생각했습니다. 그래서 팀 모집 때 열심히 지원글을 썼더니 뽑아주셨습니다 ㅎㅎ',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer: '자취생들의 여러 유용한 정보를 공유할 수 있다는 점!',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          '홈마스터를 사용해 주셔서 감사합니다 💚 더 좋은 서비스로 거듭날 수 있게 노력하겠습니다. 아자!',
      },
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
      {
        question: '자기 소개',
        answer: '반갑습니다! HOME MASTER의 BE 개발자 이해승입니다 👏👏👏',
      },
      {
        question: 'HOME MASTER 백엔드 합류 계기',
        answer:
          '자취를 하면서 부모님의 도움 없이 생활하다 보니, 이전에는 느끼지 못했던 생활의 디테일과 적절한 집의 퀄리티를 유지하는 데 많은 노력이 필요하다는 것을 깨달았습니다. 이러한 점에서 홈마스터 서비스가 저의 니즈를 충족해줄 수 있을 것이라고 생각하여 합류하게 되었습니다.',
      },
      {
        question: 'HOME MASTER에서 주목할 만한 기능',
        answer:
          '홈마스터는 단순 커뮤니티가 아니라 정보 중심의 커뮤니티라는 점에서 차별화된다고 생각합니다. 특히 ‘챌린지’와 ‘꿀팁’ 기능을 통해 자취 생활에서 놓치기 쉬운 정보들을 게임처럼 쉽게 접하고, 자연스럽게 습관화할 수 있다는 점이 주목할 만한 기능이라고 생각해요.',
      },
      {
        question: 'HOME MASTER 유저들에게 한 마디',
        answer:
          '많이 부족할 수 있습니다. 민첩하게 문제를 해결할게요. 많은 피드백 부탁드립니다.',
      },
    ],
  },
];

export const getMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find((member) => member.id === id);
};
