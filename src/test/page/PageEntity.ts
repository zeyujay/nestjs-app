/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 16:13:08
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-30 00:30:19
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/test/page/PageEntity.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
class PageEntity {
  page_id: string;
  parent: { database_id: string };
  icon: { type: string; external: { url: any } };
  cover: { type: string; external: { url: any } };
  constructor(origin) {
    console.log('PageEntity', origin);
    if (origin?.page_id) this.page_id = origin.page_id;
    this.parent = {
      database_id: origin.databaseId,
    };
    this.icon = {
      type: 'external',
      external: { url: origin.cover },
    };
    this.cover = {
      type: 'external',
      external: {
        url: origin.cover,
      },
    };
  }
}
export default PageEntity;
