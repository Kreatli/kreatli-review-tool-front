import { apiPlugin, storyblokInit } from '@storyblok/react';
import { Section } from '../components/layout/Storyblok/Section';
import { Wysiwyg } from '../components/layout/Storyblok/Wysiwyg';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    section: Section,
    wysiwyg: Wysiwyg,
  },
  apiOptions: {
    accessToken: process.env.STORYBLOK_CONTENT_API_ACCESS_TOKEN,
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  },
});
