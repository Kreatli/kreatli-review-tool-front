import {StoryblokStory} from 'storyblok-generate-ts'

export interface PageStoryblok {
  readTime?: string;
  body: (SectionStoryblok | WysiwygStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface SectionStoryblok {
  title: string;
  text?: string;
  image?: AssetStoryblok;
  orientation: "" | "vertical" | "horizontal";
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface WysiwygStoryblok {
  text?: RichtextStoryblok;
  _uid: string;
  component: "wysiwyg";
  [k: string]: any;
}
