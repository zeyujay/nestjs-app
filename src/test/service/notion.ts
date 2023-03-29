/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 13:47:15
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-30 01:18:49
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/test/service/notion.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Client } from '@notionhq/client';

class Notion {
  static instance: any;
  notion: Client;
  constructor(auth) {
    if (Notion.instance) {
      return Notion.instance;
    }
    Notion.instance = this;
    this.notion = new Client({
      auth,
    });
  }
  async queryPage(databaseId, key, value) {
    const result = await this.notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: key,
            rich_text: {
              equals: value,
            },
          },
        ],
      },
    });
    return result;
  }
  async createPage(data) {
    const result = await this.notion.pages.create(data);
    return result;
  }
  async updatePage(data) {
    const result = await this.notion.pages.update(data);
    return result;
  }
  static getInstance(auth) {
    return new Notion(auth);
  }
}
export default Notion;
