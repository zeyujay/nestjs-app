/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 13:32:33
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-25 00:09:26
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/test/service/setItem.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import setAll from './setAll';
import Notion from './notion';
import Book from '../page/Book';
import typeEnum from './typeEnum';
import Movie from '../page/Movie';
import Music from '../page/Music';
import Game from '../page/Game';
const setItem = async (obj, id) => {
  console.log(5555555, obj);
  const notion = Notion.getInstance();
  let data;
  switch (obj['类型']) {
    case '书籍':
      data = new Book(obj);
      break;
    case '影视':
      data = new Movie(obj);
      break;
    case '音乐':
      data = new Music(obj);
      break;
    case '游戏':
      data = new Game(obj);
      break;

    default:
      break;
  }
  console.log(666666, data);
  const queryPageResult = await notion.queryPage(
    data.databaseId,
    typeEnum[obj['类型']].tag,
    id,
  );
  if (queryPageResult?.results?.length > 0) {
    data.page_id = queryPageResult.results[0].id;
    const result = await notion.updatePage(data);
    if (result && result.id) {
      console.log('更新成功');
      return result;
    } else {
      console.log('更新失败');
      return;
    }
  } else {
    console.log(7777, 'begin');
    const createResult = await notion.createPage(data);
    const createAllResult = await setAll(obj, createResult);
    const updateData = {
      page_id: createResult.id,
      parent: { database_id: data.databaseId },
      properties: {
        All: {
          relation: [
            {
              id: createAllResult.id,
            },
          ],
        },
      },
    };
    const updateResult = await notion.updatePage(updateData);
    console.log(updateResult);
    return updateResult;
  }
};
export default setItem;
