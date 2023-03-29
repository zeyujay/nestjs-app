import PageEntity from './PageEntity.js';

class Movie extends PageEntity {
  properties: {
    名字: { title: { text: { content: any } }[] };
    表演者: { rich_text: { text: { content: any } }[] };
    流派: { rich_text: { text: { content: any } }[] };
    专辑类型: { rich_text: { text: { content: any } }[] };
    介质: { rich_text: { text: { content: any } }[] };
    发行时间: { date: { start: string } };
    出版者: { rich_text: { text: { content: any } }[] };
    唱片数: { rich_text: { text: { content: any } }[] };
    条形码: { rich_text: { text: { content: any } }[] };
    /*  类型: {
            select: {
              name: origin?.["类型"]?.trim() || "",
            },
          }, */
    豆瓣评分: { rich_text: { text: { content: any } }[] };
  };
  constructor(origin) {
    super(origin);
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
      表演者: {
        rich_text: [
          {
            text: {
              content: origin?.['表演者']?.trim() || '',
            },
          },
        ],
      },
      流派: {
        rich_text: [
          {
            text: {
              content: origin?.['流派']?.trim() || '',
            },
          },
        ],
      },
      专辑类型: {
        rich_text: [
          {
            text: {
              content: origin?.['专辑类型']?.trim() || '',
            },
          },
        ],
      },
      介质: {
        rich_text: [
          {
            text: {
              content: origin?.['介质']?.trim() || '',
            },
          },
        ],
      },
      发行时间: {
        date: {
          start:
            new Date(
              new Date(origin?.['发行时间']?.trim()).getTime() +
                1000 * 60 * 60 * 24,
            )
              .toISOString()
              .slice(0, 10) || '',
        },
      },
      出版者: {
        rich_text: [
          {
            text: {
              content: origin?.['出版者']?.trim() || '',
            },
          },
        ],
      },
      唱片数: {
        rich_text: [
          {
            text: {
              content: origin?.['唱片数']?.trim() || '',
            },
          },
        ],
      },
      条形码: {
        rich_text: [
          {
            text: {
              content: origin?.['条形码']?.trim() || '',
            },
          },
        ],
      },
      /*  类型: {
              select: {
                name: origin?.["类型"]?.trim() || "",
              },
            }, */
      豆瓣评分: {
        rich_text: [
          {
            text: {
              content:
                '⭐️'.repeat(Math.round(origin?.['豆瓣评分'] / 2) * 1) || '',
            },
          },
          {
            text: {
              content: origin?.['豆瓣评分']?.trim() || '',
            },
          },
        ],
      },
    };
  }
}
export default Movie;
