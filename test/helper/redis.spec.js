describe('Redis', () => {
  test('set', async () => {
    const expectResult = 'OK'
    const result = await redis.set('test',{ status : true }, 20)
    expect(result).toEqual(expectResult)
  })
  test('get 有資料', async () => {
    const expectResult = { status: true }
    await redis.set('test', { status: true }, 20)
    const result = await redis.get('test')
    expect(result).toEqual(expectResult)
  })
  test('get 無資料', async () => {
    const result = await redis.get('random')
    expect(result).toBeNull()
  })
  test('刪除全部資料',async () => {
    await redis.set('test', { status: true })
    const result = await redis.flushall()
    expect(result).toEqual('OK')
  })
  test('刪除一筆資料成功',async () => {
    await redis.set('test', { status: true })
    const result = await redis.del('test', { status: true })
    expect(result).toEqual(1)
  })
  test('刪除一筆資料失敗', async () => {
    const result = await redis.del('test', { status: true })
    expect(result).toEqual(0)
  })
})