export interface Request {
  id: number;
  meta: RequestMeta;
}

export interface RequestMeta {
  userId: number;
  feature: {
    district: string;
    name: string;
    birthDate: string;
    deathDate: string;
    info: string;
    location: string;
    rewards: string;
  };
  attachments: {
    id: string;
    size: number;
    name: string;
    mime_type: string;
  }[];
}
