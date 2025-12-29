export const DEFAULT_PROJECT_CONTENT = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'underline',
            },
          ],
          text: 'Complete quick 4 steps to see how Kreatli works:',
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            id: 'task-1-upload-file',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Upload your first file - turn any video, image, or design into a tracked production asset.',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            id: 'task-2-add-feedback',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Add feedback to the file - leave a comment directly on the asset. Feedback stays attached to this version.',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            id: 'task-3-update-status',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Update file status and/or assign a collaborator to manage production.',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            id: 'task-4-share-review',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Share for review - send a review link to teammates or clients. No account required.',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            id: 'task-5-watch-walkthrough',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '(Optional) Watch Kreatli Walkthrough - ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: 'https://app.arcade.software/share/PPu2mnyNxXzs5sVzGfOA',
                        target: '_blank',
                        rel: 'noopener noreferrer nofollow',
                        class: null,
                      },
                    },
                  ],
                  text: 'click here',
                },
                {
                  type: 'text',
                  text: '.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Bonus!',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'You can always ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://calendar.app.google/M6xermcJKeEcWPD96',
                target: '_blank',
                rel: 'noopener noreferrer nofollow',
                class: null,
              },
            },
          ],
          text: 'book a free call',
        },
        {
          type: 'text',
          text: ' and get human help to set up your workflows on Kreatli.',
        },
      ],
    },
  ],
};
