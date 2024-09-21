export const transformCoverUrl = (url: string) => {
  const httpsUrl = url.startsWith("//")
    ? `https:${url}`
    : url.replace(/^http:/, "https:");
  return httpsUrl.replace("t_thumb", "t_cover_big");
};
