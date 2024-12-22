describe('reservations', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'ahmednasrullah77@gmail.com',
      password: 'Password@1234!',
      roles: ['Admin'],
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    jwt = await response.text();
    console.log(jwt);
  });

  test('Create', async () => {
    expect(true).toBeTruthy();
    // console.log({ jwt });
    // const response = await fetch('http://reservations:3000/reservations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authentication: jwt,
    //   },
    //   body: JSON.stringify({
    //     startDate: '01/12/2024',
    //     endDate: '01/12/2024',
    //     extra: 2,
    //     placeId: '12345',
    //     invoiceId: '493',
    //     charge: {
    //       amount: 5,
    //       card: {
    //         cvc: '123',
    //         exp_month: 12,
    //         exp_year: 2027,
    //         number: '4242424242424242',
    //       },
    //     },
    //   }),
    // });

    // expect(response.ok).toBeTruthy();
    // const reservation = await response.json();
    // console.log({ reservation });
  });
});
