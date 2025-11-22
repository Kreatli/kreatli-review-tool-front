import { BlockTypes, MarkTypes, storyblokEditable, StoryblokRichText } from '@storyblok/react';
import { WysiwygStoryblok } from '../../../../typings/storyblok';

import styles from './Wysiwyg.module.scss';
import { Alert, cn } from '@heroui/react';
import React from 'react';
import { getHeadingId } from '../../../../utils/storyblok';

interface Props {
  blok: WysiwygStoryblok;
}

export const Wysiwyg = ({ blok }: Props) => {
  const { text } = blok;

  return (
    <div className={styles.wysiwyg} {...storyblokEditable(blok)}>
      <StoryblokRichText
        // @ts-expect-error
        doc={text}
        resolvers={{
          [MarkTypes.LINK]: (node) => (
            <a href={node.attrs?.href} key={node.attrs?.href} target="_blank">
              {node.text}
            </a>
          ),
          [BlockTypes.TABLE]: (node) => (
            <div className={cn(styles.tableWrapper, 'dark:border dark:border-foreground-300')}>
              <table>
                <tbody>{node.children}</tbody>
              </table>
            </div>
          ),
          [BlockTypes.QUOTE]: (node) => <Alert className={styles.alert} title={node.children} />,
          [BlockTypes.HEADING]: (node) => {
            return React.createElement(
              `h${node.attrs?.level}`,
              {
                id: getHeadingId(node.content?.[0]?.text ?? ''),
                key: getHeadingId(node.content?.[0]?.text ?? ''),
              },
              node.children,
            );
          },
        }}
      />
    </div>
  );
};
