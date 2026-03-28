export interface Author {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface Hashtag {
  hashtagId: number;
  name: string;
}

export interface TipImage {
  media_url: string;
  media_type: string;
}

export interface TipItem {
  tipId: number;
  title: string;
  content: string;
  author: Author;
  hashtags: Hashtag[];
  imageUrls: TipImage[];
  likesCount: number;
  savesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TipsResponse {
  isSuccess: boolean;
  message: string;
  result: TipItem[];
}

export interface NewPost {
  userId?: number;
  title: string;
  content: string;
  hashtags: string[];
  imageUrls: File[];
}
