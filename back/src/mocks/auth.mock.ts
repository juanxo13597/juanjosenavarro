export const authMock = {
  registerUserDtoReq: {
    email: 'email@email.es',
    name: 'name',
    lastname: 'lastname',
    password: '123123',
  },
  registerUserDtoRes: {
    id: 1,
    email: 'email@email.es',
    password: '123123',
    name: 'name',
    lastname: 'lastname',
    createdAt: new Date(),
    isActive: false,
  },
  loginUserReq: {
    email: 'email@email.es',
    password: '123123',
  },
  loginUserRes: {
    access_token: 'sadfsdfsd',
  },
  refreshTokenReq: {},
  refreshTokenRes: {
    access_token: 'asdasd',
  },
};
