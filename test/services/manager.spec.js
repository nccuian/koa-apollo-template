describe('驗證管理者帳號密碼', () => {
  test('輸入正確的密碼', async () => {
    const expectUserId = '07215e7c-ad45-420e-963a-ac5724a6f997'
    const userData = {
      account: 'A1',
      password: 'manager',
    }
    const res = await global.services.managerService.verifyManagerPasssword(userData)
    expect(res.id).toEqual(expectUserId)
  })
  test('輸入錯誤的密碼', async () => {
    const userData = {
      account: 'A1',
      password: '錯誤的密碼',
    }
    const res = await global.services.managerService.verifyManagerPasssword(userData)
    expect(res).toBeNull()
  })
})
describe('管理者登入', () => {
  test('成功登入', async () => {
    const expectUserId = '07215e7c-ad45-420e-963a-ac5724a6f997'
    const userInput = {
      account: 'A1',
      password: 'manager',
    }
    const jwtToken = await global.services.managerService
    .login({input: userInput})
    const payload = await global.services.jwtService.verifyAndReturnPayload(jwtToken)
    expect(payload.userId).toEqual(expectUserId)
  })
  test('登入失敗', async () => {
    const userInput = {
      account: 'A1',
      password: '錯誤的密碼',
    }
    const jwtToken = await global.services.managerService
      .login({input: userInput})
      .catch(error => {
        res = error.extensions.code
      })
    expect(jwtToken).toBeNull()
  })
})

