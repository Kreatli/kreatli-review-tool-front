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
          text: 'Example - Project overview',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Keep everything ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'important',
        },
        {
          type: 'text',
          text: ' for this project in one place.',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Requirements 📖 - briefs, specs, success criteria, etc.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Ideas💡- concepts, experiments, references, etc.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: 'https://kreatli.com',
                        target: '_blank',
                        rel: 'noopener noreferrer nofollow',
                        class: null,
                      },
                    },
                  ],
                  text: 'Links',
                },
                {
                  type: 'text',
                  text: ' 🔗',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        id: '1133e880-ea57-46f6-af32-3079f9639810',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            id: '76ed8eda-75bc-4c07-bd5d-693b55851b3d',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Tracking Progress ✅',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            id: '19d79726-7690-4c5a-b1cc-6f064129da31',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Deliverables 📁',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            id: '309332c9-6bac-4732-a6b7-dfe657e04b40',
            checked: false,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Tasks 📋',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
