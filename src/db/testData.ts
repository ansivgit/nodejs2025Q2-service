export const testData = {
  artists: [
    {
      id: 'e150017f-5164-4c97-a88d-a823787f67d2',
      name: 'AnnaZas',
      grammy: true,
    },
    {
      id: 'e8f91c8e-1c2f-4b05-ae62-3e84740f2001',
      name: 'TEST_artist',
      grammy: true,
    },
    {
      id: '2877284b-dd9f-4718-993c-5a1a4e9c71d8',
      name: 'TEST_artist',
      grammy: true,
    },
    {
      id: '7cf7efde-6cf9-42a0-bceb-bf2aa4aee216',
      name: 'TEST_artist',
      grammy: true,
    },
    {
      id: '7c05744c-249c-4830-a704-6aa164e8de96',
      name: 'TEST_artist',
      grammy: true,
    },
    {
      id: '2cfeb25b-afa0-4b70-8d6d-b8eeca562c36',
      name: 'TEST_artist',
      grammy: true,
    },
  ],
  users: [
    {
      id: 'e150017f-5164-4c97-a88d-a823787f67d2',
      login: 'AnnaZas',
      password: '1111111',
      version: 1,
      createdAt: 1655000000,
      updatedAt: 1655000000,
    },
  ],
  albums: [
    {
      id: 'b45b710b-1feb-472c-bab5-d335df887cad',
      name: 'Best Album',
      year: 2022,
      artistId: 'e150017f-5164-4c97-a88d-a823787f67d2',
    },
    {
      id: 'cf053981-2d4b-453d-96f4-44349dfd09a7',
      name: 'TEST_ALBUM',
      year: 2022,
      artistId: 'e8f91c8e-1c2f-4b05-ae62-3e84740f2001',
    },
    {
      id: 'c756c0da-4bbc-493c-96c4-9709e1728dcf',
      name: 'TEST_ALBUM',
      year: 2022,
      artistId: null,
    },
    {
      id: '85fb1c09-9828-4b7f-882e-f93f4dc46d52',
      name: 'TEST_ALBUM',
      year: 2022,
      artistId: null,
    },
    {
      id: 'e581fa1b-6404-4c29-863d-a27cce1697fc',
      name: 'TEST_album',
      year: 2023,
      artistId: null,
    },
    {
      id: '22272ce0-d2d1-40de-8c1f-5fd060b5b608',
      name: 'TEST_ALBUM',
      year: 2022,
      artistId: null,
    },
  ],
  tracks: [
    {
      id: 'c657dccb-220b-48a6-9bc9-470396461bd9',
      name: 'Best track',
      artistId: 'e150017f-5164-4c97-a88d-a823787f67d2',
      albumId: 'b45b710b-1feb-472c-bab5-d335df887cad',
      duration: 262,
    },
    {
      id: '9960c56f-51d8-453b-9c28-bcce97cde4b5',
      name: 'Test track',
      duration: 335,
      artistId: 'e8f91c8e-1c2f-4b05-ae62-3e84740f2001',
      albumId: 'cf053981-2d4b-453d-96f4-44349dfd09a7',
    },
    {
      id: '47116e10-e96b-4c9e-8a98-cf3900cbd228',
      name: 'Test track',
      duration: 335,
      artistId: null,
      albumId: null,
    },
    {
      id: '8dd87f74-e705-4019-bee4-06bb7e6ccf5f',
      name: 'Test track',
      duration: 335,
      artistId: null,
      albumId: null,
    },
    {
      id: '0f13b800-c752-4c82-baf2-91a0b2ea361a',
      name: 'TEST_track',
      albumId: null,
      artistId: null,
      duration: 200,
    },
    {
      id: '8927d50f-0e47-462c-b94e-80e69a2dfdbd',
      name: 'TEST_TRACK',
      duration: 199,
      artistId: null,
      albumId: null,
    },
    {
      id: '8d95591f-8193-4642-a2e4-22179c7fa2f8',
      name: 'TEST_TRACK',
      duration: 199,
      artistId: null,
      albumId: null,
    },
  ],
  favs: {
    artists: [
      {
        id: '2877284b-dd9f-4718-993c-5a1a4e9c71d8',
        name: 'TEST_artist',
        grammy: true,
      },
      {
        id: '7cf7efde-6cf9-42a0-bceb-bf2aa4aee216',
        name: 'TEST_artist',
        grammy: true,
      },
    ],
    albums: [
      {
        id: 'c756c0da-4bbc-493c-96c4-9709e1728dcf',
        name: 'TEST_ALBUM',
        year: 2022,
        artistId: '7cf7efde-6cf9-42a0-bceb-bf2aa4aee216',
      },
      {
        id: '85fb1c09-9828-4b7f-882e-f93f4dc46d52',
        name: 'TEST_ALBUM',
        year: 2022,
        artistId: null,
      },
    ],
    tracks: [
      {
        id: '9960c56f-51d8-453b-9c28-bcce97cde4b5',
        name: 'Test track',
        duration: 335,
        artistId: 'e8f91c8e-1c2f-4b05-ae62-3e84740f2001',
        albumId: 'cf053981-2d4b-453d-96f4-44349dfd09a7',
      },
      {
        id: '8dd87f74-e705-4019-bee4-06bb7e6ccf5f',
        name: 'Test track',
        duration: 335,
        artistId: null,
        albumId: null,
      },
      {
        id: '0f13b800-c752-4c82-baf2-91a0b2ea361a',
        name: 'TEST_track',
        albumId: null,
        artistId: null,
        duration: 200,
      },
    ],
  },
};
