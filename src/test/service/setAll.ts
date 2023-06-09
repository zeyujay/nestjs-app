/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 13:32:33
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-04-09 05:23:26
 * @FilePath: /v8/Users/zeyu/Documents/work/nestjs-app/src/test/service/setAll.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Notion from './notion.js';
const setAll = async (obj, relateData) => {
  const notion = Notion.getInstance(obj.auth);
  const data = {
    parent: { database_id: obj.databaseIdAll },
    children: [
      {
        object: 'block',
        type: 'link_to_page',
        link_to_page: {
          page_id: relateData.id,
        },
      },
    ],
    icon: {
      type: 'external',
      external: { url: obj.cover },
    },
    cover: {
      type: 'external',
      external: {
        url: obj.cover,
      },
    },
    properties: {
      小目标: {
        title: [
          {
            text: {
              content: obj['名字']?.trim() || '',
            },
          },
        ],
      },
      类型: {
        select: {
          name: obj['类型']?.trim() || '',
        },
      },
      /* [obj['类型'].slice(0, 1)]: {
        relation: [
          {
            id: relateData.id,
          },
        ],
      }, */
    },
  };
  const result = await notion.createPage(data);

  return result;
};
export default setAll;
