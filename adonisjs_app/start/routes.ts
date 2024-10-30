/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import User from '#models/user'
import {randomInt} from "../app/utils/random.js";

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/api/v1/hello-world', async () => {
  return {
    message: 'hello world',
  }
})

router.get('/api/v1/users', async () => {
  const allItemsCount: any = await User.query().count('*', 'count');
  const itemsToTake = 30;
  const startId = randomInt(1, allItemsCount[0].$extras.count - itemsToTake);

  const users = await User
    .query()
    .where('id', '>=', startId)
    .limit(itemsToTake);

  return users;
})
