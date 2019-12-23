describe('Json Web Token', () => {
  test('簽名成功', () => {
    const payload = {
      userId: '07215e7c-ad45-420e-963a-ac5724a6f901'
    }
    const signData = {
      payload: payload,
      expiresIn: '90 days'
    }
    const token = services.jwtService.sign(signData)
    expect(token).toEqual(expect.anything())
  });
  test('驗證簽名失敗', () => {
    const token = 'fakeToken'
    const resp = services.jwtService.verifyAndReturnPayload(token)
    expect(resp).toBeNull();
  });
  test('驗證 Token 並回傳 payload', () => {
    const payload = {
      userId: '07215e7c-ad45-420e-963a-ac5724a6f901'
    }
    const signData = {
      payload: payload,
      expiresIn: '90 days'
    }
    const token = services.jwtService.sign(signData)
    const resp = services.jwtService.verifyAndReturnPayload(token)
    expect(resp).toEqual(payload)
  });
 
})
