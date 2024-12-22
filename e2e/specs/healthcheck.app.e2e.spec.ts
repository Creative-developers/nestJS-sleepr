import { ping } from 'tcp-ping';

describe('Health', () => {
  test('reservations', async () => {
    const response = await fetch('http://reservations:3000');
    expect(response.ok).toBeTruthy();
  });

  test('auth', async () => {
    const response = await fetch('http://auth:3001');
    expect(response.ok).toBeTruthy();
  });

  test('payments', (done) => {
    ping({ address: 'payments', port: 3003 }, (err) => {
      if (err) fail();
      done();
    });
  });

  test('notifications', (done) => {
    ping({ address: 'notifications', port: 3004 }, (err) => {
      if (err) fail();
      done();
    });
  });
});
