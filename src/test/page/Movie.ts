import PageEntity from './PageEntity.js';

class Movie extends PageEntity {
  databaseId: string;
  properties: {
    名字: { title: { text: { content: any } }[] };
    导演: { rich_text: { text: { content: any } }[] };
    编剧: { rich_text: { text: { content: any } }[] };
    主演: { rich_text: { text: { content: any } }[] };
    类别: { rich_text: { text: { content: any } }[] };
    '制片国家/地区': { rich_text: { text: { content: any } }[] };
    语言: { rich_text: { text: { content: any } }[] };
    上映日期: { date: { start: string } };
    又名: { rich_text: { text: { content: any } }[] };
    /*  类型: {
            select: {
              name: origin["类型"]?.trim() || "",
            },
          }, */
    豆瓣评分: { rich_text: { text: { content: any } }[] };
    IMDb: { rich_text: { text: { content: any } }[] };
    IMDb评分: { rich_text: { text: { content: any } }[] };
  };
  constructor(origin) {
    super(origin);
    this.databaseId = '56c5674632c54ef8a076bacb15c70062';
    this.parent = { database_id: this.databaseId };
    this.properties = {
      名字: {
        title: [
          {
            text: {
              content: origin['名字']?.trim() || '',
            },
          },
        ],
      },
      导演: {
        rich_text: [
          {
            text: {
              content: origin['导演']?.trim() || '',
            },
          },
        ],
      },
      编剧: {
        rich_text: [
          {
            text: {
              content: origin['编剧']?.trim() || '',
            },
          },
        ],
      },
      主演: {
        rich_text: [
          {
            text: {
              content: origin['主演']?.trim() || '',
            },
          },
        ],
      },

      类别: {
        rich_text: [
          {
            text: {
              content: origin['类别']?.trim() || '',
            },
          },
        ],
      },
      '制片国家/地区': {
        rich_text: [
          {
            text: {
              content: origin['制片国家/地区']?.trim() || '',
            },
          },
        ],
      },

      语言: {
        rich_text: [
          {
            text: {
              content: origin['语言']?.trim() || '',
            },
          },
        ],
      },
      上映日期: {
        date: {
          start:
            new Date(
              new Date(origin['上映日期']?.trim()).getTime() * 1 +
                1000 * 60 * 60 * 24,
            )
              .toISOString()
              .slice(0, 10) || '',
        },
      },
      又名: {
        rich_text: [
          {
            text: {
              content: origin['又名']?.trim() || '',
            },
          },
        ],
      },
      /*  类型: {
              select: {
                name: origin["类型"]?.trim() || "",
              },
            }, */
      豆瓣评分: {
        rich_text: [
          {
            text: {
              content:
                '⭐️'.repeat(Math.round(origin['豆瓣评分'] / 2) * 1) || '',
            },
          },
          {
            text: {
              content: origin['豆瓣评分']?.trim() || '',
            },
          },
        ],
      },
      IMDb: {
        rich_text: [
          {
            text: {
              content: origin.IMDb?.trim() || '',
            },
          },
        ],
      },
      IMDb评分: {
        rich_text: [
          {
            text: {
              content:
                '⭐️'.repeat(Math.round(origin['IMDb评分'] / 2) * 1) || '',
            },
          },
          {
            text: {
              content: origin['IMDb评分']?.trim() || '',
            },
          },
        ],
      },
    };
  }
}
export default Movie;
