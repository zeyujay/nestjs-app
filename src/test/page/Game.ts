/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 17:17:56
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-27 18:26:34
 * @FilePath: /nestjs-app/src/test/page/Game.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import PageEntity from './PageEntity.js';

class Game extends PageEntity {
  databaseId: string;
  properties: {
    名字: { title: { text: { content: any } }[] };
    又名: { rich_text: { text: { content: any } }[] };
    /*  类型: {
            select: {
              name: origin?.["类型"]?.trim() || "",
            },
          }, */
    开发商: { rich_text: { text: { content: any } }[] };
    发行商: { rich_text: { text: { content: any } }[] };
    发布时间: { date: { start: any } };
    系列: { rich_text: { text: { content: any } }[] };
    Metacritic评分: { rich_text: { text: { content: any } }[] };
  };
  constructor(origin) {
    super(origin);
    this.databaseId = '26519ef4298e42248d54f50ab418e5ad';
    this.parent = { database_id: this.databaseId };
    this.properties = {
      名字: {
        title: [
          {
            text: {
              content: origin?.['名字']?.trim() || '',
            },
          },
        ],
      },
      又名: {
        rich_text: [
          {
            text: {
              content: origin?.['又名']?.trim() || '',
            },
          },
        ],
      },
      /*  类型: {
              select: {
                name: origin?.["类型"]?.trim() || "",
              },
            }, */
      开发商: {
        rich_text: [
          {
            text: {
              content: origin?.['开发商']?.join(' / ')?.trim() || '',
            },
          },
        ],
      },
      发行商: {
        rich_text: [
          {
            text: {
              content: origin?.['发行商']?.join(' / ')?.trim() || '',
            },
          },
        ],
      },

      发布时间: {
        date: {
          start: origin?.['发布时间']
            ?.trim()
            .replace('月', '-')
            .replace('年', '-')
            .replace('日', ''),
        },
      },

      系列: {
        rich_text: [
          {
            text: {
              content: origin?.['系列']?.trim() || '',
            },
          },
        ],
      },
      Metacritic评分: {
        rich_text: [
          {
            text: {
              content:
                '⭐️'.repeat(
                  Math.round(origin?.['Metacritic评分'] / 10 / 2) * 1,
                ) || '',
            },
          },
          {
            text: {
              content: origin?.['Metacritic评分']?.trim() || '',
            },
          },
        ],
      },
    };
  }
}
export default Game;
