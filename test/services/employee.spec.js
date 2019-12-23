describe('驗證員工帳號密碼', () => {
  test('輸入正確的密碼', async () => {
    const expectUserId = '07215e7c-ad45-420e-963a-ac5724a6f901'
    const userData = {
      merchantNumber: '001',
      username: 'username',
      password: 'employee',
    }
    const res = await global.services.employeeService.verifyEmployeePasssword(userData)
    expect(res.id).toEqual(expectUserId)
  })
  test('輸入錯誤的密碼', async () => {
    const userData = {
      merchantNumber: '001',
      username: 'username',
      password: '錯誤的密碼',
    }
    const res = await global.services.employeeService.verifyEmployeePasssword(userData)
    expect(res).toBeNull()
  })
})
describe('員工登入', () => {
  test('成功登入', async () => {
    const expectUserId = '07215e7c-ad45-420e-963a-ac5724a6f901'
    const userInput = {
      merchantNumber: '001',
      username: 'username',
      password: 'employee',
    }
    const jwtToken = await global.services.employeeService
    .login({input: userInput})
    const payload = await global.services.jwtService.verifyAndReturnPayload(jwtToken)
    expect(payload.userId).toEqual(expectUserId)
  })
  test('登入失敗', async () => {
    const userInput = {
      merchantNumber: '001',
      username: 'username',
      password: '錯誤的密碼',
    }
    const jwtToken = await global.services.employeeService
      .login({input: userInput})
      .catch(error => {
        res = error.extensions.code
      })
    expect(jwtToken).toBeNull()
  })
})

