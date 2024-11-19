export const getURLSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      urlSearchParams.append(key, value.toString());
    }
  });

  return urlSearchParams;
};
