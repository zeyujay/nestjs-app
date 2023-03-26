/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-21 11:57:51
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-26 16:28:35
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/test/service/getWeb.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import puppeteer from 'puppeteer';
console.log('=========getWeb 获取chrome path', puppeteer.executablePath());
const getWeb = async function (id) {
  // 启动浏览器
  try {
    console.log('=========getWeb begin brower');
    const browser = await puppeteer?.launch({
      /*         executablePath:
        '/Users/zeyu/.cache/puppeteer/chrome/mac-1108766/chrome-mac/Chromium.app/Contents/MacOS/Chromium', */
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: 'new',
      args: ['--no-sandbox', '--disabled-setupid-sandbox'],
    });
    console.log('=========getWeb end brower');
    // 控制浏览器打开新标签页面
    const page = (await browser.pages())[0];
    /*   await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
  ); */

    // 在新标签中打开要爬取的网页
    const reg = /^(tt\d{7,10}|\d{9}(X|\d)|\d{13}|\d{8,14})$/;
    if (!reg.test(id)) {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      await page.goto(`https://www.xiaoheihe.cn/home`, {
        timeout: 20000,
      });
      const baseData: any = {};
      const searchBtn = await page.$('.search-btn button');
      await searchBtn.click();
      const inputBtn = await page.$('.search-input');
      await inputBtn.type(id);
      await page.keyboard.press('Enter');
      const li: any = await page.waitForSelector(
        '.game-list>ul>li:nth-child(1)',
      );
      const cover: any = await page.evaluate(() => {
        const cover: any = document.querySelector(
          '.game-list>ul>li:nth-child(1)>div>img',
        );
        return cover.src;
      });
      baseData.cover = cover;
      baseData['类型'] = '游戏';
      li.click('.game-list>ul>li:nth-child(1)');
      const pages: any = await new Promise((resolve) => {
        setTimeout(async () => {
          const pages = await page.browserContext().pages();
          await pages[1].setViewport({
            width: 1920,
            height: 1080,
          });
          resolve(pages);
        }, 1000);
      });
      if (pages?.length < 2) {
        return;
      }
      const appid = await pages[1].url().split('detail/')[1];

      await pages[1].goto(
        `https://api.xiaoheihe.cn/game/share_game_detail?appid=${appid}&game_type=pc`,
      );
      await pages[1].waitForSelector('.btn-download');
      const detailData = await pages[1].evaluate(async () => {
        const obj = {
          开发商: [],
          发行商: [],
        };
        obj['名字'] = document.querySelector('.name').textContent;
        obj['又名'] = document.querySelector('.name-en').textContent;
        Array.prototype.forEach.call(
          document.querySelector('.menu-list').children,
          function (item) {
            const search = item.children[0].childNodes[0].nodeValue;
            switch (search) {
              case '发布时间：':
                obj['发布时间'] = item.children[0].childNodes[1].textContent;
                break;
              case '开发商：':
                obj['开发商'] = [
                  ...obj['开发商'],
                  item.children[0].childNodes[1].textContent,
                ];
                break;
              case '发行商：':
                obj['发行商'] = [
                  ...obj['发行商'],
                  item.children[0].childNodes[1].textContent,
                ];
                break;
              case '系列：':
                obj['系列'] = item.children[0].childNodes[1].textContent;
                break;
              case 'Metacritic评分：':
                obj['Metacritic评分'] =
                  item.children[0].childNodes[1].textContent;
                break;

              default:
                break;
            }
          },
        );
        return obj;
      });
      console.log('=======获取到游戏数据', detailData);
      await browser.close();
      return {
        code: 0,
        message: '成功获取数据',
        data: Object.assign(baseData, detailData),
      };
    }
    await page.goto(`https://www.douban.com/search?q=${id}`, {
      timeout: 20000,
    });
    // 使用evaluate方法在浏览器中执行传入函数（完全的浏览器环境，所以函数内可以直接使用window、document等所有对象和方法）
    const baseData = await page.evaluate(() => {
      const h3: any = document.querySelectorAll('h3')[0];
      const type = h3.children[0].textContent;
      const href: any = h3.children[1]?.href;
      return {
        类型:
          type.slice(1, -1) === '电视剧' || type.slice(1, -1) === '电影'
            ? '影视'
            : type.slice(1, -1),
        链接: href,
      };
    });
    await page.goto(baseData['链接'], { timeout: 100000 });
    const detailData: any = await page.evaluate(async () => {
      const obj: any = {};
      const wrapper: any = document.getElementById('wrapper');
      obj['名字'] = wrapper.querySelector('h1 span').textContent;
      obj.cover =
        wrapper.querySelector('.nbg')?.href ||
        wrapper.querySelector('.nbgnbg img')?.src;
      obj['豆瓣评分'] = wrapper.querySelector('.rating_num').textContent;
      const info = document.getElementById('info');
      const list = Array.prototype.filter.call(
        info.childNodes,
        function (item) {
          return !item?.nodeValue || !!item.nodeValue.trim();
        },
      );
      Array.prototype.forEach.call(list, function (item, index) {
        if (item.tagName === 'SPAN') {
          if (item.children.length > 0) {
            if (item.children[0].childNodes[0].nodeValue.trim() === '表演者:') {
              obj['表演者'] = Array.prototype.filter
                .call(item.children[0].children, function (item, index) {
                  return index >= 0;
                })
                .map((item) => item.textContent)
                .join(' / ');
            }
            switch (item.children[0].textContent) {
              case '导演':
                obj['导演'] = Array.prototype.filter
                  .call(item.children[1].children, function (item, index) {
                    return index >= 0;
                  })
                  .map((item) => item.textContent)
                  .join(' / ');
                break;
              case '编剧':
                obj['编剧'] = Array.prototype.filter
                  .call(item.children[1].children, function (item, index) {
                    return index >= 0;
                  })
                  .map((item) => item.textContent)
                  .join(' / ');
                break;
              case '主演':
                obj['主演'] = Array.prototype.filter
                  .call(item.children[1].children, function (item, index) {
                    return index < 5;
                  })
                  .map((item) => item.textContent)
                  .join(' / ');
                break;
              case ' 作者':
                obj['作者'] = Array.prototype.filter
                  .call(item.children, function (item, index) {
                    return index > 0;
                  })
                  .map((item) => item.textContent)
                  .join(' / ');
                break;
              case ' 译者':
                obj['译者'] = Array.prototype.filter
                  .call(item.children, function (item, index) {
                    return index > 0;
                  })
                  .map((item) => item.textContent)
                  .join(' / ');
                break;

              default:
                break;
            }
          }
          switch (item.textContent) {
            case '类型:':
              obj['类别'] = Array.prototype.map
                .call(
                  info.querySelectorAll('span[property="v:genre"]'),
                  function (item) {
                    return item.textContent;
                  },
                )
                .join(' / ');
              break;

            case '流派:':
              obj['流派'] = list[index + 1].textContent;
              break;
            case '专辑类型:':
              obj['专辑类型'] = list[index + 1].textContent;
              break;
            case '介质:':
              obj['介质'] = list[index + 1].textContent;
              break;
            case '发行时间:':
              obj['发行时间'] = list[index + 1].textContent;
              break;
            case '出版者:':
              obj['出版者'] = list[index + 1].textContent;
              break;
            case '唱片数:':
              obj['唱片数'] = list[index + 1].textContent;
              break;
            case '条形码:':
              obj['条形码'] = list[index + 1].textContent;
              break;

            case '制片国家/地区:':
              obj['制片国家/地区'] = list[index + 1].textContent;
              break;

            case '语言:':
              obj['语言'] = list[index + 1].textContent;
              break;
            case '首播:':
              obj['上映日期'] = list[index + 1].textContent?.slice(0, 10);
              break;
            case '上映日期:':
              obj['上映日期'] = Array.prototype.map
                .call(
                  info.querySelectorAll(
                    'span[property="v:initialReleaseDate"]',
                  ),
                  function (item) {
                    return item.textContent;
                  },
                )
                .join(' / ')
                .slice(0, 10);
              break;
            /*  case "集数:":
            obj["集数"] = list[index + 1].textContent;
            break;
          case "单集片长:":
            obj["单集片长"] = list[index + 1].textContent;
            break; */
            case '又名:':
              obj['又名'] = list[index + 1].textContent;
              break;
            case 'IMDb:':
              obj['IMDb'] = list[index + 1].textContent;
              break;

            case '出版社:':
              obj['出版社'] = list[index + 1].textContent;
              break;
            case '出品方:':
              obj['出品方'] = list[index + 1].textContent;
              break;
            case '原作名:':
              obj['原作名'] = list[index + 1].nodeValue.trim();
              break;
            case '出版年:':
              obj['出版年'] = list[index + 1].nodeValue.trim();
              break;
            case '页数:':
              obj['页数'] = list[index + 1].nodeValue.trim();
              break;
            case '定价:':
              obj['定价'] = list[index + 1].nodeValue.trim();
              break;
            case '装帧:':
              obj['装帧'] = list[index + 1].nodeValue.trim();
              break;
            case '丛书:':
              obj['丛书'] = list[index + 1].textContent.trim();
              break;
            case 'ISBN:':
              obj['ISBN'] = list[index + 1].nodeValue.trim();
              break;
            default:
              break;
          }
        }
      });
      return obj;
    });
    if (baseData['类型'] === '影视') {
      await page.goto('https://www.imdb.com/title/' + detailData.IMDb.trim());
      const IMdbData = await page.evaluate(async () => {
        const score = document.querySelector(
          'div[data-testid="hero-rating-bar__aggregate-rating__score"]',
        ).children[0].textContent;
        return score;
      });
      if (IMdbData) {
        detailData['IMDb评分'] = IMdbData;
      }
    }
    console.log('==========获取到非游戏数据', detailData);
    await browser.close();
    return {
      code: 0,
      message: '成功获取数据',
      data: Object.assign(baseData, detailData),
    };
  } catch (error) {
    console.log(error);
    return {
      code: 0,
      message: error.body,
      data: null,
    };
  }
};
export default getWeb;
