import {StoryblokStory} from 'storyblok-generate-ts'

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface ButtonStoryblok {
  label: string;
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  newTab: boolean;
  variant?: "" | "solid" | "light" | "flat" | "bordered";
  _uid: string;
  component: "button";
  [k: string]: any;
}

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
  buttons?: ButtonStoryblok[];
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
