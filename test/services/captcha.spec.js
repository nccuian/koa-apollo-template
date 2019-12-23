beforeEach(async() => {
  await redis.flushall()
  sinon.restore()
});


describe('Google 驗證碼', () => {
  test('成功啟動機器人驗證',async () => {
    const data = {
      actionName: 'test',
      ip: '0.0.0.0'
    }
    const resp = await services.captchaService
      .setNeedCaptcha(data)
    expect(resp).toEqual('OK')
  })
  test('成功刪除機器人驗證', async () => {
    const data = {
      actionName: 'test',
      ip: '0.0.0.0'
    }
    await services.captchaService.setNeedCaptcha(data)
    const resp = await services.captchaService
      .delNeedCaptcha(data)
    expect(resp).toEqual(1)
  })
  test('不需Googley驗證是否為機器人', async () => {
    const data = {
      actionName: 'test',
      ip: '0.0.0.0',
      recaptcha: null
    }
    const resp = await services.captchaService.checkIsRobot(data)
    expect(resp).toBeFalsy()
  })
  test('需要Google驗證，且輸入正確的驗證碼', async () => {
    const data = {
      actionName: 'test',
      ip: '0.0.0.0',
      recaptcha: 1
    }
    sinon.stub(services.captchaService, 'requestGoogleCheckCaptcha').callsFake(() => {
      return true;
    })
    await services.captchaService.setNeedCaptcha(data)
    const resp = await services.captchaService.checkIsRobot(data)
    expect(resp).toBeFalsy()
  })
  test('需要Google驗證，且輸入錯誤的驗證碼', async () => {
    const data = {
      actionName: 'test',
      ip: '0.0.0.1',
      recaptcha: null
    }
    await services.captchaService.setNeedCaptcha(data)
    const resp = await services.captchaService.checkIsRobot(data)
    expect(resp).toBeTruthy()
  })
  test('需要Google驗證 Token 但沒有帶token', async () => {
    const resp = await services.captchaService.requestGoogleCheckCaptcha()
    expect(resp).toBeFalsy()
  })
})