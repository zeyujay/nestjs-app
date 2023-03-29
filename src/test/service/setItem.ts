/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 13:32:33
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-30 02:35:11
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
  const notion = Notion.getInstance(obj.auth);
  obj.databaseId = obj.databaseId;
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
  console.log('=======查询重复开始', data);
  const queryPageResult = await notion.queryPage(
    obj.databaseId,
    typeEnum[obj['类型']].tag,
    id,
  );
  if (queryPageResult?.results?.length > 0) {
    console.log('========更新note');
    data.page_id = queryPageResult.results[0].id;
    try {
      const result = await notion.updatePage(data);
      if (result && result.id) {
        console.log('========更新note结束', result);
        return {
          code: 1,
          message: '更新成功',
          data: result,
        };
      } else {
        console.log('更新失败');
        return {
          code: 0,
          message: '更新失败',
          data: null,
        };
      }
    } catch (error) {
      console.log(error.body);
      return {
        code: 0,
        message: '更新失败',
        data: null,
      };
    }
  } else {
    console.log('===========添加note', 'begin');
    try {
      const createResult = await notion.createPage(data);
      console.log('=========createResult', createResult);
      const createAllResult = await setAll(obj, createResult);
      console.log('=========createAllResult', createAllResult);

      const updateData = {
        page_id: createResult.id,
        parent: { database_id: obj.databaseId },
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
      console.log('===========添加note结束', updateResult);
      return {
        code: 1,
        message: '添加成功',
        data: updateResult,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 0,
        message: '添加失败',
        data: null,
      };
    }
  }
};
export default setItem;
