import { NestFactory } from '@nestjs/core';

import { initAdapters } from '@src/adapters.init';
import { AppModule } from '@src/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  initAdapters(app);

  await app.listen(3001, () => {
    console.log(`Listening on port 3001.`);
  });
}

bootstrap();
