export interface Feature {
  id: number;
  geom: string;
  fields: {
    num: number;
    n_raion: string;
    fio: string;
    years: string;
    info: string;
    kontrakt: string;
    nagrads: string;
  };
  extensions: {
    description: null;
    attachment: FeatureAttachment[] | null;
  };
}

export interface FeatureAttachment {
  id: number;
  name: string;
  keyname: null;
  size: number;
  mime_type: string;
  description: null;
  is_image: boolean;
  file_meta: {};
}

export interface CreateFeatureParams {
  geom: string;
  fields: {
    n_raion: string;
    fio: string;
    years: string;
    info: string;
    kontrakt: string;
    nagrads: string;
  };
  extensions: {
    description: null;
    attachment: null;
  };
}
