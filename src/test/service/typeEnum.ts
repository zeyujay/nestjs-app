/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-22 12:55:07
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-25 00:09:18
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/test/service/typeEnum.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const typeEnum = {
  书籍: {
    tag: 'ISBN',
    type: 1,
  },
  影视: {
    tag: 'IMDb',
    type: 2,
  },
  音乐: {
    tag: '条形码',
    type: 3,
  },
  游戏: {
    tag: '名字',
    type: 4,
  },
};
export default typeEnum;
