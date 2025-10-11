'use client';

import { PropsWithChildren } from 'react';
import { getStoryblokApi } from '../../../lib/storyblok';

export const StoryblokProvider = ({ children }: PropsWithChildren) => {
  getStoryblokApi();
  return children;
};
