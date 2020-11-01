export default async (req, res) => {
  const { cookies, query, body, headers } = req;

  console.log('api userinfo', headers);
  res.status(200).json(null);
  return {
    api: {
      externalResolver: true,
    },
  };
};
