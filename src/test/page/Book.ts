import PageEntity from './PageEntity.js';

class Book extends PageEntity {
  databaseId: string;
  parent: { database_id: any };
  properties: {
    名字: { title: { text: { content: any } }[] };
    原作名: { rich_text: { text: { content: any } }[] };
    作者: { rich_text: { text: { content: any } }[] };
    译者: { rich_text: { text: { content: any } }[] };
    出版社: { rich_text: { text: { content: any } }[] };
    出品方: { rich_text: { text: { content: any } }[] };
    出版年: { date: { start: string } };
    页数: { rich_text: { text: { content: any } }[] };
    定价: { rich_text: { text: { content: any } }[] };
    装帧: { rich_text: { text: { content: any } }[] };
    丛书: { rich_text: { text: { content: any } }[] };
    /*  类型: {
            select: {
              name: origin["类型"]?.trim() || "",
            },
          }, */
    豆瓣评分: { rich_text: { text: { content: any } }[] };
    ISBN: { rich_text: { text: { content: any } }[] };
  };
  constructor(origin) {
    super(origin);
    this.databaseId = 'c85debe4baa041d0b5e6914a54b84ea6';
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
      原作名: {
        rich_text: [
          {
            text: {
              content: origin['原作名']?.trim() || '',
            },
          },
        ],
      },
      作者: {
        rich_text: [
          {
            text: {
              content: origin['作者']?.trim() || '',
            },
          },
        ],
      },
      译者: {
        rich_text: [
          {
            text: {
              content: origin['译者']?.trim() || '',
            },
          },
        ],
      },
      出版社: {
        rich_text: [
          {
            text: {
              content: origin['出版社']?.trim() || '',
            },
          },
        ],
      },
      出品方: {
        rich_text: [
          {
            text: {
              content: origin['出品方']?.trim() || '',
            },
          },
        ],
      },
      出版年: {
        date: {
          start:
            new Date(
              new Date(origin['出版年']?.trim()).getTime() +
                1000 * 60 * 60 * 24,
            )
              .toISOString()
              .slice(0, 10) || '',
        },
      },
      页数: {
        rich_text: [
          {
            text: {
              content: origin['页数']?.trim() || '',
            },
          },
        ],
      },
      定价: {
        rich_text: [
          {
            text: {
              content: origin['定价']?.trim() || '',
            },
          },
        ],
      },
      装帧: {
        rich_text: [
          {
            text: {
              content: origin['装帧']?.trim() || '',
            },
          },
        ],
      },
      丛书: {
        rich_text: [
          {
            text: {
              content: origin['丛书']?.trim() || '',
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
      ISBN: {
        rich_text: [
          {
            text: {
              content: origin.ISBN?.trim() || '',
            },
          },
        ],
      },
    };
  }
}
export default Book;
