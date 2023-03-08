export interface WebsiteData {
  logos: string[];
  images: string[];
  colors: string[];
  instagramLinks: string[];
  youtubeLinks: string[];
  url: string;
}

export interface Creative {
  campaign_id: number;
  format: string;
  id: number;
  name: string;
  template_id: number;
  config: { templateComponent: "drag-and-drop"; dndConfig: { previewHtml: string } };
}

export type CreativeCreateResponse = Creative | null;

export type CreativeUpdateResponse = Creative | null;
