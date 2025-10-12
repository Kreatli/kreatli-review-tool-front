import { BlockTypes, MarkTypes, storyblokEditable, StoryblokRichText } from '@storyblok/react';
import { WysiwygStoryblok } from '../../../../typings/storyblok';

import styles from './Wysiwyg.module.scss';
import { Alert, cn } from '@heroui/react';

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
            <a href={node.attrs?.href} target="_blank">
              {node.children}
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
        }}
      />
    </div>
  );
};
