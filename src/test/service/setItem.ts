/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-24 13:32:33
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-04-09 23:15:29
 * @FilePath: /v8/Users/zeyu/Documents/work/nestjs-app/src/test/service/setItem.ts
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
import setYearGoal from './setYear';
import setYear from './setYear';
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
      const createResult: any = await notion.createPage(data);
      console.log('=========createResult', createResult);
      const queryYearResult: any = await notion.queryPage(
        obj.databaseIdYear,
        'title',
        obj['类型'],
      );
      if (queryYearResult?.results?.length > 0) {
        createResult.properties['年度目标'] = {
          relation: [
            {
              id: queryYearResult.results[0].id,
            },
          ],
        };
      }
      const createAllResult = await setAll(obj, createResult);
      console.log('=========createAllResult', createAllResult);
      console.log(queryYearResult.results[0].properties);
      //const updateYearResult = await setYear(obj, createAllResult);
      const updateData = {
        page_id: queryYearResult.results[0].id,
        parent: { database_id: obj.databaseIdYear },
        properties: {
          小目标: {
            relation: [
              ...queryYearResult.results[0].properties['小目标'].relation,
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
        data: createResult,
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
