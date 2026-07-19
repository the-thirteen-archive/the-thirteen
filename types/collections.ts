export interface CollectionCard {
  id: string;
  title: string;
  slug: string;
  image: string;
}

export type CollectionCardData = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverImage: { url: string; width: number; height: number };
  referenceCount: number;
};

export interface CollectionPreview {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export type AdminCollectionRow = {
  id: string;
  title: string;
  description: string | null;
  coverImage: { url: string; publicId: string; width: number; height: number };
  referenceIds: string[];
  referenceCount: number;
};

export interface CreateCollectionInput {}

export interface UpdateCollectionInput {}
