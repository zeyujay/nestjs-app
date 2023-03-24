/*
 * @Author: zeyujay zeyujay@gmail.com
 * @Date: 2023-03-11 00:58:20
 * @LastEditors: zeyujay zeyujay@gmail.com
 * @LastEditTime: 2023-03-25 00:22:26
 * @FilePath: /notion-book/Users/zeyu/Documents/work/nestjs-app/src/app.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-zS6xDRcgp66M87hqrdwIyvn4',
  apiKey: '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',
});

@Injectable()
export class AppService {
  async getHello(qustion: string): Promise<any[]> {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: 'text-davinci-004',
      prompt: qustion,
      max_tokens: 2048,
    });
    console.log(completion);
    return completion.data.choices;
  }
}
